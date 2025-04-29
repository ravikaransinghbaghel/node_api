import mongoose from 'mongoose';

const branchScheema = new mongoose.Schema({
    branch_code: {
        type: Number,
        required: true
    },
    branch_img: {
        type: String,
        required: true
    },
    branch_img_path:{
        type: String,
        required: true
    },
    branch_name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("Branch", branchScheema);