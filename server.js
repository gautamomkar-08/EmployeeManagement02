require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log(process.env.MONGODB_URI); 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected To MongoDB");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });

// Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  department: String,
  position: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

// Routes
app.post("/api/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();

    res.json({
      success: true,
      message: "Employee registered successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error registering employee"
    });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching employees"
    });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting employee"
    });
  }
});

// Server start AFTER DB attempt
const PORT = 5000;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("🚀 Server Running On Port 5000");
  });
});