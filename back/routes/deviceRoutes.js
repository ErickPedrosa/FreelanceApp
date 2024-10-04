const express = require('express');
const { registerOrUpdateDevice } = require('../controllers/deviceController');


const router = express.Router();
router.post('/device', async (req, res, next) => {
    const { deviceId, platform, pushToken } = req.body;
    try {
        const result = await registerOrUpdateDevice(deviceId, platform, pushToken);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
  
  
module.exports = router;
  