import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Branch from "../models/Branch.js";
import User from "../models/User.js";
import Inventory from "../models/Inventory.js";
import Sale from "../models/Sale.js";

dotenv.config();
await connectDB();

console.log("Seeding sample data...");

await Promise.all([
  User.deleteMany({}),
  Branch.deleteMany({}),
  Inventory.deleteMany({}),
  Sale.deleteMany({}),
]);

const branches = await Branch.insertMany([
  { name: "Colombo City", location: "Colombo 03" },
  { name: "Kandy Hills", location: "Kandy" },
]);
const [colombo, kandy] = branches;

await User.insertMany([
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
]);

await Inventory.insertMany([
  { itemName: "Ribeye Steak", quantity: 50, branch: colombo._id },
  { itemName: "T-Bone Steak", quantity: 35, branch: colombo._id },
  { itemName: "Chicken Breast", quantity: 80, branch: kandy._id },
]);

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

console.log("Seed completed.");
process.exit(0);
