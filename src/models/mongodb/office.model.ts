import {Schema, model, ObjectId, version} from 'mongoose';

const OfficeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { collection: 'offices' });

OfficeSchema.method('toJSON', function() {
    const {name, code, user, img, _id,  ...rest} = this.toObject();
    return {name, code, user, img,  uid: _id};
})

export const Office = model('Office', OfficeSchema);