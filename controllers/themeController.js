const Theme = require("../models/theme")

const changeTheme = async (req, res, next) => {
    const { primary_color, _id } = req.body
    if (!primary_color) {
        let err = new Error("No color error")
        res.status(400)
        return next(err)
    }

    const userTheme = await Theme.findOne({ user_id: _id })

    if (primary_color && _id) {
        userTheme.primary_color = primary_color;
        await userTheme.save()
        res.status(200).send(`Theme changed to ${primary_color}`)
    }


}

module.exports = changeTheme