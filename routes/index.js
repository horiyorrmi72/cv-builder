var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const BioController = require('../controllers/bioController');
const contactController = require('../controllers/contactController');
const eduController = require('../controllers/educationController');
const portfolioController = require('../controllers/portfolioController');
const skillController = require('../controllers/skillController');
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*authentication*/
router.post('/signup', authController.registerUser);
router.post('/login', authController.authenticateUser);
router.post('/refresh-token', authController.refreshUserToken);

/* Bio */
router.post('/addbio', BioController.addBio);
router.put('/updatebio', BioController.updateBio);
/* contact*/

router.post('/contactPlus', contactController.addContacts);
router.put('/updateContact', contactController.updateContact);
router.delete('/popContact',contactController.deleteContact);

/*educatoion*/

router.post('/addEdu',eduController.addEdu);
router.put('/updateEdu',eduController.updateEdu);
router.delete('/popEdu',eduController.deleteEdu);

/*portfolio */

router.post('/portfolioplus',portfolioController.addToPortfolio);
router.put('/updatePortfolio',portfolioController.updatePortfolio);
router.delete('/popPortfolio',portfolioController.deletePortfolioProject);

/* skills*/

router.post('/skillplus',skillController.addSkill);
router.put('/skillsupdate',skillController.updateSkill);
router.delete('/popskill',skillController.deleteSkill);

/* users */

router.get('/', userController.listUsers );
router.get('/:id',userController.getUsersById);
router.delete('delete/:username', userController.deleteUser);



module.exports = router;
