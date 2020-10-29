const uuidv4 = require('uuid/v4');

module.exports = app => {
    const requestsDB = app.data.requests;
    const controller = {};

    const {
        requests: requestsMock,
    } = requestsDB;

    controller.listRequests = (req, res) => res.status(200).json(requestsDB);

    controller.saveRequest = (req, res) => {

        requestsMock.data.push({
            id: 4,
            requestDate: req.body.requestDate,
            justification: req.body.justification,
            priority: req.body.priority,
            status: req.body.status,
            desiredDate: req.body.desiredDate,
            requester: req.body.requester,
            approver: req.body.approver,
        });

        res.status(201).json(requestsMock);
    }

    controller.removeRequest = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: requestsMock,
            });
        } else {
            requestsMock.data.splice(findIndexById(requestId), 1);
            res.status(200).json({
                message: 'Solicitacao encontrado e deletado com sucesso!',
                success: true,
                requests: requestsMock
            });
        }
    };

    controller.updateRequest = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: requestsMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(requestId),
                requestDate: req.body.requestDate,
                justification: req.body.justification,
                priority: req.body.priority,
                status: req.body.status,
                desiredDate: req.body.desiredDate,
                requester: req.body.requester,
                approver: req.body.approver,
            };

            requestsMock.data.splice(findIndexById(requestId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Solicitacao econtrada e alterada com sucesso!',
                success: true,
                requests: requestsMock
            });
        }
    }

    controller.getRequestById = (req, res) => {
        const {
            requestId,
        } = req.params;

        if (findIndexById(requestId) == -1) {
            res.status(404).json({
                message: 'Solicitacao não encontrado na base.',
                success: false,
                requests: requestsMock,
            });
        } else {
            res.status(200).json({
                message: 'Solicitacao encontrado com sucesso!',
                success: true,
                requests: requestsMock.data[findIndexById(requestId)],
            });
        }
    }

    function findIndexById(id) {
        return requestsMock.data.findIndex(json => json.id == id);
    }

    return controller;
}