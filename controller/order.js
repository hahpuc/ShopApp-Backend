const StatusCode = require('../common/StatusCode.js');
const Order = require('../models/order.js');

const generateUid = require('../utils/generate_uid.js');

const createOrder = async (req, res) => {

    try {
        const orderInformation = req.body;
        const currentTime = new Date().toLocaleString();

        // Get only date now without time
        var timeTextOnlyDate = currentTime.slice(0, -13).replaceAll('/', '');
        var randomId = generateUid();

        var orderId = timeTextOnlyDate + randomId;

        const status_list = [
            {
                _id: 1,
                description: "To order",
                time: currentTime,
            }
        ];

        const order = Order({
            _id: orderId,
            status_code: 1,
            status_list,
            userId: req.userId,
            name: orderInformation.name,
            email: orderInformation.email,
            phone_number: orderInformation.phone_number,
            shipping_address: orderInformation.shipping_address,
            total_money: orderInformation.total_money,
            payment_method: orderInformation.payment_method,
            paid: orderInformation.paid,
            items: orderInformation.items,
            order_time: currentTime,
        })

        await order.save()

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "Create new order successfully",
            data: order
        })
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        });
    }
}

const setToShipOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById({ _id: orderId });

        if (order == null) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `No order with id ${orderId}`
            })
        }

        if (order.status_code >= 3) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `Order has been shipped`
            })
        }

        const currentTime = new Date().toLocaleString();
        order.status_code = 3;
        order.ship_time = currentTime;
        order.status_list.push({
            _id: 3,
            description: "To ship",
            time: currentTime,
        })

        const result = await order.save();

        return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: result
        })
    } catch (error) {
        return res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message,
        })
    }
}

const setCompleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById({ _id: orderId });

        if (order == null) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `No order with id ${orderId}`
            })
        }

        if (order.status_code < 3) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `Order has not been shipped`
            })
        }

        if (order.status_code >= 4) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `Order has been completed`
            })
        }

        const currentTime = new Date().toLocaleString();
        order.status_code = 4;
        order.completed_time = currentTime;
        order.status_list.push({
            _id: 4,
            description: "Completed",
            time: currentTime,
        })

        const result = await order.save();

        return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: result
        })
    } catch (error) {
        return res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message,
        })
    }
}


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('items.productId');

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: orders
        })
    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            message: error.message
        })
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById({ _id: id }).populate('userId').populate('items.productId');

        if (order == null) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `No order with id ${id}`
            })
        }

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: order
        })
    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            message: error.message
        })
    }
}

const getOrdersByStatusCode = async (req, res) => {
    try {
        const { code } = req.params;

        const orders = await Order.find({ status_code: code }).populate('userId').populate('items.productId');

        if (orders == null) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                message: `Don't have this order`
            })
        }

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: orders
        })
    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            message: error.message
        })
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    setToShipOrder,
    setCompleteOrder,
    getOrderById,
    getOrdersByStatusCode,
}