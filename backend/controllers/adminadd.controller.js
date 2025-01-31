import Admin from '../models/adminadd.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../Utils/error.js';
import jwt from 'jsonwebtoken';

export const AdminManagement = async (req, res) => {
  try {
    const { username, email, password, redirectPage } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword, redirectPage });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    console.log(`Updating admin with id: ${id}`);
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // Update fields
    admin.username = username || admin.username;
    admin.email = email || admin.email;
    if (password) {
      admin.password = await bcryptjs.hash(password, 10); // Hash the new password
    }

    const updatedAdmin = await admin.save();
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(`Error updating admin with id: ${id}`, error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting admin with id: ${id}`);
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(`Error deleting admin with id: ${id}`, error);
    res.status(500).json({ message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordValid = bcryptjs.compareSync(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a token with admin ID and redirect page
    const token = jwt.sign({ id: admin._id, redirectPage: admin.redirectPage }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token }); // Send token back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};