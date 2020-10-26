const uuidv4 = require('uuid/v4');

module.exports = app => {
    const ProviderMaterialDB = app.data.providersMaterials;
    const controller = {};

    const {
        providersMaterials: ProviderMaterialMock,
    } = ProviderMaterialDB;

    controller.listProvidersMaterials = (req, res) => {
        const {
            providerId,
        } = req.params;

        const matchedIdsJson = [];

        ProviderMaterialMock.data.forEach(element => {
            if (element.providerId == providerId) {
                matchedIdsJson.push(element);
            }
        });

        // console.log(findMatchingIds(ProviderMaterialMock.data));

        res.status(200).json(filterByProviderId(ProviderMaterialMock.data, providerId));
    };

    controller.saveProviderMaterial = (req, res) => {
        const {
            providerId,
        } = req.params;

        ProviderMaterialMock.data.push({
            providerId: parseInt(providerId),
            materialId: req.body.materialId,
        });

        res.status(201).json(filterByProviderId(ProviderMaterialMock.data, providerId));
    }

    controller.removeProviderMaterial = (req, res) => {
        const {
            providerId,
            materialId,
        } = req.params;

        if (findIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderMaterialMock,
            });
        } else {
            ProviderMaterialMock.data.splice(findIndexById(providerId), 1);
            res.status(200).json({
                message: 'Fornecedor econtrado e deletado com sucesso!',
                success: true,
                providers: ProviderMaterialMock
            });
        }
    };

    controller.updateProviderMaterial = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderMaterialMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(providerId),
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

            ProviderMaterialMock.data.splice(findIndexById(providerId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Fornecedor econtrado e alterado com sucesso!',
                success: true,
                providers: ProviderMaterialMock
            });
        }
    }

    controller.getProviderMaterialById = (req, res) => {
        const {
            providerId,
        } = req.params;

        if (findIndexById(providerId) == -1) {
            res.status(404).json({
                message: 'Fornecedor não encontrado na base.',
                success: false,
                providers: ProviderMaterialMock,
            });
        } else {
            res.status(200).json({
                message: 'Fornecedor econtrado com sucesso!',
                success: true,
                providers: ProviderMaterialMock.data[findIndexById(providerId)],
            });
        }
    }

    function findIndexById(id) {
        return ProviderMaterialMock.data.findIndex(json => json.id == id);
    }

    function filterByProviderId(jsonArray, providerId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.providerId == providerId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    return controller;
}