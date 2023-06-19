const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const bcrypt = require('bcrypt')
const tokenGenerator = require("../../utils/tokenGenerator");
const { comparePassword, generateToken } = require('../../middlewares/auth');
const ErrorHandler = require("../../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const formidable = require("formidable")
const { user } = require("../../../models")


const userSignup = catchAsyncErrors(async (req, res, next) => {

    try {
        const password = "1234"
        // checking mobile number already exist
        const result = await user.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (result) {
            return res.status(400).json({ success: false, message: "User Exist Already" });
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 10)
        const token = tokenGenerator(32);

        const user_details = await user.create({
            username: req.body.username,
            password: hashedPassword,
            is_admin: "0",
        })

        res.status(201).json({
            success: true,
            user_details : user_details ,
            message: 'Signup successfully'
        })
    } catch (error) {
        next(error)
    }
})


module.exports = {
    userSignup
}