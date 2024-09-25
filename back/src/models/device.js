const mongoose = require('mongoose');


const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  platform: { type: String, required: true, enum: ['iOS', 'Android'] },
  pushToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Device', deviceSchema);
