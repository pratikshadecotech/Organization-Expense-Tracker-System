import express from "express"
import userModel from "../Model/userModel.js";
// import bcrypt from "bcrypt"
import { hashPassword, comparePassword } from "../../Helper/authHelper.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';


// JWT Secret Key
const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx";

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        // Validation
        if (!name) return res.status(400).send("Name is required");
        if (!lastname) return res.status(400).send("Lastname is required");
        if (!email) return res.status(400).send("Email is required");
        if (!password) return res.status(400).send("Password is required");

        // Existing user validation
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // add role
        role = 'accountant';

        // Create a new user
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).send({
            status: "success",
            message: "User registered successfully",
            user: newUser,
            token
        });


    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send("Internal server error");
    }
};


//Update user details
export const userUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, email, password } = req.body;

        //check if user exists
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).send('user not found');
        }

        //check if email already exists for another user
        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send('Email already in use');
            }
        }

        //update user details
        if (name) user.name = name;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        // if(password) user.password = await hashPassword(password);
        if (password) user.password = (password);

        //save updated user
        const updatedUser = await user.save();

        res.status(200).send({

            status: "success",
            message: "user register successflly",
            user: updatedUser
        })
    } catch (error) {
        console.log(`Error in API:${error}`)
        res.status(500).send('internal server error')
    }
}

//Delete user by ID
export const userDeleteController = async (req, res) => {
    try {
        const { id } = req.params;

        //check if user exists
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).send('user not found');

        }

        //delete user
        await userModel.findByIdAndDelete(id);

        res.status(200).send({

            status: "success",
            message: "user deleted successflly",
        })
    } catch (error) {
        console.log(`Error in API:${error}`)
        res.status(500).send('internal server error')
    }
}


//Get single user details by ID
export const getSingleUserDeleteController = async (req, res) => {
    try {
        const { id } = req.params;

        //check if user exists
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).send('user not found');

        }

        res.status(200).send({

            status: "success",
            message: "user details fetched successflly",
            user
        })
    } catch (error) {
        console.log(`Error in API:${error}`)
        res.status(500).send('internal server error')
    }
}


// get all users 
export const getUserController = async (req, res) => {
    try {
        const getUser = await userModel.find({})
        if (!users || users.length === 0) {
            res.status(404).send("no user found")
        }
        res.status(500).send({
            status: 'success',
            message: "get all users details successfully",
            getUser,
        })
    }
    catch (error) {
        console.log(`error in api ${error}`);
        res.status(200).send('internal server error')
    }
}



// User login controller
export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        // Check if user exists
        const user = await userModel.findOne({ email });

        console.log(user.password);
        console.log(password);

        if (!user) {
            return res.status(404).send("User not found");
        }


        // Check if password matches
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).send({
            status: "success",
            message: "User logged in successfully",
            user,
            token


        });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};




