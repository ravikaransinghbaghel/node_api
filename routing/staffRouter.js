import express from 'express';
import { getStaff, postStaff } from '../controller/staffDetail.js';
import { staff_upload } from '../middleware/staff_img.js';

export const staffRouting = express.Router();

staffRouting.post('/staff/:branchID', staff_upload.single('image'), postStaff);
staffRouting.get('/staff', getStaff);