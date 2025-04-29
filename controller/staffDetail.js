import staffScheema from '../Scheema/Staff.js'

export const postStaff = async (req, resp) => {
    try {
        const { name, post_name } = req.body;
        const { branchId } = req.params;

        if (!name || !post_name ) {
            return resp.status(420).json({ message: "please fill the require field !! " });
        }
        if (!branchId) {
            return resp.status(404).json({ message: " Branch is not exise here !! " });
        }

        const addStaff = await staffScheema.create({
            name,
            post_name,
            relative_branch: branchId,
            staff_img: req.file.filename,
            staff_img_path: req.file.path.replace(/\\/g, '/')
        })

        return resp.status(200).
            json({
                success: true,
                staff: addStaff
            })

    } catch (error) {
        console.error('Error:', error);

        return resp.status(500).json({
            success: false,
            message: "Server error while adding staff.",
        });
    }
}

export const getStaff = async (req, resp) => {
    try {

        const staffes = await staffScheema.fine().populate("relative_branch");

        if (!staffes) {
            return resp.status(404).json({ message: " staff is not exise here !! " });
        }

        return resp.status(200).
            json({
                success: true,
                staffes
            })

    } catch (error) {
        console.error('Error:', error);

        return resp.status(500).json({
            success: false,
            message: "Server error while searching staff.",
        });
    }
}