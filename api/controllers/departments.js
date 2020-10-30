const uuidv4 = require('uuid/v4');

module.exports = app => {
    const departmentsDB = app.data.departments;
    const controller = {};

    const {
        departments: departmentsMock,
    } = departmentsDB;

    controller.listDepartments = (req, res) => res.status(200).json(departmentsDB);

    controller.saveDepartment = (req, res) => {

        departmentsMock.data.push({
            id: 4,
            managerId: parseInt(req.body.managerId),
            description: req.body.description,
            active: req.body.active,
        });

        res.status(201).json(departmentsMock);
    }

    controller.removeDepartment = (req, res) => {
        const {
            departmentId,
        } = req.params;

        if (findIndexById(departmentId) == -1) {
            res.status(404).json({
                message: 'Departamento não encontrado na base.',
                success: false,
                departments: departmentsMock,
            });
        } else {
            departmentsMock.data.splice(findIndexById(departmentId), 1);
            res.status(200).json({
                message: 'Departamento encontrado e deletado com sucesso!',
                success: true,
                departments: departmentsMock
            });
        }
    };

    controller.updateDepartment = (req, res) => {
        const {
            departmentId,
        } = req.params;

        if (findIndexById(departmentId) == -1) {
            res.status(404).json({
                message: 'Departamento não encontrado na base.',
                success: false,
                departments: departmentsMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(departmentId),
                managerId: parseInt(req.body.managerId),
                description: req.body.description,
                active: req.body.active,
            };

            departmentsMock.data.splice(findIndexById(departmentId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Departamento econtrada e alterada com sucesso!',
                success: true,
                departments: departmentsMock
            });
        }
    }

    controller.getDepartmentById = (req, res) => {
        const {
            departmentId,
        } = req.params;

        if (findIndexById(departmentId) == -1) {
            res.status(404).json({
                message: 'Departamento não encontrado na base.',
                success: false,
                departments: departmentsMock,
            });
        } else {
            res.status(200).json({
                message: 'Departamento encontrado com sucesso!',
                success: true,
                departments: departmentsMock.data[findIndexById(departmentId)],
            });
        }
    }

    function findIndexById(id) {
        return departmentsMock.data.findIndex(json => json.id == id);
    }

    return controller;
}