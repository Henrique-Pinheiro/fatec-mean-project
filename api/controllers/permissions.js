const uuidv4 = require('uuid/v4');

module.exports = app => {
    const permissionsDB = app.data.permissions;
    const controller = {};

    const {
        permissions: permissionsMock,
    } = permissionsDB;

    controller.listPermissions = (req, res) => res.status(200).json(permissionsDB);

    controller.savePermission = (req, res) => {

        permissionsMock.data.push({
            id: 4,
            description: req.body.description,
        });

        res.status(201).json(permissionsMock);
    }

    controller.removePermission = (req, res) => {
        const {
            permissionId,
        } = req.params;

        if (findIndexById(permissionId) == -1) {
            res.status(404).json({
                message: 'Permissão não encontrado na base.',
                success: false,
                permissions: permissionsMock,
            });
        } else {
            permissionsMock.data.splice(findIndexById(permissionId), 1);
            res.status(200).json({
                message: 'Permissão encontrado e deletado com sucesso!',
                success: true,
                permissions: permissionsMock
            });
        }
    };

    controller.updatePermission = (req, res) => {
        const {
            permissionId,
        } = req.params;

        if (findIndexById(permissionId) == -1) {
            res.status(404).json({
                message: 'Permissão não encontrado na base.',
                success: false,
                permissions: permissionsMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(permissionId),
                description: req.body.description,
            };

            permissionsMock.data.splice(findIndexById(permissionId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Permissão econtrada e alterada com sucesso!',
                success: true,
                permissions: permissionsMock
            });
        }
    }

    controller.getPermissionById = (req, res) => {
        const {
            permissionId,
        } = req.params;

        if (findIndexById(permissionId) == -1) {
            res.status(404).json({
                message: 'Permissão não encontrado na base.',
                success: false,
                permissions: permissionsMock,
            });
        } else {
            res.status(200).json({
                message: 'Permissão encontrado com sucesso!',
                success: true,
                permissions: permissionsMock.data[findIndexById(permissionId)],
            });
        }
    }

    function findIndexById(id) {
        return permissionsMock.data.findIndex(json => json.id == id);
    }

    return controller;
}