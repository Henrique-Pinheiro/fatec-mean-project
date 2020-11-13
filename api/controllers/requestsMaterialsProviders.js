const uuidv4 = require('uuid/v4');

module.exports = app => {
    const RequestsMaterialDB = app.data.requestsMaterials;
    const RequestsMaterialProviderDB = app.data.requestsMaterialsProviders;
    const materialsDB = app.data.materials;
    const requestsDB = app.data.requests;
    const controller = {};

    const {
        requests: requestsMock,
    } = requestsDB

    const {
        materials: materialsMock,
    } = materialsDB;

    const {
        requestsMaterialsProviders: RequestMaterialProvidersMock,
    } = RequestsMaterialProviderDB;

    controller.listRequestsMaterialsProviders = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestMaterialsProvidersByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProvidersMock,
            });
        } else {
            if (findRequestMaterialsProvidersByMaterialId(materialId).length == 0) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requests: RequestMaterialProvidersMock,
                });
            } else {
                if (findIndexByIds(requestId, materialId) == null) {
                    res.status(404).json({
                        message: 'Material não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestId(RequestMaterialProvidersMock.data, requestId),
                    });
                } else {
                    res.status(200).json(filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId));
                }
            }
        }
    };

    controller.saveRequestMaterialProvider = (req, res) => {
        const {
            requestId,
            materialId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProvidersMock,
            });
        } else {
            if (findMaterialById(materialId) == null) {
                res.status(404).json({
                    message: 'Material não encontrada na base.',
                    success: false,
                    requestsMaterials: filterByRequestId(RequestMaterialProvidersMock.data, requestId),
                });
            } else {
                RequestMaterialProvidersMock.data.push({
                    request: findRequestById(requestId),
                    //TODO: Verificar se existe na base de dados antes
                    material: findMaterialById(materialId),
                    provider: req.body.provider,
                    unityPrice: req.body.unityPrice,
                    createdAt: req.body.createdAt,
                    attendedAt: req.body.attendedAt,
                });
                res.status(200).json(filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId));
            }
        }
    }

    controller.removeRequestMaterialProvider = (req, res) => {
        const {
            requestId,
            materialId,
            providerId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProvidersMock,
            });
        } else {
            if (findMaterialById(materialId) == null) {
                res.status(404).json({
                    message: 'Material não encontrada na base.',
                    success: false,
                    requestsMaterials: filterByRequestId(RequestMaterialProvidersMock.data, requestId),
                });
            } else {
                if (findIndexByAllIds(requestId, materialId, providerId) == null) {
                    res.status(404).json({
                        message: 'Fornecedor não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId),
                    });
                } else {
                    RequestMaterialProvidersMock.data.splice(findIndexByAllIds(requestId, materialId, providerId), 1);
                    res.status(200).json({
                        message: 'Solicitacao, material e fornecedor econtrados e deletados com sucesso!',
                        success: true,
                        requestsMaterials: filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId),
                    });
                }
            }
        }
    };

    controller.updateRequestMaterialProvider = (req, res) => {
        const {
            requestId,
            materialId,
            providerId,
        } = req.params;

        if (findRequestMaterialsProvidersByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProvidersMock,
            });
        } else {
            if (findMaterialById(materialId) == null) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requests: RequestMaterialProvidersMock,
                });
            } else {
                if (findIndexByIds(requestId, materialId) == null) {
                    res.status(404).json({
                        message: 'Material não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestId(RequestMaterialProvidersMock.data, requestId),
                    });
                } else {
                    if (findIndexByAllIds(requestId, materialId, providerId) == null) {
                        res.status(404).json({
                            message: 'Fornecedor não encontrada na base.',
                            success: false,
                            requestsMaterials: filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId),
                        });
                    } else {
                        const updatedJson = {
                            request: findRequestById(requestId),
                            //TODO: Verificar se existe na base de dados antes
                            material: findMaterialById(materialId),
                            provider: req.body.provider,
                            unityPrice: req.body.unityPrice,
                            createdAt: req.body.createdAt,
                            attendedAt: req.body.attendedAt,
                        };

                        RequestMaterialProvidersMock.data.splice(findIndexByAllIds(requestId, materialId, providerId), 1, updatedJson);
                        res.status(200).json({
                            message: 'Solicitacao, material e fornecedor econtrados e alterados com sucesso!',
                            success: true,
                            requestsMaterials: filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId),
                        });
                    }
                }
            }
        }
    }

    controller.getRequestMaterialProviderById = (req, res) => {
        const {
            requestId,
            materialId,
            providerId,
        } = req.params;

        if (findRequestMaterialsProvidersByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestMaterialProvidersMock,
            });
        } else {
            if (findRequestMaterialsProvidersByMaterialId(materialId).length == 0) {
                res.status(404).json({
                    message: 'Material não encontrado na base.',
                    success: false,
                    requests: RequestMaterialProvidersMock,
                });
            } else {
                if (findIndexByIds(requestId, materialId) == null) {
                    res.status(404).json({
                        message: 'Material não encontrada na base.',
                        success: false,
                        requestsMaterials: filterByRequestId(RequestMaterialProvidersMock.data, requestId),
                    });
                } else {
                    if (findIndexByAllIds(requestId, materialId, providerId) == null) {
                        res.status(404).json({
                            message: 'Fornecedor não encontrada na base.',
                            success: false,
                            requestsMaterials: filterByRequestIdAndMaterialId(RequestMaterialProvidersMock.data, requestId, materialId),
                        });
                    } else {
                        res.status(200).json({
                            message: 'Solicitacao e material econtrados com sucesso!',
                            success: true,
                            requests: RequestMaterialProvidersMock.data[findIndexByAllIds(materialId, requestId, materialId)],
                        });
                    }
                }
            }
        }
    }

    function findRequestMaterialsProvidersByRequestId(id) {
        const matchedIdsJson = [];

        RequestMaterialProvidersMock.data.forEach(element => {
            if (element.request.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequestMaterialsProvidersByMaterialId(id) {
        const matchedIdsJson = [];

        RequestMaterialProvidersMock.data.forEach(element => {
            if (element.material.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findIndexByIds(requestId, materialId) {
        for (var i = 0; i < RequestMaterialProvidersMock.data.length; i++) {
            if (RequestMaterialProvidersMock.data[i].request.id == requestId && RequestMaterialProvidersMock.data[i].material.id == materialId) {
                return i;
            }
        }
        return null;
    }

    function findIndexByAllIds(requestId, materialId, providerId) {
        for (var i = 0; i < RequestMaterialProvidersMock.data.length; i++) {
            if (RequestMaterialProvidersMock.data[i].request.id == requestId && RequestMaterialProvidersMock.data[i].material.id == materialId && RequestMaterialProvidersMock.data[i].provider.id == providerId) {
                return i;
            }
        }
        return null;
    }

    function filterByRequestIdAndMaterialId(jsonArray, requestId, materialId) {
        const matchedIdsJson = [];

        jsonArray.forEach(element => {
            if (element.request.id == requestId && element.material.id == materialId) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequestById(requestId) {

        if (findRequestIndexById(requestId) == -1) {
            return null;
        } else {
            return requestsMock.data[findRequestIndexById(requestId)]
        }
    }

    function findRequestIndexById(id) {
        return requestsMock.data.findIndex(json => json.id == id);
    }

    function findMaterialById(materialId) {
        if (findMaterialIndexById(materialId) == -1) {
            return null;
        } else {
            return materialsMock.data[findMaterialIndexById(materialId)]
        }
    }

    function findMaterialIndexById(id) {
        return materialsMock.data.findIndex(json => json.id == id);
    }

    return controller;
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