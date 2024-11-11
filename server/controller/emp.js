import { Employee } from "../model/emp.js";
import mongoose from "mongoose";
import {
  uploadOnCloudinary,
  getCloudinaryPublicId,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, dsg, gender, course } = req.body;
    const imgFile = req.file;

    console.log("name:", name);
    console.log("email:", email);
    console.log("mobile:", mobile);
    console.log("dsg:", dsg);
    console.log("gender:", gender);
    console.log("course:", course);
    console.log("imgFile:", imgFile);

    // Basic validation checks
    if (!name || !email || !mobile || !dsg || !gender || !course || !imgFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Upload image to Cloudinary
    const imgUploadUrl = await uploadOnCloudinary(imgFile.path);

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      dsg,
      gender,
      course,
      imgupload: imgUploadUrl.secure_url,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees, total: employees.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id) && id.length === 24;

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid employee ID format" });
  }
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { name, email, mobile, dsg, gender, course } = req.body;
    const file = req.file;
    const { id } = req.params;
    console.log(req.file);

    // Validate MongoDB ObjectId format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid employee ID format. Please provide a valid MongoDB ObjectId.",
      });
    }

    // Check if employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check for duplicate email
    if (email) {
      const existingEmployee = await Employee.findOne({
        email,
        _id: { $ne: id },
      });
      if (existingEmployee) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Prepare fields to be updated
    const updatedFields = { name, email, mobile, dsg, gender, course };

    // Handle image upload if a file is provided
    if (file) {
      // Delete existing image from Cloudinary
      if (employee.imgupload) {
        const publicId = getCloudinaryPublicId(employee.imgupload);
        await deleteFromCloudinary(publicId);
      }

      // Upload the new image to Cloudinary
      const uploadResult = await uploadOnCloudinary(file.path);
      if (!uploadResult) {
        return res.status(500).json({ message: "Failed to upload new image" });
      }
      updatedFields.imgupload = uploadResult.secure_url;
    }

    // Update employee record
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Employee updated successfully",
      record: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid employee ID format. Please provide a valid MongoDB ObjectId.",
      });
    }

    // Find employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete associated image from Cloudinary, if exists
    if (employee.imgupload) {
      const publicId = getCloudinaryPublicId(employee.imgupload);
      await deleteFromCloudinary(publicId);
    }

    // Delete employee record from database
    await Employee.findByIdAndDelete(id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
