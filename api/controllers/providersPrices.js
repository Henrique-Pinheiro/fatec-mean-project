const uuidv4 = require('uuid/v4');

module.exports = app => {
    const ProvidersPriceDB = app.data.providersPrices;
    const providersDB = app.data.providers;
    const controller = {};

    const {
        providers: providersMock,
    } = providersDB

    const {
        providersPrices: ProviderPriceMock,
    } = ProvidersPriceDB;

    controller.listProvidersPrices = (req, res) => {
        const {
            providerId,
        } = req.params;

        const matchedIdsJson = [];

        if (findProviderPricesByProviderId(providerId).length == 0) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            res.status(200).json(filterByProviderId(ProviderPriceMock.data, providerId));
        }
    };

    controller.saveProviderPrice = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findIndexById(providerId).length == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            ProviderPriceMock.data.push({
                provider: findProviderById(providerId),
                //TODO: Verificar se existe na base de dados antes
                price: req.body.price,
            });
            res.status(200).json(filterByProviderId(ProviderPriceMock.data, providerId));
        }
    }

    controller.removeProviderPrice = (req, res) => {
        const {
            providerId,
            priceId,
        } = req.params;

        if (findIndexById(providerId).length == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            if (findProviderPricesByPricesId(priceId).length == 0) {
                res.status(404).json({
                    message: 'Cotacao não encontrada na base.',
                    success: false,
                    providersPrices: filterByProviderId(ProviderPriceMock.data, providerId),
                });
            } else {
                if (findIndexByIds(providerId, priceId) == null) {
                    res.status(404).json({
                        message: 'Cotacao não encontrada na base.',
                        success: false,
                        providersPrices: filterByProviderId(ProviderPriceMock.data, providerId),
                    });
                } else {
                    ProviderPriceMock.data.splice(findIndexByIds(providerId, priceId), 1);
                    res.status(200).json({
                        message: 'Fornecedor e sua cotacao econtrados e deletados com sucesso!',
                        success: true,
                        providers: filterByProviderId(ProviderPriceMock.data, providerId)
                    });
                }
            }
        }
    };

    controller.updateProviderPrice = (req, res) => {
        const {
            providerId,
            priceId,
        } = req.params;

        if (findIndexById(providerId).length == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            if (findProviderPricesByPricesId(priceId).length == 0) {
                res.status(404).json({
                    message: 'Cotacao não encontrada na base.',
                    success: false,
                    providersPrices: filterByProviderId(ProviderPriceMock.data, providerId),
                });
            } else {
                if (findIndexByIds(providerId, priceId) == null) {
                    res.status(404).json({
                        message: 'Cotacao não encontrada na base.',
                        success: false,
                        providersPrices: filterByProviderId(ProviderPriceMock.data, providerId),
                    });
                } else {
                    const updatedJson = {
                        provider: findProviderById(providerId),
                        //TODO: Verificar se existe na base de dados antes
                        price: req.body.price,
                    };

                    ProviderPriceMock.data.splice(findIndexByPriceId(priceId), 1, updatedJson);

                    res.status(200).json({
                        message: 'Fornecedor e cotacao econtrados e alterados com sucesso!',
                        success: true,
                        providers: filterByProviderId(ProviderPriceMock.data, providerId),
                    });
                }
            }
        }
    }

    controller.getProviderPriceById = (req, res) => {
        const {
            providerId,
            priceId,
        } = req.params;

        if (findIndexById(providerId).length == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            if (findProviderPricesByPricesId(priceId).length == 0) {
                res.status(404).json({
                    message: 'Cotacao não encontrada na base.',
                    success: false,
                    providersPrices: filterByProviderId(ProviderPriceMock.data, providerId),
                });
            } else {
                if (findIndexByIds(providerId, priceId) == null) {
                    res.status(404).json({
                        message: 'Cotacao não encontrada na base.',
                        success: false,
                        providersPrices: filterByProviderId(ProviderPriceMock.data, providerId),
                    });
                } else {
                    res.status(200).json({
                        message: 'Fornecedor e cotacao econtrados com sucesso!',
                        success: true,
                        providers: ProviderPriceMock.data[findIndexByIds(priceId, providerId)],
                    });
                }
            }
        }
    }

    function findProviderPricesByProviderId(id) {
        const matchedIdsJson = [];

        ProviderPriceMock.data.forEach(element => {
            if (element.provider.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findProviderPricesByPricesId(id) {
        const matchedIdsJson = [];

        ProviderPriceMock.data.forEach(element => {
            if (element.price.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findProviders() {
        const matchedJsons = [];

        ProviderPriceMock.data.forEach(element => {
            matchedJsons.push(element.provider);
        });

        return matchedJsons;
    }

    function findIndexByPriceId(id) {
        for (var i = 0; i < ProviderPriceMock.data.length; i++) {
            if (ProviderPriceMock.data[i].price.id == id) {
                return i;
            }
        }
        return null;
    }

    function findIndexByIds(providerId, priceId) {
        for (var i = 0; i < ProviderPriceMock.data.length; i++) {
            if (ProviderPriceMock.data[i].provider.id == providerId && ProviderPriceMock.data[i].price.id == priceId) {
                return i;
            }
        }
        return null;
    }

    function filterByProviderId(jsonArray, providerId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.provider.id == providerId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function listPricesByProvidedId(jsonObject, providerId) {
        const matchedIdsJson = [];

        jsonObject.data.forEach(element => {
            if (element.provider == providerId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findProviderById(providerId) {

        if (findIndexById(providerId) == -1) {
            return null;
        } else {
            return providersMock.data[findIndexById(providerId)]
        }
    }

    function findIndexById(id) {
        return providersMock.data.findIndex(json => json.id == id);
    }

    return controller;
}