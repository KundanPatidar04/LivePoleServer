import { userModel } from "../model/userModel.js";
import bcrypt from 'bcrypt';

export const userRegistrationControler = async (req, res) => {
    try {
        const { userName, userMail } = req.body;
        bcrypt.hash(req.body.userPswd, 10, async (error, hashcode) => {
            if (error) { console.log(error); }
            const user = userModel({ userName, userMail, userPswd: hashcode });

            let result = await user.save();
            if (result) {
                return res.status(200)
                    .json({ success: true, message: "user added " });
            }
        })

    }
    catch (error) {
        return res.status(401)
            .json({ success: false, message: "Please enter required field.." });    
    }
}

export const userLoginControler = async (req, res) => {
    try {
        const { userMail } = req.body;
        let user = await userModel.findOne({ userMail });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(req.body.userPswd, user.userPswd);
        if (!isMatch) {
            res.status(401)
                .json({
                    success: false,
                    message: "invalid password",
                })
        }

        res.status(200)
            .json({
                success: true,
                message: "login successful",
                user: {
                        id: user._id,
                        userName: user.userName,
                        role: user.role
                    }
            })

    } catch (error) {
        console.log(error);
    }
}


