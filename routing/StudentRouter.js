import express from "express";
import { getStudent, postStudent } from '../controller/StuentDetial.js'
import { stu_upload } from "../middleware/student_img.js";

export const stuRouting = express.Router();

stuRouting.post('/stu/:branchId',stu_upload.single('image'),postStudent);
stuRouting.get('/stu/',getStudent);
