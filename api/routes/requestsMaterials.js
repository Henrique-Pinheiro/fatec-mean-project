module.exports = app => {
    const controller = app.controllers.requestsMaterials;

    app.route('/api/v1/requests/:requestId/materials')
        .get(controller.listRequestsMaterials)
        .post(controller.saveRequestMaterial);

    app.route('/api/v1/requests/:requestId/materials/:materialId')
        .delete(controller.removeRequestMaterial)
        .put(controller.updateRequestMaterial)
        .get(controller.getRequestMaterialById);
}