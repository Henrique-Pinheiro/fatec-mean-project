const uuidv4 = require('uuid/v4');

module.exports = app => {
    const RequestsMaterialDB = app.data.requestsMaterials;
    const controller = {};

    const {
        requestsMaterials: RequestMaterialMock,
    } = RequestsMaterialDB;

    controller.listRequestsMaterials = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            res.status(200).json(filterByRequestId(RequestMaterialMock.data, requestId));
        }
    };

    controller.saveRequestMaterial = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            RequestMaterialMock.data.push({
                requestId: parseInt(requestId),
                //TODO: Verificar se existe na base de dados antes
                materialId: parseInt(req.body.materialId),
                amount: parseInt(req.body.amount),
            });
            res.status(201).json(filterByRequestId(RequestMaterialMock.data, requestId));
        }
    }

    controller.removeRequestMaterial = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialMock, requestId),
                });
            } else {
                RequestMaterialMock.data.splice(findMaterialIndexById(materialId), 1);
                res.status(200).json({
                    message: 'Solicitacao e seu material econtrados e deletados com sucesso!',
                    success: true,
                    requests: listMaterialsByProvidedId(RequestMaterialMock, requestId),
                });
            }
        }
    };

    controller.updateRequestMaterial = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialMock, requestId),
                });
            } else {
                const updatedJson = {
                    requestId: parseInt(requestId),
                    //TODO: Verificar se existe na base de dados antes
                    materialId: parseInt(req.body.materialId),
                    amount: parseInt(req.body.amount),
                };

                RequestMaterialMock.data.splice(findMaterialIndexById(materialId), 1, updatedJson);

                res.status(200).json({
                    message: 'Solicitacao e material econtrados e alterados com sucesso!',
                    success: true,
                    requests: listMaterialsByProvidedId(RequestMaterialMock, requestId),
                });
            }
        }
    }

    controller.getRequestMaterialById = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;
        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            if (findMaterialIndexById(materialId) == -1) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requestsMaterials: listMaterialsByProvidedId(RequestMaterialMock, requestId),
                });
            } else {
                res.status(200).json({
                    message: 'Solicitacao e material econtrados com sucesso!',
                    success: true,
                    requests: RequestMaterialMock.data[findMaterialIndexById(materialId)],
                });
            }
        }
    }

    function findRequestIndexById(id) {
        return RequestMaterialMock.data.findIndex(json => json.requestId == id);
    }

    function findMaterialIndexById(id) {
        return RequestMaterialMock.data.findIndex(json => json.materialId == id);
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