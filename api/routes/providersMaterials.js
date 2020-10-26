module.exports = app => {
    const controller = app.controllers.providersMaterials;

    app.route('/api/v1/providers/:providerId/materials')
        .get(controller.listProvidersMaterials)
        .post(controller.saveProviderMaterial);

    app.route('/api/v1/providers/:providerId/materials/:materialsId')
        .delete(controller.removeProviderMaterial)
        .put(controller.updateProviderMaterial)
        .get(controller.getProviderMaterialById);
}