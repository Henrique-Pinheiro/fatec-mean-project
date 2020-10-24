module.exports = app => {
    const controller = app.controllers.providers;

    app.route('/api/v1/providers')
        .get(controller.listProviders)
        .post(controller.saveProvider);

    app.route('/api/v1/providers/:providerId')
        .delete(controller.removeProvider)
        .put(controller.updateProvider)
        .get(controller.getProviderById);
}