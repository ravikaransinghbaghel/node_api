import student from '../Scheema/student.js';

export const postStudent = async (req, resp) => {
    try {
        const { name, address, addmi_year, enrollment } = req.body;
        const { branchId } = req.params;
        if (!name || !address  || !addmi_year || !enrollment) {
            return resp.status(420).json({ message: "please fill the require field !! " });
        }
        if (!branchId) {
            return resp.status(404).json({ message: " Branch is not exise here !! " });
        }

        const addStudent = await student.create({
            name, address, mob_no, addmi_year, enrollment,
            branch: branchId,
            stu_img: req.file.filename,
            stu_img_path: req.file.path.replace(/\\/g, '/')
        })
        // console.log(req.file);

        return resp.status(200).
            json({
                success: true,
                student: addStudent
            })

    } catch (error) {
        console.error('Error:', error);

        return resp.status(500).json({
            success: false,
            message: "Server error while adding student.",
        });
    }
}


export const getStudent = async (req, resp) => {
    try {

        const studentes = await student.find().populate('branch');

        if (!studentes) {
            return resp.status(404).json({
                success: false,
                message: "student is not hare .",
            });
        }

        return resp.status(200).
            json({
                success: true,
                studentes
            })

    } catch (error) {
        console.error('Error:', error);

        return resp.status(500).json({
            success: false,
            message: "Server error while searching student.",
        });
    }
}