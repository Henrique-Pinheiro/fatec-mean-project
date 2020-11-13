const uuidv4 = require('uuid/v4');

module.exports = app => {
    const RequestsMaterialProviderDB = app.data.requestsMaterialsProviders;
    const controller = {};

    const {
        requestsMaterialsProviders: RequestMaterialProviderMock,
    } = RequestsMaterialProviderDB;

    controller.listRequestsMaterialsProviders = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        const matchedIdsJson = [];

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProviderMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialProviderMock, requestId),
                });
            } else {
                res.status(200).json(filterByRequestId(RequestMaterialProviderMock.data, requestId));
            }
        }
    };

    controller.saveRequestMaterialProvider = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProviderMock,
            });
        } else {
            RequestMaterialProviderMock.data.push({
                requestId: parseInt(requestId),
                //TODO: Verificar se existe na base de dados antes
                materialId: parseInt(req.body.materialId),
                amount: parseInt(req.body.amount),
            });
            res.status(201).json(filterByRequestId(RequestMaterialProviderMock.data, requestId));
        }
    }

    controller.removeRequestMaterialProvider = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProviderMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialProviderMock, requestId),
                });
            } else {
                RequestMaterialProviderMock.data.splice(findMaterialIndexById(materialId), 1);
                res.status(200).json({
                    message: 'Solicitacao e seu material econtrados e deletados com sucesso!',
                    success: true,
                    requests: listMaterialsByProvidedId(RequestMaterialProviderMock, requestId),
                });
            }
        }
    };

    controller.updateRequestMaterialProvider = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProviderMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialProviderMock, requestId),
                });
            } else {
                const updatedJson = {
                    requestId: parseInt(requestId),
                    //TODO: Verificar se existe na base de dados antes
                    materialId: parseInt(req.body.materialId),
                    amount: parseInt(req.body.amount),
                };

                RequestMaterialProviderMock.data.splice(findMaterialIndexById(materialId), 1, updatedJson);

                res.status(200).json({
                    message: 'Solicitacao e material econtrados e alterados com sucesso!',
                    success: true,
                    requests: listMaterialsByProvidedId(RequestMaterialProviderMock, requestId),
                });
            }
        }
    }

    controller.getRequestMaterialProviderById = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;
        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProviderMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialProviderMock, requestId),
                });
            } else {
                res.status(200).json({
                    message: 'Solicitacao e material econtrados com sucesso!',
                    success: true,
                    requests: RequestMaterialProviderMock.data[findMaterialIndexById(materialId)],
                });
            }
        }
    }

    function findRequestIndexById(id) {
        return RequestMaterialProviderMock.data.findIndex(json => json.requestId == id);
    }

    function findMaterialIndexById(id) {
        return RequestMaterialProviderMock.data.findIndex(json => json.materialId == id);
    }

    function filterByRequestId(jsonArray, requestId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.requestId == requestId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function filterByMaterialId(jsonArray, materialId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.materialId == materialId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function listMaterialsByProvidedId(jsonObject, requestId) {
        const matchedIdsJson = [];

        jsonObject.data.forEach(element => {
            if (element.requestId == requestId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    return controller;
}