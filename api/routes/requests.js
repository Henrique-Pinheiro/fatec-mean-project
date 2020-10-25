module.exports = app => {
    const controller = app.controllers.requests;

    app.route('/api/v1/requests')
        .get(controller.listRequests)
        .post(controller.saveRequest);

    app.route('/api/v1/requests/:requestId')
        .delete(controller.removeRequest)
        .put(controller.updateRequest)
        .get(controller.getRequestById);
}