import express from 'express';
import { register,login,logout } from '../controller/registerDetail.js';

export const registerRouting = express.Router();

registerRouting.post('/signup', register);
registerRouting.post('/login', login);
registerRouting.post('/logout', logout);
