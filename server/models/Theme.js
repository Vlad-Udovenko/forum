const {Schema, model, Types} = require('mongoose');


const schema = new Schema({
   topic: {type: String, required: true},
   text: {type:String, required: true},
   comments:{type:Array, default:[] },
   data: {type: Date, default: Date.now},
   owner:{type: Types.ObjectId, ref: 'User'}
})

module.exports = model ('Theme', schema);