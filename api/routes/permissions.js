module.exports = app => {
    const controller = app.controllers.permissions;

    app.route('/api/v1/permissions')
        .get(controller.listPermissions)
        .post(controller.savePermission);

    app.route('/api/v1/permissions/:permissionId')
        .delete(controller.removePermission)
        .put(controller.updatePermission)
        .get(controller.getPermissionById);
}