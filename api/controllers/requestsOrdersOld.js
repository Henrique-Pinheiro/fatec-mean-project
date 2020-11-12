const uuidv4 = require('uuid/v4');

module.exports = app => {
    const RequestsOrderDB = app.data.requestsOrders;
    const controller = {};

    const {
        requestsOrders: RequestOrderMock,
    } = RequestsOrderDB;

    controller.listRequestsOrders = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
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

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            RequestOrderMock.data.push({
                requestId: parseInt(requestId),
                //TODO: Verificar se existe na base de dados antes
                orderId: parseInt(req.body.orderId),
            });
            res.status(201).json(filterByRequestId(RequestOrderMock.data, requestId));
        }
    }

    controller.removeRequestOrder = (req, res) => {
        const {
            requestId,
            orderId,
        } = req.params;

        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            if (findOrderIndexById(orderId) == -1) {
                res.status(404).json({
                    message: 'Pedido não encontrado na base.',
                    success: false,
                    requestsOrders: listOrdersByProvidedId(RequestOrderMock, requestId),
                });
            } else {
                RequestOrderMock.data.splice(findOrderIndexById(orderId), 1);
                res.status(200).json({
                    message: 'Solicitacao e seu pedido econtrados e deletados com sucesso!',
                    success: true,
                    requests: listOrdersByProvidedId(RequestOrderMock, requestId),
                });
            }
        }
    };

    controller.updateRequestOrder = (req, res) => {
        const {
            requestId,
            orderId,
        } = req.params;
        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            if (findOrderIndexById(orderId) == -1) {
                res.status(404).json({
                    message: 'Pedido não encontra na base.',
                    success: false,
                    requestsOrders: listOrdersByProvidedId(RequestOrderMock, requestId),
                });
            } else {
                const updatedJson = {
                    requestId: parseInt(requestId),
                    //TODO: Verificar se existe na base de dados antes
                    orderId: parseInt(req.body.orderId),
                };

                RequestOrderMock.data.splice(findOrderIndexById(orderId), 1, updatedJson);

                res.status(200).json({
                    message: 'Solicitacao e pedido econtrados e alterados com sucesso!',
                    success: true,
                    requests: listOrdersByProvidedId(RequestOrderMock, requestId),
                });
            }
        }
    }

    controller.getRequestOrderById = (req, res) => {
        const {
            requestId,
            orderId,
        } = req.params;
        if (findRequestIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: RequestOrderMock,
            });
        } else {
            if (findOrderIndexById(orderId) == -1) {
                res.status(404).json({
                    message: 'Pedido não encontrado na base.',
                    success: false,
                    requestsOrders: listOrdersByProvidedId(RequestOrderMock, requestId),
                });
            } else {
                res.status(200).json({
                    message: 'Solicitacao e pedido econtrados com sucesso!',
                    success: true,
                    requests: RequestOrderMock.data[findOrderIndexById(orderId)],
                });
            }
        }
    }

    function findRequestIndexById(id) {
        return RequestOrderMock.data.findIndex(json => json.requestId == id);
    }

    function findOrderIndexById(id) {
        return RequestOrderMock.data.findIndex(json => json.orderId == id);
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

    function listOrdersByProvidedId(jsonObject, requestId) {
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