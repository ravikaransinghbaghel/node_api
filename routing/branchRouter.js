import express from 'express';
import { postBranch, getBranches } from '../controller/BranckDetail.js';
import { bra_upload } from '../middleware/bra_img.js';

export const braRoute = express.Router();

// braRoute.post('/branch',bra_upload.single('image'),postBranch);
braRoute.post('/branch',postBranch);
braRoute.get('/branch',getBranches);