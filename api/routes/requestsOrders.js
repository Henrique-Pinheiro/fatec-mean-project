module.exports = app => {
    const controller = app.controllers.requestsOrders;

    app.route('/api/v1/requests/:requestId/orders')
        .get(controller.listRequestsOrders)
        .post(controller.saveRequestOrder);

    app.route('/api/v1/requests/:requestId/orders/:orderId')
        .delete(controller.removeRequestOrder)
        .put(controller.updateRequestOrder)
        .get(controller.getRequestOrderById);
}