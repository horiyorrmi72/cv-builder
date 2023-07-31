var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const BioController = require("../controllers/bioController");
const contactController = require("../controllers/contactController");
const eduController = require("../controllers/educationController");
const portfolioController = require("../controllers/portfolioController");
const skillController = require("../controllers/skillController");
const userController = require("../controllers/userController");
const passport = require("passport");
const passportConfig = require("../config/passport");

passportConfig(passport);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/*authentication*/
router.post("/signup", authController.registerUser);
router.post("/api/login", authController.authenticateUser);
router.post("/refresh-token", authController.refreshUserToken);

/* Bio */
router.post(
  "/api/addbio",
  passport.authenticate("jwt", { session: false }),
  BioController.addBio
);
router.put(
  "/api/updatebio",
  passport.authenticate("jwt", { session: false }),
  BioController.updateBio
);

/* contact*/

router.post(
  "/api/contactPlus",
  passport.authenticate("jwt", { session: false }),
  contactController.addContacts
);
router.put(
  "/api/updateContact",
  passport.authenticate("jwt", { session: false }),
  contactController.updateContact
);
router.delete(
  "/api/popContact",
  passport.authenticate("jwt", { session: false }),
  contactController.deleteContact
);

/*educatoion*/

router.post(
  "/api/addEdu",
  passport.authenticate("jwt", { session: false }),
  eduController.addEdu
);
router.put(
  "/api/updateEdu",
  passport.authenticate("jwt", { session: false }),
  eduController.updateEdu
);
router.delete(
  "/api/popEdu",
  passport.authenticate("jwt", { session: false }),
  eduController.deleteEdu
);

/*portfolio */

router.post(
  "/api/portfolioplus",
  passport.authenticate("jwt", { session: false }),
  portfolioController.addToPortfolio
);
router.put(
  "/api/updatePortfolio",
  passport.authenticate("jwt", { session: false }),
  portfolioController.updatePortfolio
);
router.delete(
  "/api/popPortfolio",
  passport.authenticate("jwt", { session: false }),
  portfolioController.deletePortfolioProject
);

/* skills*/

router.post(
  "/api/skillplus",
  passport.authenticate("jwt", { session: false }),
  skillController.addSkill
);
router.put(
  "/api/skillsupdate",
  passport.authenticate("jwt", { session: false }),
  skillController.updateSkill
);
router.delete(
  "/api/popskill",
  passport.authenticate("jwt", { session: false }),
  skillController.deleteSkill
);

/* users */

router.get("/users", userController.listUsers);
router.get("/users/:id", userController.getUsersById);
router.delete("users/delete/:username", userController.deleteUser);

module.exports = router;
