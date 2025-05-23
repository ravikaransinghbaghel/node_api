import mongoose from "mongoose";

const studentScheema = new mongoose.Schema({
    name: { type: String, required: true },
    enrollment: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    // mob_no: { type: Number, required: true, },
    stu_img: {
        type: String,
        required: true
    },
    stu_img_path:{
        type: String,
        required: true
    },
    addmi_year: {
        type: String,
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
}, { timestamps: true })

export default mongoose.model("Student", studentScheema);