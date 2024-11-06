const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;

// Register a new user
const Users = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        // check Email
        if (!email) {
            return res.status(400).json({ message: 'Please provide an email' });
        }
        const user = await User.findOne({ email });
        // check User
        if (user) {
            return res.status(400).json({ message: 'email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            role: 'user'
        });
        // Save the user to the database
        newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { name, phone, address, city, country, zip, image } = req.body;

    try {
        const existingUser = await User.findById(req.params.id);
        // Check if image is provided
        let image;
        if (req.file) {
            let pathToFile = req.file.path;
            const result = await cloudinary.uploader.upload(pathToFile);
            image = result.secure_url;
        } else {
            image = existingUser.image;
        }

        // Check Email
        if (!req.params.id) {
            return res.status(400).json({ message: 'Please provide an id' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, { name, image, city, address, phone, country, zip }, { new: true });
        res.json({ message: 'User profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login User 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check Email Address
        if (!email) {
            return res.status(400).json({ message: 'Please provide an email' });
        }
        // Check Email In Database 
        const user = await User.findOne({ email });

        // Check IsBlocked
        if (user.isBlock) {
            return res.status(400).json({ message: 'User is blocked' });
        }

        // Check if User Exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { role: user.role })
        res.json({ message: 'User logged in successfully', token, role: user.role });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get User Profile

const getUserProfile = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token is not provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            role: user.role,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                date: user.date,
                status: user.status,
                image: user.image,
                city: user.city,
                country: user.country,
                zip: user.zip,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
            },
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Logout User
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Block User
const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isBlock = !user.isBlock;
        await user.save();
        if (user.isBlock) {
            return res.status(200).json({ message: 'User is now blocked', user });
        } else {
            return res.status(200).json({ message: 'User is now unblocked', user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// DElete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}





module.exports = {
    Users,
    loginUser,
    getUserProfile,
    logoutUser,
    getAllUsers,
    blockUser,
    deleteUser,
    updateUserProfile

};




