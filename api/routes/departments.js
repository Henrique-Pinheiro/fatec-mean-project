module.exports = app => {
    const controller = app.controllers.departments;

    app.route('/api/v1/departments')
        .get(controller.listDepartments)
        .post(controller.saveDepartment);

    app.route('/api/v1/departments/:departmentId')
        .delete(controller.removeDepartment)
        .put(controller.updateDepartment)
        .get(controller.getDepartmentById);
}