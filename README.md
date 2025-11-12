# 🥩 Steakz MIS - Management Information System

<div align="center">

![Steakz MIS](https://img.shields.io/badge/Steakz-MIS-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)

A modern, full-stack Management Information System designed for Steakz Restaurant Chain with role-based access control, real-time dashboards, and comprehensive business management features.

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [API Documentation](#api-documentation)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [User Roles & Access](#user-roles--access)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔐 Authentication & Authorization

- **Secure JWT-based authentication**
- **Role-based access control** (Admin, Manager, Employee)
- **Password encryption** using bcrypt
- **Password reset functionality** with validation requirements
- **Session management** with automatic token refresh

### 📊 Dashboard & Analytics

- **Real-time sales dashboard** with interactive charts
- **7-day sales trends** visualization using Chart.js
- **Transaction tracking** and reporting
- **Inventory level monitoring**
- **Branch-specific data filtering**

### 💼 User Management (Admin Only)

- **Create, update, and delete users**
- **Role assignment** and branch allocation
- **Password reset** for any user
- **Self-deletion prevention** for logged-in admin
- **User activity tracking**

### 📦 Inventory Management

- **Add, update, and delete inventory items**
- **Real-time stock level monitoring**
- **Branch-wise inventory tracking**
- **Low stock alerts**
- **Item quantity management**

### 💰 Sales Management

- **Record and track sales transactions**
- **Branch-specific sales data**
- **Date-wise sales filtering**
- **Sales history with pagination**
- **Amount validation and formatting**

### 🎨 Modern UI/UX

- **Futuristic login page** with animations
- **Glassmorphism design** elements
- **Toast notifications** for user feedback
- **Responsive design** for all devices
- **Dark theme** with gradient accents
- **Floating particles** and animated backgrounds
- **Password strength indicators**

---

## 🛠 Tech Stack

### Frontend

- **React 19.2** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Chart.js & React-ChartJS-2** - Data visualization
- **CSS-in-JS** - Inline styling with animations

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management

---

## 💻 System Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB** (v6.0 or higher)
  - Local installation OR
  - MongoDB Atlas account (cloud database)
- **Git** (for cloning the repository)

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sajana4197/Steakz-MIS-web-portal.git
cd Steakz-MIS-web-portal
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

**Backend Dependencies:**

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1",
  "morgan": "^1.10.0"
}
```

**Dev Dependencies:**

```bash
npm install -D nodemon
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

**Frontend Dependencies:**

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.9.5",
  "axios": "^1.13.2",
  "chart.js": "^4.5.1",
  "react-chartjs-2": "^5.3.1"
}
```

---

## ⚙️ Configuration

### Step 1: Setup MongoDB

**Option A: Local MongoDB**

```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod --dbpath /path/to/data/directory
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/steakz-mis`)

### Step 2: Create Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/steakz-mis
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/steakz-mis

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Optional: API Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 3: Create Frontend Environment Variables (Optional)

Create a `.env` file in the `client` directory:

```bash
cd client
touch .env
```

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Step 1: Seed the Database

Populate the database with initial data (branches, users, inventory, sales):

```bash
cd server
npm run seed
```

**Expected Output:**

```
Seeding sample data...
MongoDB connected: localhost
Branches created: [...]
Users created with hashed passwords
Created 14 sales records
Seed completed successfully.
```

### Step 2: Start the Backend Server

```bash
cd server
npm run dev
```

**Expected Output:**

```
[nodemon] starting `node server.js`
MongoDB connected: localhost
Server listening on port 5000
```

The backend will run on: **http://localhost:5000**

### Step 3: Start the Frontend Development Server

Open a **new terminal window**:

```bash
cd client
npm run dev
```

**Expected Output:**

```
VITE v7.2.2  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

The frontend will run on: **http://localhost:5173**

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 👥 User Roles & Access

### 🔴 Admin

**Full system access:**

- ✅ View all branches' data
- ✅ Create, update, delete users
- ✅ Reset any user's password
- ✅ Manage all inventory items
- ✅ View all sales records
- ✅ Access complete dashboard analytics
- ❌ Cannot delete themselves

### 🟡 Manager

**Branch-specific management:**

- ✅ View own branch data
- ✅ Add/remove inventory items for their branch
- ✅ Record sales for their branch
- ✅ View branch-specific dashboard
- ❌ Cannot access user management
- ❌ Cannot view other branches' data

### 🟢 Employee

**Basic operations:**

- ✅ View inventory (read-only)
- ✅ Record sales for their branch
- ✅ View basic dashboard
- ❌ Cannot modify inventory
- ❌ Cannot access user management
- ❌ Limited analytics access

---

## 🔑 Demo Credentials

After running the seed script, use these credentials to login:

| Role         | Username           | Password      | Branch       | Access Level   |
| ------------ | ------------------ | ------------- | ------------ | -------------- |
| **Admin**    | `admin`            | `admin123`    | All Branches | Full Access    |
| **Manager**  | `manager_colombo`  | `manager123`  | Colombo City | Branch Manager |
| **Manager**  | `manager_kandy`    | `manager123`  | Kandy Hills  | Branch Manager |
| **Employee** | `employee_colombo` | `employee123` | Colombo City | Basic Access   |

---

## 📁 Project Structure

