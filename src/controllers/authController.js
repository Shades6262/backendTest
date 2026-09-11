const bcrypt = require('bcryptjs');
const User = require('../models/authModel');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');



//register user

const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        //check if user exists
        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({ message: 'User already exists' });
        }
        // hash password
        const hashPass = await bcrypt.hash(password, 10)

        //create user
        const user = await User.create({
            name,
            email,
            password: hashPass,
            role
        });

        // Send mail to the user after successful registration
        await sendMail({
            to: email,
            subject: 'Welcome to Our Service',
            html: `<div style="background-color: #0f172a; color: #f8fafc; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; border-radius: 10px; border-top: 4px solid #3b82f6;">
  
                        <h1 style="color: #60a5fa; font-size: 2rem; margin-top: 0; margin-bottom: 10px;">Welcome, ${user.name}! /h1>
                        
                        <div style="background-color: #1e293b; padding: 20px; border-radius: 6px; border-left: 3px solid #3b82f6; margin-bottom: 25px;">
                            <p style="margin: 0; line-height: 1.6; font-size: 1.05rem;">
                            Ati Register o! Thank you for joining us. You've successfully set up your account and unlocked full access to the platform. Eje, the setup is done—now it's time to build.
                            </p>
                        </div>

                        <div style="text-align: center; margin: 30px 0;">
                            <!-- Swap the href with your actual frontend login route -->
                            <a href="https://your-app-link.com/login" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 25px; font-size: 1rem; font-weight: bold; border-radius: 5px; display: inline-block;">Access Dashboard</a>
                        </div>

                        <hr style="border: 0; height: 1px; background-color: #334155; margin: 25px 0 15px 0;">

                        <p style="color: #64748b; font-size: 0.85rem; text-align: center; margin: 0;">
                            Need help? Just reply to this email.<br>
                            &copy; 2026 Your App Name.
                        </p>
                    </div>`
        });
        res.status(201).json({ message: 'User created successfully', user });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const loginuser = async (req, res) => {
    const { email, password } = req.body;
    // check if user is registered
    try{
        const user = await User.findOne({ email });
    
    if(!user){
        return res.status(400).json({ message: 'User not found' });
    }

    // check if password is correct
    const passCor = await bcrypt.compare(password, user.password);
    
    //password incorrect 
    if(!passCor){
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
    res.status(200).json({ message: 'Login successful', user, token });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const profIle = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Profile retrieved successfully', user });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        // Tip: Log the error so you can see exactly what failed in the console
        console.error("Delete User Error:", err); 
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {registerUser, loginuser, profIle, deleteUser};