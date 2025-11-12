import express from "express";
import mongoose from "mongoose";
import { auth } from "../middleware/auth.js";
import Sale from "../models/Sale.js";
import Inventory from "../models/Inventory.js";

const router = express.Router();

router.get("/summary", auth, async (req, res) => {
  try {
    // Calculate date 7 days ago
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    console.log("\n=== SUMMARY REPORT ===");
    console.log("Current time:", now.toISOString());
    console.log("Seven days ago:", sevenDaysAgo.toISOString());
    console.log("User:", req.user.username);
    console.log("Role:", req.user.role);
    console.log("BranchId:", req.user.branchId);

    const match = {
      date: { $gte: sevenDaysAgo, $lte: now },
    };

    // If user is not admin, filter by their branch
    if (req.user.role !== "admin" && req.user.branchId) {
      match.branch = new mongoose.Types.ObjectId(req.user.branchId);
      console.log("Filtering by branch:", req.user.branchId);
    }

    console.log("Match query:", JSON.stringify(match, null, 2));

    // Debug: Check all sales in database
    const allSalesCount = await Sale.countDocuments();
    console.log("Total sales in database:", allSalesCount);

    // Debug: Check sales for this query
    const matchingSales = await Sale.find(match).populate("branch");
    console.log("Sales matching query:", matchingSales.length);

    if (matchingSales.length > 0) {
      console.log("Sample sales:");
      matchingSales.slice(0, 3).forEach((s) => {
        console.log(
          `  - Branch: ${s.branch?.name}, Amount: ${s.amount}, Date: ${s.date}`
        );
      });
    }

    // Aggregation
    const [agg] = await Sale.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    console.log("Aggregation result:", agg);

    const invCount = await Inventory.countDocuments(
      match.branch ? { branch: match.branch } : {}
    );

    const result = {
      totalSales: agg?.total || 0,
      salesCount: agg?.count || 0,
      inventoryItems: invCount,
    };

    console.log("Response:", result);
    console.log("=== END REPORT ===\n");

    res.json(result);
  } catch (error) {
    console.error("Summary error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch summary", error: error.message });
  }
});

export default router;
