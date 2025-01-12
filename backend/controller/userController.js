import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import bcrypt from 'bcrypt';

export const Register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role, profilePicture } = req.body;

        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role || !profilePicture) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePicture
            }
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Provide Email and Password",
            });
        }

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Not Valid Details",
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            res.status(400).json({
                success: false,
                message: "Not Valid Details",
            });
        }

        if (role !== user.role) {
            res.status(400).json({
                success: false,
                message: "Not Valid Details",
            });
        }

        const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1D' })

        return res.cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            httpOnly: true
        }).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user,

        })

    } catch (error) {
        console.log(error);
    }
}

export const Logout = async (req, res) => {
    try {
        return res.clearCookie('token', "", { maxAge: 0 }).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        console.log(error);

    }
}

export const imageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File Not Upload"
            })
        }
        const imageURl = `http://localhost:5555/uploads/${req.file.filename}`

        return res.status(201).json({
            success: true,
            message: "File Uploaded",
            imageURl
        })

    } catch (error) {
        console.log(error);
    }
}


export const updateUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills, resume } = req.body;
        const userId = req.id;

        console.log(fullname, email, phoneNumber, bio, skills);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        // Fetch user from database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        let skillsArray;
        if (skills) skillsArray = skills.split(",")

        // Update user fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) {
            user.profile.skills = skillsArray
        }
        if (resume) {
            user.profile.resume = resume
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user,
        });
    } catch (error) {
        console.error("Error updating user:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the user.",
        });
    }
};
