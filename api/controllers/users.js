const uuidv4 = require('uuid/v4');

module.exports = app => {
    const usersDB = app.data.users;
    const controller = {};

    const {
        users: usersMock,
    } = usersDB;

    controller.listUsers = (req, res) => res.status(200).json(usersDB);

    controller.saveUser = (req, res) => {

        usersMock.data.push({
            id: 4,
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            active: true,
            password: req.body.password,
            permissionId: parseInt(req.body.permissionId),
            departmentId: parseInt(req.body.departmentId),
        });
        res.status(201).json(usersMock);
    }

    controller.removeUser = (req, res) => {
        const {
            userId,
        } = req.params;

        if (findIndexById(userId) == -1) {
            res.status(404).json({
                message: 'Usuario não encontrado na base.',
                success: false,
                users: usersMock,
            });
        } else {
            usersMock.data.splice(findIndexById(userId), 1);
            res.status(200).json({
                message: 'Usuario encontrado e deletado com sucesso!',
                success: true,
                users: usersMock
            });
        }
    };

    controller.updateUser = (req, res) => {
        const {
            userId,
        } = req.params;

        if (findIndexById(userId) == -1) {
            res.status(404).json({
                message: 'Usuario não encontrado na base.',
                success: false,
                users: usersMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(userId),
                name: req.body.name,
                email: req.body.email,
                type: req.body.type,
                active: req.body.active,
                password: req.body.password,
                permissionId: parseInt(req.body.permissionId),
                departmentId: parseInt(req.body.departmentId),
            };

            usersMock.data.splice(findIndexById(userId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Usuario encontrado e alterado com sucesso!',
                success: true,
                users: usersMock
            });
        }
    }

    controller.getUserById = (req, res) => {
        const {
            userId,
        } = req.params;

        if (findIndexById(userId) == -1) {
            res.status(404).json({
                message: 'Usuario não encontrado na base.',
                success: false,
                users: usersMock,
            });
        } else {
            res.status(200).json({
                message: 'Usuario encontrado com sucesso!',
                success: true,
                users: usersMock.data[findIndexById(userId)],
            });
        }
    }

    function findIndexById(id) {
        return usersMock.data.findIndex(json => json.id == id);
    }

    return controller;
}