
const FcmToken = require('../models/fcmToken.js');
const StatusCode = require('../common/StatusCode.js');

const createDeviceFCM = async (req, res) => {
    const { fcm_token } = req.body;

    try {
        const findFcmTokenByUser = await FcmToken.findOne({ _id: req.userId });

        console.log(findFcmTokenByUser);

        // User haven't saved any FcmToken 
        if (findFcmTokenByUser == null) {
            var devices = [];

            devices.push({
                fcm_token: fcm_token
            })

            const newFcmTokens = FcmToken({
                _id: req.userId,
                devices
            })

            await newFcmTokens.save();

            return res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Create FCM Devices for userID: " + req.userId,
                data: newFcmTokens,
            })
        }

        // Users have this Token
        const isExistFcmToken = findFcmTokenByUser.devices.findIndex(element => element.fcm_token == fcm_token);
        if (isExistFcmToken >= 0) {
            return res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Already have FCM token"
            })
        }

        findFcmTokenByUser.devices.push({
            fcm_token
        });
        await findFcmTokenByUser.save();
        return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: findFcmTokenByUser,
        })

    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        });
    }

}

module.exports = {
    createDeviceFCM,
}


