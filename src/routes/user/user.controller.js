const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const bcrypt = require('bcrypt')
const tokenGenerator = require("../../utils/tokenGenerator");
const { comparePassword, generateToken } = require('../../middlewares/auth');
const ErrorHandler = require("../../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const formidable = require("formidable")
const { user } = require("../../../models")


const userSignup = catchAsyncErrors(async (req, res, next) => {

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const UserInfo = (fields);
        console.log(UserInfo)
        const password = "1234"
        //checking mobile number already exist
        // let user = await user.findFirst({
        //     where: UserInfo.username
        // });

        // if (user) {
        //     return next(new ErrorHandler('User already exists with this mobile number', 400))
        // }

        const hashedPassword = await bcrypt.hash(password.trim(), 10)
        const token = tokenGenerator(32);

        const user_details = await user.create({
            username: UserInfo.username,
            password: hashedPassword,
            is_admin: "1",
        })

        res.status(201).json({ success: true, message: 'Signup successfully' })
    })

})


module.exports = {
    userSignup
}