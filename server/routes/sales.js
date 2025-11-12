import express from "express";
import { auth, authorize } from "../middleware/auth.js";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  let query = {};
  if (req.user.role !== "admin" && req.user.branchId)
    query.branch = req.user.branchId;
  else if (req.query.branch) query.branch = req.query.branch;
  const sales = await Sale.find(query).sort({ date: -1 }).limit(100);
  res.json(sales);
});

router.post(
  "/",
  auth,
  authorize("admin", "manager", "employee"),
  async (req, res) => {
    const { amount, date, branch } = req.body;
    const doc = await Sale.create({
      amount,
      date: date || new Date(),
      branch: req.user.role === "admin" ? branch : req.user.branchId,
    });
    res.status(201).json(doc);
  }
);

export default router;
