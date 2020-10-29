const uuidv4 = require('uuid/v4');

module.exports = app => {
    const materialsDB = app.data.materials;
    const controller = {};

    const {
        materials: materialsMock,
    } = materialsDB;

    controller.listMaterials = (req, res) => res.status(200).json(materialsDB);

    controller.saveMaterial = (req, res) => {

        console.log(req.body);

        materialsMock.data.push({
            id: 4,
            name: req.body.name,
            unity: req.body.unity,
            weight: parteInt(req.body.weight),
            width: parteInt(req.body.width),
            height: parteInt(req.body.height),
            createdAt: req.body.createdAt,
            attendanceDate: req.body.attendanceDate,
            active: true,
            groupId: parteInt(req.body.groupId),
        });

        res.status(201).json(materialsMock);
    }

    controller.removeMaterial = (req, res) => {
        const {
            materialId,
        } = req.params;

        if (findIndexById(materialId) == -1) {
            res.status(404).json({
                message: 'Material não encontrado na base.',
                success: false,
                materials: materialsMock,
            });
        } else {
            materialsMock.data.splice(findIndexById(materialId), 1);
            res.status(200).json({
                message: 'Material econtrado e deletado com sucesso!',
                success: true,
                materials: materialsMock
            });
        }
    };

    controller.updateMaterial = (req, res) => {
        const {
            materialId,
        } = req.params;

        if (findIndexById(materialId) == -1) {
            res.status(404).json({
                message: 'Material não encontrado na base.',
                success: false,
                materials: materialsMock,
            });
        } else {
            const updatedCostumer = {
                id: parseInt(materialId),
                name: req.body.name,
                unity: req.body.unity,
                weight: parteInt(req.body.weight),
                width: parteInt(req.body.width),
                height: parteInt(req.body.height),
                createdAt: req.body.createdAt,
                attendanceDate: req.body.attendanceDate,
                active: true,
                groupId: parteInt(req.body.groupId),
            };

            materialsMock.data.splice(findIndexById(materialId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Material econtrado e alterado com sucesso!',
                success: true,
                materials: materialsMock
            });
        }
    }

    controller.getMaterialById = (req, res) => {
        const {
            materialId,
        } = req.params;

        if (findIndexById(materialId) == -1) {
            res.status(404).json({
                message: 'Material não encontrado na base.',
                success: false,
                materials: materialsMock,
            });
        } else {
            res.status(200).json({
                message: 'Material econtrado com sucesso!',
                success: true,
                materials: materialsMock.data[findIndexById(materialId)],
            });
        }
    }

    function findIndexById(id) {
        return materialsMock.data.findIndex(json => json.id == id);
    }

    return controller;
}