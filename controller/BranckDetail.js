import branch from '../Scheema/branch.js'

export const postBranch = async (req, res) => {
  try {
    const { branch_code, branch_name, desc, } = req.body;

    if (!branch_code || !branch_name ) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const addbranch = await branch.create({ branch_code, branch_name, desc ,bra_img});

    return res.status(200).json({
      success: true,
      branch: addbranch,
    });

  } catch (error) {
    console.error('Error:', error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding branch.",
    });
  }
};

export const getBranches = async (req, res) => {


  try {
    const addbranch = await branch.find();

    if (!addbranch) {
      return res.status(404).json({
        success: false,
        message: "branch is not hare .",
      });
    }
    return res.status(200).json({
      success: true,
      branch: addbranch,
    });

  } catch (error) {
    console.error('Error:', error);

    return res.status(500).json({
      success: false,
      message: "Server error while searching branch.",
    });
  }
};
