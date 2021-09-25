
import fetch from 'node-fetch';

export const sendNotification = async (req, res) => {
    var notification = {
        'title': 'TLONG notification hello helo',
        'text': 'THIS IS MY NOTIFICAITION'
    }

    // HARD CODE: Get fcm token from device
    var fcm_token = ['ecSZY2qCZkZBuvx1jCAyQD:APA91bGmLRL4voS1G_rGaVzcCAVYsCuVEiEMpQKLsRCY0O_EgzomoOffqdOUsn-yEsWfvmSymNxVF3nNi25S1d6u3dD-dtP0_eJZnVCw6lmezhI5rOWGkdJc6FIVlWqW8XgkL2P41pTq'];

    var notification_body = {
        'notification': notification,
        'registration_ids': fcm_token,
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + process.env.SERVER_KEY_FCM,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(notification_body)
    }).then(() => {
        res.status(200).json({
            code: 200,
            message: 'Send notification successfully'
        })
    }).catch((error) => {
        res.status(400).json({
            code: 200,
            message: error
        })
    })
}