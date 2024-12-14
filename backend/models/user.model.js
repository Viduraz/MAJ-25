import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true
    },
    profilePicture : {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffavpng.com%2Fpng_view%2Favatar-user-profile-avatar-png%2F1LbmB6ng&psig=AOvVaw1aaiFzeCozhmCsQdDbvBsg&ust=1733822271709000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDshLitmooDFQAAAAAdAAAAABAE",
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;