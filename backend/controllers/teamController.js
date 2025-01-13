const Team = require('../models/Team');
const mongoose = require('mongoose');


 exports.createTeamMember = async (req, res) => {
    try {
      const { name, position, team, rank, image } = req.body;
      const newMember = new Team({ name, position, team, rank, image });
      const savedMember = await newMember.save();
      res.status(201).json(savedMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  /**
   * Update an existing team member by ID
   */
 exports.updateTeamMember = async (req, res) => {
    try {
      const updatedMember = await Team.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedMember) return res.status(404).json({ message: 'Team member not found' });
      res.status(200).json(updatedMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  /**
   * Delete a team member by ID
   */
 exports.deleteTeamMember = async (req, res) => {
    try {
      const deletedMember = await Team.findByIdAndDelete(req.params.id);
      if (!deletedMember) return res.status(404).json({ message: 'Team member not found' });
      res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  /**
   * Filter team members by team
   */
 exports.filterTeam =  async (req, res) => {
    const { team } = req.query;
    try {
      const teamMembers = await Team.find({ team });
      res.status(200).json(teamMembers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  /**
   * Sort team members by rank (ascending or descending)
   */
exports.sortTeamOnRank = async (req, res) => {
    const { order = 'asc' } = req.query;
    try {
      const sortedMembers = await Team.find().sort({ rank: order === 'asc' ? 1 : -1 });
      res.status(200).json(sortedMembers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };