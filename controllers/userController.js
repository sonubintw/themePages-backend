
const User = require("../models/User")
const Theme = require("../models/theme")
const io = require("../server")


let idFromRegister = null;
const registerUser = async (req, res, next) => {
    const { user_name, password } = req.body

    if (!user_name || !password) {
        let err = new Error("Please fill all the required input fields")
        res.status(400)
        return next(err)
    }
    if (password.length < 6) {
        let err = new Error("pass length must be more than 6")
        res.status(400)
        return next(err)

    }

    const userExists = await User.findOne({ user_name })
    if (userExists) {
        let err = new Error("username already exists please enter try another one")
        res.status(400)
        return next(err)
    }

    const newuser = await new User({
        user_name,
        password
    }).save()

    if (newuser) {
        const { _id, user_name, password } = newuser;
        idFromRegister = _id


        const newtheme = await new Theme({
            user_id: _id
        }).save()

        // console.log(newtheme)

        res.status(200).json({
            _id,
            user_name,
            password
        })
    }


}



const getUserDetails = async (req, res, next) => {
    try {
        const userTheme = await Theme.findOne({ user_id: idFromRegister });

        if (userTheme) {

            req.io.emit("message", userTheme)
            res.status(200).send(userTheme)
        } else {
            const error = new Error("User not found");
            res.status(404);
            return next(error);
        }
    } catch (err) {
        console.error("Error fetching user theme:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {
    registerUser,
    getUserDetails
}
