
const mongoose = require("mongoose")

const themeSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "USER"
    },
    primary_color: {
        type: String,
        default: "red"
    },
    secondary_color: {
        type: String,
        default: "black"
    },
    text_color: {
        type: String,
        default: "white"
    },
    font_size: {
        type: String,
        default: "16px"
    },
    font: {
        type: String,
        default: "sans-serif"
    }
},
)


const Theme = mongoose.model("THEME_PREFERENCE", themeSchema)
module.exports = Theme