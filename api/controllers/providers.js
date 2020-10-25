const uuidv4 = require('uuid/v4');

module.exports = app => {
    const providersDB = app.data.providers;
    const controller = {};

    const {
        providers: providersMock,
    } = providersDB;

    controller.listProviders = (req, res) => res.status(200).json(providersDB);

    controller.saveProvider = (req, res) => {

        console.log(req.body);

        providersMock.data.push({
            id: uuidv4(),
            cnpj: req.body.cnpj,
            companyName: req.body.companyName,
            fancyName: req.body.fancyName,
            address: req.body.address,
            cep: req.body.cep,
            phone: req.body.phone,
            salesman: req.body.salesman,
            ranking: req.body.ranking,
            active: true,
        });

        res.status(201).json(providersMock);
    }

    controller.removeProvider = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: providersMock,
            });
        } else {
            providersMock.data.splice(findIndexById(providerId), 1);
            res.status(200).json({
                message: 'Fornecedor econtrado e deletado com sucesso!',
                success: true,
                providers: providersMock
            });
        }
    };

    controller.updateProvider = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: providersMock,
            });
        } else {
            const updatedCostumer = {
                id: providerId,
                cnpj: req.body.cnpj,
                companyName: req.body.companyName,
                fancyName: req.body.fancyName,
                address: req.body.address,
                cep: req.body.cep,
                phone: req.body.phone,
                salesman: req.body.salesman,
                ranking: req.body.ranking,
                active: req.body.active,
            };

            providersMock.data.splice(findIndexById(providerId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Fornecedor econtrado e alterado com sucesso!',
                success: true,
                providers: providersMock
            });
        }
    }

    controller.getProviderById = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: providersMock,
            });
        } else {
            res.status(200).json({
                message: 'Fornecedor econtrado com sucesso!',
                success: true,
                providers: providersMock.data[findIndexById(providerId)],
            });
        }
    }

    function findIndexById(id) {
        return providersMock.data.findIndex(json => json.id == id);
    }

    return controller;
}