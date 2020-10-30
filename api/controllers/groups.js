const uuidv4 = require('uuid/v4');

module.exports = app => {
    const groupsDB = app.data.groups;
    const controller = {};

    const {
        groups: groupsMock,
    } = groupsDB;

    controller.listGroups = (req, res) => res.status(200).json(groupsDB);

    controller.saveGroup = (req, res) => {

        groupsMock.data.push({
            id: 4,
            description: req.body.description,
        });

        res.status(201).json(groupsMock);
    }

    controller.removeGroup = (req, res) => {
        const {
            groupId,
        } = req.params;

        if (findIndexById(groupId) == -1) {
            res.status(404).json({
                message: 'Grupo não encontrado na base.',
                success: false,
                groups: groupsMock,
            });
        } else {
            groupsMock.data.splice(findIndexById(groupId), 1);
            res.status(200).json({
                message: 'Grupo encontrado e deletado com sucesso!',
                success: true,
                groups: groupsMock
            });
        }
    };

    controller.updateGroup = (req, res) => {
        const {
            groupId,
        } = req.params;

        if (findIndexById(groupId) == -1) {
            res.status(404).json({
                message: 'Grupo não encontrado na base.',
                success: false,
                groups: groupsMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(groupId),
                description: req.body.description,
            };

            groupsMock.data.splice(findIndexById(groupId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Grupo econtrada e alterada com sucesso!',
                success: true,
                groups: groupsMock
            });
        }
    }

    controller.getGroupById = (req, res) => {
        const {
            groupId,
        } = req.params;

        if (findIndexById(groupId) == -1) {
            res.status(404).json({
                message: 'Grupo não encontrado na base.',
                success: false,
                groups: groupsMock,
            });
        } else {
            res.status(200).json({
                message: 'Grupo encontrado com sucesso!',
                success: true,
                groups: groupsMock.data[findIndexById(groupId)],
            });
        }
    }

    function findIndexById(id) {
        return groupsMock.data.findIndex(json => json.id == id);
    }

    return controller;
}