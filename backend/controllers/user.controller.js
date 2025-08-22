import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';

// REGISTER
export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        delete user._doc.password;
        res.status(201).json({ user, token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// LOGIN
export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await user.generateJWT();

        delete user._doc.password;
        
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// PROFILE
export const profileController = async (req, res) => {
    console.log(req.user);

    res.status(200).json({
        user: req.user
    });
};

export const logoutController = async (req, res) => {
    try{

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        redisClient.set(token, 'logout', 'EX', 60*60*24); // Set token in Redis with 24 hour expiration

        res.status(200).json({ message: 'Logged out successfully' });


    } catch (error) {
       console.log(err);
       res.status(400).send(err.message);
    }

};
