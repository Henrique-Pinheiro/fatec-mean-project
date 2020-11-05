module.exports = app => {
    const controller = app.controllers.providersPrices;

    app.route('/api/v1/providers/:providerId/prices')
        .get(controller.listProvidersPrices)
        .post(controller.saveProviderPrice);

    app.route('/api/v1/providers/:providerId/prices/:priceId')
        .delete(controller.removeProviderPrice)
        .put(controller.updateProviderPrice)
        .get(controller.getProviderPriceById);
}