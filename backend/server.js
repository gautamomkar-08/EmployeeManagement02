
const dns = require("dns");
// dns.setDefaultResultOrder('ipv4first');
const mongoose = require("mongoose");
mongoose.connect("mongodb://gautamomkar242_db_user:omkargautam747094@ac-mbyvj9n-shard-00-00.h7ggwf2.mongodb.net:27017,ac-mbyvj9n-shard-00-01.h7ggwf2.mongodb.net:27017,ac-mbyvj9n-shard-00-02.h7ggwf2.mongodb.net:27017/?ssl=true&replicaSet=atlas-espq59-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("Connected To MongoDB");
}).catch((err) => {
    console.log("Error Connecting To MongoDB", err);
});

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    department: String,
    position: String,
});
const Employee = mongoose.model("Employee", employeeSchema);
app.post("/api/employees", async (req, res) => {
    console.log(req.body);
    try {
        const employees = new Employee(req.body);
        await employees.save();
        res.json({
            success: true,
            message: "Employee registered successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error registering employee"
        });
    }
});
app.get("/api/employees", async (req, res) => {
    console.log(req.body);
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error registering employee"
        });
    }
});
app.delete("/api/employees/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
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
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error deleting employee"
        });
    }
});
app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});