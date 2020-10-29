const uuidv4 = require('uuid/v4');

module.exports = app => {
    const ordersDB = app.data.orders;
    const controller = {};

    const {
        orders: ordersMock,
    } = ordersDB;

    controller.listOrders = (req, res) => res.status(200).json(ordersDB);

    controller.saveOrder = (req, res) => {

        ordersMock.data.push({
            id: 4,
            status: partseInt(req.body.status),
            createdAt: req.body.createdAt,
        });

        res.status(201).json(ordersMock);
    }

    controller.removeOrder = (req, res) => {
        const {
            orderId,
        } = req.params;

        if (findIndexById(orderId) == -1) {
            res.status(404).json({
                message: 'Pedido não encontrado na base.',
                success: false,
                orders: ordersMock,
            });
        } else {
            ordersMock.data.splice(findIndexById(orderId), 1);
            res.status(200).json({
                message: 'Pedido encontrado e deletado com sucesso!',
                success: true,
                orders: ordersMock
            });
        }
    };

    controller.updateOrder = (req, res) => {
        const {
            orderId,
        } = req.params;

        if (findIndexById(orderId) == -1) {
            res.status(404).json({
                message: 'Pedido não encontrado na base.',
                success: false,
                orders: ordersMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(orderId),
                status: partseInt(req.body.status),
                createdAt: req.body.createdAt,
            };

            ordersMock.data.splice(findIndexById(orderId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Pedido econtrada e alterada com sucesso!',
                success: true,
                orders: ordersMock
            });
        }
    }

    controller.getOrderById = (req, res) => {
        const {
            orderId,
        } = req.params;

        if (findIndexById(orderId) == -1) {
            res.status(404).json({
                message: 'Pedido não encontrado na base.',
                success: false,
                orders: ordersMock,
            });
        } else {
            res.status(200).json({
                message: 'Pedido encontrado com sucesso!',
                success: true,
                orders: ordersMock.data[findIndexById(orderId)],
            });
        }
    }

    function findIndexById(id) {
        return ordersMock.data.findIndex(json => json.id == id);
    }

    return controller;
}