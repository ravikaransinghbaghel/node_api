import mongoose, { Types } from "mongoose";

const staffScheema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staff_img: {
        type: String,
        required: true
    },
    staff_img_path:{
        type: String,
        required: true
    },
    post_name: {
        type: String,
        required: true
    },
    relative_branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true, 
    }
}, { timestamps: true });

export default mongoose.model('Staff', staffScheema);