// Import required modules
const express = require('express');
const User = require('../models/user'); // Assuming you have a User model in your project


exports.getAllUsers = async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      res.status(200).json(users);  // Send users as a response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

exports.getUserById = async (req, res) => {
    const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getUserByEmail = async (req, res) => {
  try{
    const {email} = req.body;
    const userData = await User.findOne({email: email});
    if(!userData) res.status(404).json({message: "User not found"});
    res.status(200).json(userData);
  }catch(err){
    res.status(500).json({message: "Server error"});
  }
};