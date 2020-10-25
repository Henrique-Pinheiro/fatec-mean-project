module.exports = app => {
    const controller = app.controllers.orders;

    app.route('/api/v1/orders')
        .get(controller.listOrders)
        .post(controller.saveOrder);

    app.route('/api/v1/orders/:orderId')
        .delete(controller.removeOrder)
        .put(controller.updateOrder)
        .get(controller.getOrderById);
}