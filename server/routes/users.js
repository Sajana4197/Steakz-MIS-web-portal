import express from "express";
import { auth, authorize } from "../middleware/auth.js";
import User from "../models/User.js";
import Branch from "../models/Branch.js";

const router = express.Router();

router.get("/", auth, authorize("admin"), async (_req, res) => {
  const users = await User.find()
    .populate("branch", "name location")
    .select("-password");
  res.json(users);
});

router.post("/", auth, authorize("admin"), async (req, res) => {
  const { username, password, role, branchId } = req.body;
  const branch = branchId ? await Branch.findById(branchId) : null;
  const user = new User({
    username,
    password,
    role,
    branch: branch?._id || null,
  });
  await user.save();
  res.status(201).json({ message: "User created" });
});

// Password reset endpoint
router.put("/:id/password", auth, authorize("admin"), async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save(); // This will trigger the pre-save hook to hash the password

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

router.delete("/:id", auth, authorize("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
