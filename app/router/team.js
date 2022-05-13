const { TeamController } = require('../http/controllers/team.Controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { mongoIdValidator } = require('../http/validation/public');
const { teamCreateValidation } = require('../http/validation/team');

const router = require('express').Router();

router.post("/create", checkLogin, teamCreateValidation(), expressValidationMapper, TeamController.createTeam);
router.get("/list", checkLogin, TeamController.getListOfTeam);
router.get("/teams", checkLogin, TeamController.getMyTeams);
router.get("/invite/:teamID/:username", checkLogin, TeamController.inviteUserToTeam);
router.get("/update/:teamID", checkLogin, TeamController.updateTeam);
router.get("/:id", mongoIdValidator(), expressValidationMapper, TeamController.getTeamById);
router.delete("/remove/:id", mongoIdValidator(), expressValidationMapper, TeamController.removeTeambyId);

module.exports = {
    teamRouter: router
};