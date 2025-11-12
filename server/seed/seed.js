import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Branch from "../models/Branch.js";
import User from "../models/User.js";
import Inventory from "../models/Inventory.js";
import Sale from "../models/Sale.js";

dotenv.config();
await connectDB();

console.log("Seeding sample data...");
console.log("Current date:", new Date());

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

console.log("Branches created:");
console.log("Colombo ID:", colombo._id.toString());
console.log("Kandy ID:", kandy._id.toString());

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

for (const userData of users) {
  const user = new User(userData);
  await user.save();
  console.log(
    `User created: ${userData.username}, branch: ${userData.branch || "none"}`
  );
}

// Create inventory items
await Inventory.insertMany([
  { itemName: "Ribeye Steak", quantity: 50, branch: colombo._id },
  { itemName: "T-Bone Steak", quantity: 35, branch: colombo._id },
  { itemName: "Chicken Breast", quantity: 80, branch: kandy._id },
]);

// Create sales data for the LAST 7 days
const today = new Date();
const salesData = [];

console.log("Creating sales for the last 7 days:");

for (let i = 0; i < 7; i++) {
  const saleDate = new Date();
  saleDate.setDate(today.getDate() - i); // Go back i days from today
  saleDate.setHours(14, 30, 0, 0); // 2:30 PM each day

  console.log(`Day ${i}: ${saleDate.toISOString()}`);

  // Colombo sales
  salesData.push({
    branch: colombo._id,
    amount: 50000 + i * 2500,
    date: saleDate,
  });

  // Kandy sales
  salesData.push({
    branch: kandy._id,
    amount: 30000 + i * 1800,
    date: saleDate,
  });
}

const insertedSales = await Sale.insertMany(salesData);
console.log(`\nCreated ${insertedSales.length} sales records`);
console.log("Sample sales:");
insertedSales.slice(0, 4).forEach((s) => {
  console.log(`  - Branch: ${s.branch}, Amount: ${s.amount}, Date: ${s.date}`);
});

console.log("\nSeed completed successfully.");
process.exit(0);
