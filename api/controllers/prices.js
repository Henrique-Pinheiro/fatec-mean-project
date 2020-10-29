const uuidv4 = require('uuid/v4');

module.exports = app => {
    const pricesDB = app.data.prices;
    const controller = {};

    const {
        prices: pricesMock,
    } = pricesDB;

    controller.listPrices = (req, res) => res.status(200).json(pricesDB);

    controller.savePrice = (req, res) => {

        pricesMock.data.push({
            id: 4,
            requestDate: req.body.requestDate,
            status: req.body.status,
            deadline: req.body.deadline,
            requester: req.body.requester,
            fare: parseFloat(req.body.fare),
        });

        res.status(201).json(pricesMock);
    }

    controller.removePrice = (req, res) => {
        const {
            priceId,
        } = req.params;

        if (findIndexById(priceId) == -1) {
            res.status(404).json({
                message: 'Cotacao não encontrado na base.',
                success: false,
                prices: pricesMock,
            });
        } else {
            pricesMock.data.splice(findIndexById(priceId), 1);
            res.status(200).json({
                message: 'Cotacao econtrado e deletado com sucesso!',
                success: true,
                prices: pricesMock
            });
        }
    };

    controller.updatePrice = (req, res) => {
        const {
            priceId,
        } = req.params;

        if (findIndexById(priceId) == -1) {
            res.status(404).json({
                message: 'Cotacao não encontrada na base.',
                success: false,
                prices: pricesMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(priceId),
                requestDate: req.body.requestDate,
                status: req.body.status,
                deadline: req.body.deadline,
                requester: req.body.requester,
                fare: parseFloat(req.body.fare),
            };

            pricesMock.data.splice(findIndexById(priceId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Cotacao encontrada e alterada com sucesso!',
                success: true,
                prices: pricesMock
            });
        }
    }

    controller.getPriceById = (req, res) => {
        const {
            priceId,
        } = req.params;

        if (findIndexById(priceId) == -1) {
            res.status(404).json({
                message: 'Cotacao não encontrada na base.',
                success: false,
                prices: pricesMock,
            });
        } else {
            res.status(200).json({
                message: 'Cotacao encontrada com sucesso!',
                success: true,
                prices: pricesMock.data[findIndexById(priceId)],
            });
        }
    }

    function findIndexById(id) {
        return pricesMock.data.findIndex(json => json.id == id);
    }

    return controller;
}