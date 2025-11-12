import express from "express";
import { auth, authorize } from "../middleware/auth.js";
import Inventory from "../models/Inventory.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  let query = {};
  if (req.user.role === "admin" && req.query.branch)
    query.branch = req.query.branch;
  else if (req.user.branchId) query.branch = req.user.branchId;
  const items = await Inventory.find(query).populate("branch", "name location");
  res.json(items);
});

router.post("/", auth, authorize("admin", "manager"), async (req, res) => {
  const { itemName, quantity, branch } = req.body;
  const doc = await Inventory.create({
    itemName,
    quantity,
    branch: req.user.role === "admin" ? branch : req.user.branchId,
  });
  res.status(201).json(doc);
});

router.put("/:id", auth, authorize("admin", "manager"), async (req, res) => {
  const update = { itemName: req.body.itemName, quantity: req.body.quantity };
  const doc = await Inventory.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.json(doc);
});

router.delete("/:id", auth, authorize("admin", "manager"), async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
