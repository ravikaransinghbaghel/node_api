import express from 'express';
import { register,login,logout, isEmailVerification, forgatPass, users } from '../controller/registerDetail.js';
import { isAuthanication } from '../middleware/authMiddle.js';

export const registerRouting = express.Router();

registerRouting.post('/signup', register);
registerRouting.post('/login', login);
registerRouting.post('/logout', logout);
registerRouting.post('/verify', isEmailVerification);
registerRouting.get('/forget',isAuthanication, forgatPass);
registerRouting.get('/users',users);
