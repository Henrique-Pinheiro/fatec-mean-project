module.exports = app => {
    const controller = app.controllers.prices;

    app.route('/api/v1/prices')
        .get(controller.listPrices)
        .post(controller.savePrice);

    app.route('/api/v1/prices/:priceId')
        .delete(controller.removePrice)
        .put(controller.updatePrice)
        .get(controller.getPriceById);
}