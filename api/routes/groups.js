module.exports = app => {
    const controller = app.controllers.groups;

    app.route('/api/v1/groups')
        .get(controller.listGroups)
        .post(controller.saveGroup);

    app.route('/api/v1/groups/:groupId')
        .delete(controller.removeGroup)
        .put(controller.updateGroup)
        .get(controller.getGroupById);
}