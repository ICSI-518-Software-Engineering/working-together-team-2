// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, isVendor } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({ username, email, password: hashedPassword, isVendor }); // Store hashed password in the database
        await newUser.save();
        let userType = isVendor ? 'Vendor' : 'Customer';
        res.status(201).json({ message: `${userType} created successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password, isVendor } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the user is a vendor
        if (user.isVendor !== isVendor) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Passwords match and isVendor check passed, user authenticated successfully
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;
