const nodemailer = require("nodemailer");
const User = require('../models/user');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false because we are using port 587, which is for non-SSL connections
  auth: {
    user: "", //enter email here
    pass: "", // enter pass key here 
  },
});

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({email: email});
    if(!userData) res.status(404).json({message: "User not found"});

    const otp = crypto.randomInt(100000, 999999).toString();

    const userId = userData._id.toString();

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { $set: { otp } },         // Update only the "name" field
      { new: true }               // Return the updated document
    );

    // Sends email containing OTP to user
    const response = this.emailSender(email, otp);
    if(response){
      res.status(200).json({message: "OTP sent successfully!"});
    }else{
      res.status(400).json({message: "OTP not sent!"})
    }
  } catch (error) {
    console.error('Error sending OTP: ', error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
};


// Validates that OTP entered by user and OTP present in database are matching or not
exports.validateOtp = async (req, res) => {
  const { id, otp } = req.body;
  try {
    const userData = await User.findById(id);
    console.log(otp, typeof otp);
    console.log(userData.otp, typeof userData.otp);
    const isValid = (userData.otp === otp);
    console.log(isValid);
    if (isValid) {
      const updatedUser = await User.findByIdAndUpdate( id, { $set: { emailVerified: isValid } }, { new: true } );
      console.log(updatedUser);
      res.status(200).json({ message: 'Email Verified' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error validating OTP: ', error);
    res.status(500).json({ error: 'Error validating OTP' });
  }
};

exports.emailSender = async (email,otp) => {
  try{
    const info = await transporter.sendMail({
      from: '"Krati Gupta" <place email here>', // sender's email address
      to: `${email}`, // recipients' email addresses
      subject: "Email Verification OTP", // subject line
      text: `Your OTP is ${otp}`, // plain text body
      html: `<b>Your OTP is ${otp}</b>`, // HTML body
    });
  
    console.log("Message sent: %s", info.messageId); // Log message ID
    return true;
  }catch(err){
    console.err(err);
  }
}
