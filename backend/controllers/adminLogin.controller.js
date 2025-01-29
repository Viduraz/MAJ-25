import Admin from '../models/adminadd.model.js';
import bcryptjs from 'bcryptjs';

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

    // Optionally, you can return a token or admin details
    res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 