import express from "express";
import authMiddlerware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  userOrders,
  verifyOrder,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddlerware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddlerware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
export default orderRouter;
