import express from "express";
import { auth } from "../middleware/auth.js";
import Sale from "../models/Sale.js";
import Inventory from "../models/Inventory.js";

const router = express.Router();

router.get("/summary", auth, async (req, res) => {
  const match = {};
  if (req.user.role !== "admin" && req.user.branchId)
    match.branch = req.user.branchId;

  const [agg] = await Sale.aggregate([
    { $match: match },
    { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
  ]);

  const invCount = await Inventory.countDocuments(
    match.branch ? { branch: match.branch } : {}
  );

  res.json({
    totalSales: agg?.total || 0,
    salesCount: agg?.count || 0,
    inventoryItems: invCount,
  });
});

export default router;
