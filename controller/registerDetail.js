import jwt from 'jsonwebtoken';
import user from '../Scheema/register.js';

export const register = async (req, resp) => {
    const { fullname, username, gender, password } = req.body;

    if (!fullname || !username || !gender || !password) {
        return resp.status(400).json('All fields are required');
    }

    const userExist = await user.findOne({ username });
    if (userExist) {
        return resp.status(400).json('Username already exists');
    }

    try {
        const newUser = await user.create({ fullname, username, gender, password });

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


export const login = async (req, resp) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return resp.status(400).json('All fields are required');
    }

    try {

        const loginUser = await user.findOne({ username, password });
        if (!loginUser) {
            return resp.status(400).json('please first you do register on this side');
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

export const logout = async (req, resp) => {
    try {
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