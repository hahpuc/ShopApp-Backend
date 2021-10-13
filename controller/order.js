const StatusCode = require('../common/StatusCode.js');


const createOrder = async (req, res) => {
    console.log(req.body);



    res.json({
        code: 200
    })
}

module.exports = {
    createOrder,
}