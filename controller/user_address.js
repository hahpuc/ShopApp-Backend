const StatusCode = require('../common/StatusCode.js');
const User = require('../models/user.js');


const createShippingAddress = async (req, res) => {
    const { name, address, phoneNumber } = req.body;

    try {
        var currentUser = await User.findById({ _id: req.userId })
        var total_address = currentUser.total_address;

        total_address += 1;

        currentUser.shipping_address.push({
            name, address, phoneNumber
        });

        currentUser.total_address = total_address;

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

const updateShippingAdress = async (req, res) => {
    const { name, address, phoneNumber } = req.body;
    const { id } = req.params

    try {
        var currentUser = await User.findById({ _id: req.userId })

        const findAddressIndex = currentUser.shipping_address.findIndex(element => element._id == id)

        if (findAddressIndex < 0) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                error: 'Do not have this address'
            });
        }

        currentUser.shipping_address[findAddressIndex] = {
            _id: currentUser.shipping_address[findAddressIndex], // If don't set that, the address ID will change after run update function
            name, address, phoneNumber
        }

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

const deleteShippingAddress = async (req, res) => {
    const { id } = req.params

    try {
        var currentUser = await User.findById({ _id: req.userId })

        const findAddressIndex = currentUser.shipping_address.findIndex(element => element._id == id)

        if (findAddressIndex < 0) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                error: 'Do not have this address'
            });
        }

        currentUser.shipping_address.splice(findAddressIndex, 1);
        currentUser.total_address -= 1;

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

const setDefaultAddress = async (req, res) => {
    const { id } = req.params

    try {
        var currentUser = await User.findById({ _id: req.userId })

        const findAddressIndex = currentUser.shipping_address.findIndex(element => element._id == id)
        const currentDefaultAddressIndex = currentUser.shipping_address.findIndex(element => element.isDefault == true)

        if (currentDefaultAddressIndex >= 0)
            currentUser.shipping_address[currentDefaultAddressIndex].isDefault = false;
        currentUser.shipping_address[findAddressIndex].isDefault = true;

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
    createShippingAddress,
    updateShippingAdress,
    deleteShippingAddress,
    setDefaultAddress,
}