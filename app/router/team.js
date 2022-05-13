const { TeamController } = require('../http/controllers/team.Controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { mongoIdValidator } = require('../http/validation/public');
const { teamCreateValidation } = require('../http/validation/team');

const router = require('express').Router();

router.post("/create", checkLogin, teamCreateValidation(), expressValidationMapper, TeamController.createTeam);
router.get("/list", checkLogin, TeamController.getListOfTeam);
router.get("/:id", mongoIdValidator(), expressValidationMapper, TeamController.getTeamById);

module.exports = {
    teamRouter: router
};