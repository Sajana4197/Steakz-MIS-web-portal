import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Branch from "../models/Branch.js";
import User from "../models/User.js";
import Inventory from "../models/Inventory.js";
import Sale from "../models/Sale.js";

dotenv.config();
await connectDB();

console.log("Seeding sample data...");

// Clear existing data
await Promise.all([
  User.deleteMany({}),
  Branch.deleteMany({}),
  Inventory.deleteMany({}),
  Sale.deleteMany({}),
]);

// Create branches
const branches = await Branch.insertMany([
  { name: "Colombo City", location: "Colombo 03" },
  { name: "Kandy Hills", location: "Kandy" },
]);
const [colombo, kandy] = branches;

// Create users with proper password hashing
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  {
    username: "manager_colombo",
    password: "manager123",
    role: "manager",
    branch: colombo._id,
  },
  {
    username: "employee_colombo",
    password: "employee123",
    role: "employee",
    branch: colombo._id,
  },
  {
    username: "manager_kandy",
    password: "manager123",
    role: "manager",
    branch: kandy._id,
  },
];

// Save users individually to trigger pre-save hook for password hashing
for (const userData of users) {
  const user = new User(userData);
  await user.save();
}

console.log("Users created with hashed passwords");

// Create inventory items
await Inventory.insertMany([
  { itemName: "Ribeye Steak", quantity: 50, branch: colombo._id },
  { itemName: "T-Bone Steak", quantity: 35, branch: colombo._id },
  { itemName: "Chicken Breast", quantity: 80, branch: kandy._id },
]);

// Create sales data
const today = new Date();
const days = [0, 1, 2, 3, 4, 5, 6];
await Sale.insertMany(
  days.flatMap((d) => [
    {
      branch: colombo._id,
      amount: 50000 + d * 2500,
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - d
      ),
    },
    {
      branch: kandy._id,
      amount: 30000 + d * 1800,
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - d
      ),
    },
  ])
);

console.log("Seed completed successfully.");
process.exit(0);
