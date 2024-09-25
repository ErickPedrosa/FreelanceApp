const Device = require('../models/device');
const logger = require('../config/logger');


async function registerOrUpdateDevice(deviceId, platform, pushToken) {
  try {
    let device = await Device.findOne({ deviceId });


    if (device) {
      device.platform = platform;
      device.pushToken = pushToken;
      await device.save();
      logger.info(`Device ${deviceId} updated successfully`);
    } else {
      device = new Device({ deviceId, platform, pushToken });
      await device.save();
      logger.info(`Device ${deviceId} registered successfully`);
    }
    return { message: 'Success', device };
  } catch (error) {
    logger.error('Error registering device:', error.message);
    throw new Error('Failed to register device');
  }
}


module.exports = { registerOrUpdateDevice };
