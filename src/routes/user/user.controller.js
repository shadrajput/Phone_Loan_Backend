const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const bcrypt = require('bcrypt')
const tokenGenerator = require("../../utils/tokenGenerator");
const { comparePassword, generateToken } = require('../../middlewares/auth');
const ErrorHandler = require("../../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const db = require('../../../models')
const { user, admin } = require("../../../models")


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
            is_admin: false,
        })

        res.status(201).json({
            success: true,
            user_details: user_details,
            message: 'Signup successfully'
        })
    } catch (error) {
        next(error)
    }
})

const userLogin = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body

    const User = await user.findOne({
        where: db.sequelize.literal(`BINARY username = '${username}'`),
    });

    if (!User || !await comparePassword(password, User.password)) {
        return next(new ErrorHandler('Invalid username or password', 400));
    }

    delete User.password
    const token = generateToken(User.id);

    res.status(200).json({ success: true, message: 'Login successful', token, User })

})

const userDetail = catchAsyncErrors(async (req, res, next) => {

    const token = req.headers.authorization;

    console.log(req.headers)

    const JWTSign = process.env.JWT_SIGN;

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const user_id = jwt.verify(token, JWTSign);

    const userDetails = await user.findOne({
        where: { id: Number(user_id) },
    });

    let User = userDetails;
    if (userDetails.is_admin) {
        const adminDetails = await admin.findOne({
            where: {
                user_id: userDetails.id
            },
            attributes: ['id', 'first_name', 'last_name', 'pin']
        })

        User = {
            id: userDetails.id,
            username: userDetails.username,
            password: userDetails.password,
            is_admin: userDetails.is_admin,
            pin: adminDetails.pin,
            admin_id: adminDetails.id
        }
    }

    res.status(200).json({ success: true, User })
})


module.exports = {
    userSignup,
    userLogin,
    userDetail
}