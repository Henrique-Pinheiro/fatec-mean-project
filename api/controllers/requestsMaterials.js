const uuidv4 = require('uuid/v4');

module.exports = app => {
    const RequestsMaterialDB = app.data.requestsMaterials;
    const requestsDB = app.data.requests;
    const controller = {};

    const {
        requests: requestsMock,
    } = requestsDB

    const {
        requestsMaterials: RequestMaterialMock,
    } = RequestsMaterialDB;

    controller.listRequestsMaterials = (req, res) => {
        const {
            requestId,
        } = req.params;

        const matchedIdsJson = [];

        if (findRequestMaterialsByRequestId(requestId).length == 0) {
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

        if (findRequestMaterialsByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            RequestMaterialMock.data.push({
                request: findRequestById(requestId),
                //TODO: Verificar se existe na base de dados antes
                material: req.body.material,
                amount: req.body.amount,
            });
            res.status(200).json(filterByRequestId(RequestMaterialMock.data, requestId));
        }
    }

    controller.removeRequestMaterial = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestMaterialsByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            if (findRequestMaterialsByMaterialsId(materialId).length == 0) {
                res.status(404).json({
                    message: 'Material não encontrada na base.',
                    success: false,
                    requestsMaterials: filterByRequestId(RequestMaterialMock.data, requestId),
                });
            } else {
                if (findIndexByIds(requestId, materialId) == null) {
                    res.status(404).json({
                        message: 'Material não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestId(RequestMaterialMock.data, requestId),
                    });
                } else {
                    RequestMaterialMock.data.splice(findIndexByIds(requestId, materialId), 1);
                    res.status(200).json({
                        message: 'Solicitacao e sua material econtrados e deletados com sucesso!',
                        success: true,
                        requests: filterByRequestId(RequestMaterialMock.data, requestId)
                    });
                }
            }
        }
    };

    controller.updateRequestMaterial = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestMaterialsByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            if (findRequestMaterialsByMaterialsId(materialId).length == 0) {
                res.status(404).json({
                    message: 'Material não encontrada na base.',
                    success: false,
                    requestsMaterials: filterByRequestId(RequestMaterialMock.data, requestId),
                });
            } else {
                if (findIndexByIds(requestId, materialId) == null) {
                    res.status(404).json({
                        message: 'Material não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestId(RequestMaterialMock.data, requestId),
                    });
                } else {
                    const updatedJson = {
                        request: findRequestById(requestId),
                        //TODO: Verificar se existe na base de dados antes
                        material: req.body.material,
                    };

                    RequestMaterialMock.data.splice(findIndexByMaterialId(materialId), 1, updatedJson);

                    res.status(200).json({
                        message: 'Solicitacao e material econtrados e alterados com sucesso!',
                        success: true,
                        requests: filterByRequestId(RequestMaterialMock.data, requestId),
                    });
                }
            }
        }
    }

    controller.getRequestMaterialById = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestMaterialsByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialMock,
            });
        } else {
            if (findRequestMaterialsByMaterialsId(materialId).length == 0) {
                res.status(404).json({
                    message: 'Material não encontrada na base.',
                    success: false,
                    requestsMaterials: filterByRequestId(RequestMaterialMock.data, requestId),
                });
            } else {
                if (findIndexByIds(requestId, materialId) == null) {
                    res.status(404).json({
                        message: 'Material não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestId(RequestMaterialMock.data, requestId),
                    });
                } else {
                    res.status(200).json({
                        message: 'Solicitacao e material econtrados com sucesso!',
                        success: true,
                        requests: RequestMaterialMock.data[findIndexByIds(materialId, requestId)],
                    });
                }
            }
        }
    }

    function findRequestMaterialsByRequestId(id) {
        const matchedIdsJson = [];

        RequestMaterialMock.data.forEach(element => {
            if (element.request.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequestMaterialsByMaterialsId(id) {
        const matchedIdsJson = [];

        RequestMaterialMock.data.forEach(element => {
            if (element.material.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequests() {
        const matchedJsons = [];

        RequestMaterialMock.data.forEach(element => {
            matchedJsons.push(element.request);
        });

        return matchedJsons;
    }

    function findIndexByMaterialId(id) {
        for (var i = 0; i < RequestMaterialMock.data.length; i++) {
            if (RequestMaterialMock.data[i].material.id == id) {
                return i;
            }
        }
        return null;
    }

    function findIndexByIds(requestId, materialId) {
        for (var i = 0; i < RequestMaterialMock.data.length; i++) {
            if (RequestMaterialMock.data[i].request.id == requestId && RequestMaterialMock.data[i].material.id == materialId) {
                return i;
            }
        }
        return null;
    }

    function filterByRequestId(jsonArray, requestId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.request.id == requestId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function listMaterialsByProvidedId(jsonObject, requestId) {
        const matchedIdsJson = [];

        jsonObject.data.forEach(element => {
            if (element.request == requestId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequestById(requestId) {

        if (findIndexById(requestId) == -1) {
            return null;
        } else {
            return requestsMock.data[findIndexById(requestId)]
        }
    }

    function findIndexById(id) {
        return requestsMock.data.findIndex(json => json.id == id);
    }

    return controller;
}