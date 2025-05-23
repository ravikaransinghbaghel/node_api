import express from "express";
import { getStudent, postStudent } from '../controller/StuentDetial.js'
import { stu_upload } from "../middleware/student_img.js";
import { isAuthanication } from "../middleware/authMiddle.js";
import { adminAuthanication } from "../middleware/adminMiddle.js";

export const stuRouting = express.Router();

stuRouting.post('/stu/:branchId',stu_upload.single('image'),postStudent);
// stuRouting.post('/stu/:branchId',postStudent);
stuRouting.get('/stu',getStudent);
