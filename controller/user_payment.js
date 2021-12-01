const StatusCode = require('../common/StatusCode.js');
const User = require('../models/user.js');

const setDefaultPaymentMethod = async (req, res) => {
    try {

        const { payment_method } = req.body

        var currentUser = await User.findById({ _id: req.userId })

        currentUser.payment_method = payment_method

        var result = await currentUser.save();
        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: result,
        });

    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            error: error.message,
        })
    }
}

module.exports = {
    setDefaultPaymentMethod,
}