const uuidv4 = require('uuid/v4');

module.exports = app => {
    const ProvidersPriceDB = app.data.providersPrices;
    const controller = {};

    const {
        providersPrices: ProviderPriceMock,
    } = ProvidersPriceDB;

    controller.listProvidersPrices = (req, res) => {
        const {
            providerId,
        } = req.params;

        const matchedIdsJson = [];

        if (findProviderPricesByIdProvicerId(providerId).length == 0) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            res.status(200).json(filterByProviderId(findProviders(ProviderPriceMock.data), providerId));
        }
    };

    controller.saveProviderPrice = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findProviderIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            ProviderPriceMock.data.push({
                provider: parseInt(providerId),
                //TODO: Verificar se existe na base de dados antes
                price: parseInt(req.body.price),
            });
            res.status(201).json(filterByProviderId(ProviderPriceMock.data, providerId));
        }
    }

    controller.removeProviderPrice = (req, res) => {
        const {
            providerId,
            priceId,
        } = req.params;

        if (findProviderIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            if (findPriceIndexById(priceId) == -1) {
                res.status(404).json({
                    message: 'Cotacao não encontrada na base.',
                    success: false,
                    providersPrices: listPricesByProvidedId(ProviderPriceMock, providerId),
                });
            } else {
                ProviderPriceMock.data.splice(findPriceIndexById(priceId), 1);
                res.status(200).json({
                    message: 'Fornecedor e seu cotacao econtrados e deletados com sucesso!',
                    success: true,
                    providers: listPricesByProvidedId(ProviderPriceMock, providerId),
                });
            }
        }
    };

    controller.updateProviderPrice = (req, res) => {
        const {
            providerId,
            priceId,
        } = req.params;

        if (findProviderIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            if (findPriceIndexById(priceId) == -1) {
                res.status(404).json({
                    message: 'Cotacao não encontrada na base.',
                    success: false,
                    providersPrices: listPricesByProvidedId(ProviderPriceMock, providerId),
                });
            } else {
                const updatedJson = {
                    providerId: parseInt(providerId),
                    //TODO: Verificar se existe na base de dados antes
                    price: parseInt(req.body.price),
                };

                ProviderPriceMock.data.splice(findPriceIndexById(priceId), 1, updatedJson);

                res.status(200).json({
                    message: 'Fornecedor e cotacao econtrados e alterados com sucesso!',
                    success: true,
                    providers: listPricesByProvidedId(ProviderPriceMock, providerId),
                });
            }
        }
    }

    controller.getProviderPriceById = (req, res) => {
        const {
            providerId,
            priceId,
        } = req.params;

        if (findProviderIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderPriceMock,
            });
        } else {
            if (findPriceIndexById(priceId) == -1) {
                res.status(404).json({
                    message: 'Cotacao não encontrada na base.',
                    success: false,
                    providersPrices: listPricesByProvidedId(ProviderPriceMock, providerId),
                });
            } else {
                res.status(200).json({
                    message: 'Fornecedor e cotacao econtrados com sucesso!',
                    success: true,
                    providers: ProviderPriceMock.data[findPriceIndexById(priceId)],
                });
            }
        }
    }

    function findProviderPricesByIdProvicerId(id) {
        const matchedIdsJson = [];

        ProviderPriceMock.data.forEach(element => {
            if (element.provider.id == id) {
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

    function findPriceIndexById(id) {
        return ProviderPriceMock.data.findIndex(json => json.price == id);
    }

    function filterByProviderId(jsonArray, providerId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.id == providerId) {
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

    return controller;
}