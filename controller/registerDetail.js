import jwt from 'jsonwebtoken';
import user from '../Scheema/register.js';
import nodemailer from 'nodemailer';

export const register = async (req, resp) => {
    const { fullname, username, gender, password, email } = req.body;

    if (!fullname || !username || !gender || !password || !email) {
        return resp.status(400).json('All fields are required');
    }

    const userExist = await user.findOne({ username });
    if (userExist) {
        return resp.status(400).json('Username already exists');
    }

    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const newUser = new user({ fullname, username, gender, password, email, emailOtp });
        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'ravikaransingh124@gmail.com', pass: 'chht proa fxce uzcu' },
        });

        await transporter.sendMail({
            from: 'ravikaransingh124@gmail.com',
            to: email,
            subject: `Email Verification - mmit aligarh`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333;">Hello ${fullname},</h2>
                    <p>Thank you for registering with <strong>Your App Name</strong>!</p>
                    <p>Please use the OTP below to verify your email address:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0;">
                        ${emailOtp}
                    </div>
                    <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <br/>
                    <p>Best regards,<br/><strong>Your App Name Team</strong></p>
                </div>
            `,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const token_admin = jwt.sign({ admin: newUser }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return resp.status(200)
            .cookie("userToken", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .cookie("adminToken", token_admin, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .json({
                success: true,
                user: newUser,
                auth_token: token,
                admin_token: token_admin
            });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json('User could not be created');
    }
};

export const forgatPass = async (req, resp) => {

    const userId = req.user?.id;
    console.log(userId);

    const randomPass = "1234567890asdfghjklpoiuytrewqzxcvbnm>!@#$%^&*";
    const len = randomPass.length;
    let pass = " ";
    for (let index = 0; index < 6; index++) {
        pass += randomPass[Math.floor(Math.random() * len)]

    }

    try {
        const updatedUser = await user.findByIdAndUpdate(userId, { password: pass });

        if (!updatedUser) {
            return resp.status(404).json({ message: 'User not found' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'ravikaransingh124@gmail.com', pass: 'chht proa fxce uzcu' },
        });

        await transporter.sendMail({
            from: 'ravikaransingh124@gmail.com',
            to: updatedUser.email,
            subject: 'Your New Password',
            html: `
                <p>Hello ${updatedUser.fullname || ''},</p>
                <p>Your password has been reset successfully. Here is your new password:</p>
                <h2>${pass}</h2>
                <p>Please log in and change it immediately to keep your account secure.</p>
                <br/>
                <p>Thank you,<br/>YourApp Team</p>
            `
        });

        return resp.status(200)
            .json({
                success: true,
                message: 'New password has been sent to your email'
            });

    } catch (error) {
        console.log('Forgot password error: ', error);
        return resp.status(500).json('Could not reset password');
    }
};

export const login = async (req, resp) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return resp.status(400).json('All fields are required');
    }

    try {

        const loginUser = await user.findOne({ username, password });
        if (!loginUser) {
            return resp.status(400).json('username and password is wrong !');
        }

        const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const token_admin = jwt.sign({ admin: loginUser }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return resp.status(200)
            .cookie("userToken", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .cookie("adminToken", token_admin, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .json({
                success: true,
                loginUser,
                auth_token: token,
                admin_token: token_admin
            });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json('User could not be login');
    }
};

export const isEmailVerification = async (req, resp) => {
    const { email, emailOtp } = req.body;
    try {
        const foundUser = await user.findOne({ email }); 
        if (!foundUser) return resp.status(400).json({ message: 'User not found' });

        if (foundUser.emailOtp !== emailOtp) return resp.status(400).json({ message: 'Invalid email OTP' });

        foundUser.isEmailVerified = true;
        foundUser.emailOtp = null;

        await foundUser.save();

        resp.json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Server error' });
    }
}

export const logout = async (req, resp) => {
    try {
        const userId = req.user?.id?._id;
        console.log(userId);

        if (userId) {
            await user.findByIdAndUpdate(userId, { isEmailVerified: false });
            console.log(`User ${userId} isEmailVerified set to false`);
        }
        resp.status(200)
            .clearCookie("userToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .clearCookie("adminToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .json({ message: "Logged out successfully." });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json('User could not be login');
    }
};

export const users = async (req, resp) => {
    try {

        const users = await user.find({},{fullname:1,password:1,_id:0});
        if (!users) {
            return resp.status(400).json('username and password is wrong !');
        }

        return resp.status(200)
            .json({
                success: true,
                users
            });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json('User could not be login');
    }
};