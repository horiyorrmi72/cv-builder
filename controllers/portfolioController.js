const portfolio = require("../models/portfolio");
const messages = require("../utils/messages");

const addToPortfolio = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { title, project_description, project_image, project_link } =
      req.body;
    if ((!title || !project_description || !project_image, !project_link)) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage || "All fields required.",
      });
    }
    const portfolioData = new experience({
      user_id: user_id,
      title,
      project_description,
      project_image,
      project_link,
    }).save();
    return res.json({
      status: 200,
      message: "successfully added to your portfolio info",
      data: portfolioData,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, jobTitle, jobDuration } = req.body;
    const projectToUpdate = experience.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        project_description: project_description,
        project_image: project_image,
        project_link: project_link,
      },
      { new: true }
    );
    if (!title || !project_description || !project_image) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage,
      });
    }
    return res.json({
      status: 200,
      message: "Successfully Updated Yout Portfolio",
      data: projectToUpdate,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const deletePortfolioProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectToDelete = portfolio.deleteOne({ _id: id });
    if (projectToDelete.deletedCount === 0) {
      return res.json({ status: 400, message: "Data Not Found." });
    }
    if (projectToDelete.deletedCount === 1) {
      return res.json({
        status: 200,
        message: `Portfolio Project with id: ${id} Deleted Successfully!`,
        deletedData: projectToDelete,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addToPortfolio,
  updatePortfolio,
  deletePortfolioProject,
};
