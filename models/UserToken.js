import mongoose from 'mongoose';

const UserTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' 
    }
});

const UserToken = mongoose.model('UserToken', UserTokenSchema);

export default UserToken;