```
Steakz-MIS-web-portal/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── PasswordInput.jsx    # Password input with visibility toggle
│   │   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   │   ├── RoleGate.jsx         # Role-based access control
│   │   │   └── Toast.jsx            # Toast notification component
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useToast.jsx         # Toast notification hook
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Main dashboard with charts
│   │   │   ├── Inventory.jsx        # Inventory management
│   │   │   ├── Login.jsx            # Futuristic login page
│   │   │   ├── Sales.jsx            # Sales tracking
│   │   │   └── Users.jsx            # User management (Admin)
│   │   ├── services/                # API and utility services
│   │   │   ├── api.js               # Axios instance & interceptors
│   │   │   └── auth.js              # Authentication utilities
│   │   ├── App.jsx                  # Main app component & routing
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Global styles & animations
│   ├── .env                         # Frontend environment variables
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite configuration
│
├── server/                          # Backend Node.js application
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── models/                      # Mongoose schemas
│   │   ├── Branch.js                # Branch model
│   │   ├── Feedback.js              # Feedback model
│   │   ├── Inventory.js             # Inventory model
│   │   ├── Sale.js                  # Sale model
│   │   └── User.js                  # User model with password hashing
│   ├── routes/                      # Express routes
│   │   ├── auth.js                  # Authentication routes
│   │   ├── inventory.js             # Inventory CRUD routes
│   │   ├── reports.js               # Dashboard summary routes
│   │   ├── sales.js                 # Sales CRUD routes
│   │   └── users.js                 # User management routes
│   ├── seed/
│   │   └── seed.js                  # Database seeding script
│   ├── .env                         # Backend environment variables
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Express server entry point
│
└── README.md                        # Project documentation
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST `/auth/login`

Login with username and password.

**Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin",
    "branch": null
  }
}
```

### User Endpoints (Admin Only)

#### GET `/users`

Get all users (requires admin role).

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
[
  {
    "_id": "...",
    "username": "manager_colombo",
    "role": "manager",
    "branch": {
      "_id": "...",
      "name": "Colombo City",
      "location": "Colombo 03"
    }
  }
]
```

#### POST `/users`

Create a new user.

**Request:**

```json
{
  "username": "new_employee",
  "password": "Password123",
  "role": "employee",
  "branchId": "branch_id_here"
}
```

#### PUT `/users/:id/password`

Reset user password.

**Request:**

```json
{
  "password": "NewPassword123"
}
```

#### DELETE `/users/:id`

Delete a user.

### Inventory Endpoints

#### GET `/inventory`

Get inventory items (filtered by branch for non-admin users).

#### POST `/inventory`

Add inventory item (Manager/Admin only).

**Request:**

```json
{
  "itemName": "Ribeye Steak",
  "quantity": 50
}
```

#### DELETE `/inventory/:id`

Remove inventory item.

### Sales Endpoints

#### GET `/sales`

Get sales records (filtered by branch for non-admin users).

#### POST `/sales`

Record a new sale.

**Request:**

```json
{
  "amount": 50000
}
```

### Reports Endpoints

#### GET `/reports/summary`

Get dashboard summary (last 7 days).

**Response:**

```json
{
  "totalSales": 350000,
  "salesCount": 14,
  "inventoryItems": 3
}
```

---

## 🎨 Screenshots

### 🔐 Futuristic Login Page

- Animated background with floating particles
- Glassmorphism design
- Password visibility toggle
- Real-time password strength validation

### 📊 Dashboard

- Sales trend chart (last 7 days)
- Total sales, transactions, and inventory cards
- Role-based data filtering
- Branch-specific analytics

### 👥 User Management (Admin)

- Create users with role assignment
- Password reset functionality
- Delete protection for logged-in admin
- Branch allocation

### 📦 Inventory Management

- Add/remove inventory items
- Real-time stock updates
- Branch-wise filtering
- Quantity management

### 💰 Sales Tracking

- Record sales transactions
- Sales history table
- Date-wise filtering
- Amount formatting

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port in server/.env
PORT=5001
```

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
mongod --version

# Or use MongoDB Atlas connection string
MONGO_URI=mongodb+srv://...
```

### CORS Errors

```env
# Update server/.env
CORS_ORIGIN=http://localhost:5173
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🔐 Security Best Practices

### Production Deployment

1. **Environment Variables:**

   - Never commit `.env` files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database Security:**

   - Use MongoDB Atlas with IP whitelisting
   - Enable authentication
   - Regular backups

3. **API Security:**

   - Implement rate limiting
   - Use HTTPS in production
   - Validate all inputs
   - Sanitize user data

4. **Password Policy:**
   - Minimum 6 characters
   - Require uppercase, lowercase, and numbers
   - Implement password history

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Deploy 'dist' folder
```

### Backend (Heroku/Railway/Render)

```bash
cd server
# Set environment variables in platform
# Deploy with Git
```

### Database (MongoDB Atlas)

- Already cloud-based
- No additional deployment needed

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sajana Wijesooriya**

- GitHub: [@Sajana4197](https://github.com/Sajana4197)
- Repository: [Steakz-MIS-web-portal](https://github.com/Sajana4197/Steakz-MIS-web-portal)

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the flexible database
- Chart.js for beautiful visualizations
- The open-source community

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ by [Sajana4197](https://github.com/Sajana4197)

</div>
