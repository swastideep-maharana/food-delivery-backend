import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  getFoodById,
  getCategories,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine with mobile optimization
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Food routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.get("/categories", getCategories);
foodRouter.get("/:id", getFoodById);
foodRouter.post("/remove", removeFood);

export default foodRouter;
