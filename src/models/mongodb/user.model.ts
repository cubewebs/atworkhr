import {Schema, model, ObjectId, version} from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
}, { collection: 'users' });

UserSchema.method('toJSON', function() {
    const {name, email, password, role, google, _id,  ...rest} = this.toObject();
    return {name, email, role, google, uid: _id};
})

export const User = model('User', UserSchema);