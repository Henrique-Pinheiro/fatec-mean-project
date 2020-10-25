module.exports = app => {
    const controller = app.controllers.materials;

    app.route('/api/v1/materials')
        .get(controller.listMaterials)
        .post(controller.saveMaterial);

    app.route('/api/v1/materials/:materialId')
        .delete(controller.removeMaterial)
        .put(controller.updateMaterial)
        .get(controller.getMaterialById);
}