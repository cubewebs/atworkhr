import {Schema, model, ObjectId, version} from 'mongoose';

const EmployeeSchema = new Schema({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
        required: true
    }
}, { collection: 'employees' });

EmployeeSchema.method('toJSON', function() {
    const {name, email, password, role, google, _id,  ...rest} = this.toObject();
    return {name, email, role, google, uid: _id};
})

export const Employee = model('Employee', EmployeeSchema);