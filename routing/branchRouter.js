import express from 'express';
import { postBranch, getBranches } from '../controller/BranchDetail.js';
import { bra_upload } from '../middleware/bra_img.js';
import { isAuthanication } from '../middleware/authMiddle.js';
import { adminAuthanication } from '../middleware/adminMiddle.js';

export const braRoute = express.Router();

// braRoute.post('/branch',bra_upload.single('image'),postBranch);
braRoute.post('/branch',isAuthanication,adminAuthanication,postBranch);
braRoute.get('/branch',getBranches);