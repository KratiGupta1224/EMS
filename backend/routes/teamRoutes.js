const express = require('express');
const { createTeamMember, updateTeamMember, deleteTeamMember, filterTeam, sortTeamOnRank } = require('../controllers/teamController');

const router = express.Router();

router.post('/create-member', createTeamMember);
router.put('/update-member/:id', updateTeamMember);
router.delete('/delete-member/:id', deleteTeamMember);
router.get('/filter', filterTeam);
router.get('/sort/rank', sortTeamOnRank);



module.exports = router;