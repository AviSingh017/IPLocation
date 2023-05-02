const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    searches: [{type:String, required:true}]
});

const info = mongoose.model('info',infoSchema);

module.exports={info};