const uuidv4 = require('uuid/v4');

module.exports = app => {
    const RequestsOrderDB = app.data.requestsOrders;
    const requestsDB = app.data.requests;
    const controller = {};

    const {
        requests: requestsMock,
    } = requestsDB

    const {
        requestsOrders: RequestOrderMock,
    } = RequestsOrderDB;

    controller.listRequestsOrders = (req, res) => {
        const {
            requestId,
        } = req.params;

        const matchedIdsJson = [];

        if (findRequestOrdersByRequestId(requestId).length == 0) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            res.status(200).json(filterByRequestId(RequestOrderMock.data, requestId));
        }
    };

    controller.saveRequestOrder = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findIndexById(requestId).length == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            RequestOrderMock.data.push({
                request: findRequestById(requestId),
                //TODO: Verificar se existe na base de dados antes
                order: req.body.order,
            });
            res.status(200).json(filterByRequestId(RequestOrderMock.data, requestId));
        }
    }

    controller.removeRequestOrder = (req, res) => {
        const {
            requestId,
            orderId,
        } = req.params;

        if (findIndexById(requestId).length == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            if (findRequestOrdersByOrdersId(orderId).length == 0) {
                res.status(404).json({
                    message: 'Pedido não encontrada na base.',
                    success: false,
                    requestsOrders: filterByRequestId(RequestOrderMock.data, requestId),
                });
            } else {
                if (findIndexByIds(requestId, orderId) == null) {
                    res.status(404).json({
                        message: 'Pedido não encontrada na base.',
                        success: false,
                        requestsOrders: filterByRequestId(RequestOrderMock.data, requestId),
                    });
                } else {
                    RequestOrderMock.data.splice(findIndexByIds(requestId, orderId), 1);
                    res.status(200).json({
                        message: 'Solicitacao e sua pedido econtrados e deletados com sucesso!',
                        success: true,
                        requests: filterByRequestId(RequestOrderMock.data, requestId)
                    });
                }
            }
        }
    };

    controller.updateRequestOrder = (req, res) => {
        const {
            requestId,
            orderId,
        } = req.params;

        if (findIndexById(requestId).length == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            if (findRequestOrdersByOrdersId(orderId).length == 0) {
                res.status(404).json({
                    message: 'Pedido não encontrada na base.',
                    success: false,
                    requestsOrders: filterByRequestId(RequestOrderMock.data, requestId),
                });
            } else {
                if (findIndexByIds(requestId, orderId) == null) {
                    res.status(404).json({
                        message: 'Pedido não encontrada na base.',
                        success: false,
                        requestsOrders: filterByRequestId(RequestOrderMock.data, requestId),
                    });
                } else {
                    const updatedJson = {
                        request: findRequestById(requestId),
                        //TODO: Verificar se existe na base de dados antes
                        order: req.body.order,
                    };

                    RequestOrderMock.data.splice(findIndexByOrderId(orderId), 1, updatedJson);

                    res.status(200).json({
                        message: 'Solicitacao e pedido econtrados e alterados com sucesso!',
                        success: true,
                        requests: filterByRequestId(RequestOrderMock.data, requestId),
                    });
                }
            }
        }
    }

    controller.getRequestOrderById = (req, res) => {
        const {
            requestId,
            orderId,
        } = req.params;

        if (findIndexById(requestId).length == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            if (findRequestOrdersByOrdersId(orderId).length == 0) {
                res.status(404).json({
                    message: 'Pedido não encontrada na base.',
                    success: false,
                    requestsOrders: filterByRequestId(RequestOrderMock.data, requestId),
                });
            } else {
                if (findIndexByIds(requestId, orderId) == null) {
                    res.status(404).json({
                        message: 'Pedido não encontrada na base.',
                        success: false,
                        requestsOrders: filterByRequestId(RequestOrderMock.data, requestId),
                    });
                } else {
                    res.status(200).json({
                        message: 'Solicitacao e pedido econtrados com sucesso!',
                        success: true,
                        requests: RequestOrderMock.data[findIndexByIds(orderId, requestId)],
                    });
                }
            }
        }
    }

    function findRequestOrdersByRequestId(id) {
        const matchedIdsJson = [];

        RequestOrderMock.data.forEach(element => {
            if (element.request.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequestOrdersByOrdersId(id) {
        const matchedIdsJson = [];

        RequestOrderMock.data.forEach(element => {
            if (element.order.id == id) {
                matchedIdsJson.push(element);
            }
        });

        return matchedIdsJson;
    }

    function findRequests() {
        const matchedJsons = [];

        RequestOrderMock.data.forEach(element => {
            matchedJsons.push(element.request);
        });

        return matchedJsons;
    }

    function findIndexByOrderId(id) {
        for (var i = 0; i < RequestOrderMock.data.length; i++) {
            if (RequestOrderMock.data[i].order.id == id) {
                return i;
            }
        }
        return null;
    }

    function findIndexByIds(requestId, orderId) {
        for (var i = 0; i < RequestOrderMock.data.length; i++) {
            if (RequestOrderMock.data[i].request.id == requestId && RequestOrderMock.data[i].order.id == orderId) {
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

    function listOrdersByProvidedId(jsonObject, requestId) {
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