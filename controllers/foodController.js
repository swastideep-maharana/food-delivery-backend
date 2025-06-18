"import fs from \"fs\";" 
import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Validate required fields
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate price
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid price" });
    }

    const image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category: category.trim(),
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ 
      success: true, 
      message: "Food Added Successfully", 
      food 
    });
  } catch (error) {
    console.error('Add food error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error adding food item",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// all food list with improved pagination and filtering
const listFood = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12; // Better for mobile grid
    const category = req.query.category;
    const search = req.query.search;
    
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const foods = await foodModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
      
    const total = await foodModel.countDocuments(query);
    
    res.json({
      success: true,
      data: foods,
      total,
      page,
      pages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('List food error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching food list",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    // Remove image file
    const imagePath = `uploads/${food.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await foodModel.findByIdAndDelete(id);
    res.json({ 
      success: true, 
      message: "Food Removed Successfully" 
    });
  } catch (error) {
    console.error('Remove food error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error removing food item",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get food by ID
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const food = await foodModel.findById(id).lean();
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    res.json({ 
      success: true, 
      data: food 
    });
  } catch (error) {
    console.error('Get food by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching food item",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    const categories = await foodModel.distinct('category');
    res.json({ 
      success: true, 
      data: categories 
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching categories",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export { addFood, listFood, removeFood, getFoodById, getCategories }; 
