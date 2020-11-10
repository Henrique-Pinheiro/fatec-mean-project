// module.exports = app => {
//     const controller = app.controllers.requestsMaterialsProviders;

//     app.route('/api/v1/requests/:requestId/materials/:materialId/providers')
//         .get(controller.listRequestsMaterialsProviders)
//         .post(controller.saveRequestMaterialProvider);

//     app.route('/api/v1/requests/:requestId/materials/:materialId/providers/:providerId')
//         .delete(controller.removeRequestMaterialProvider)
//         .put(controller.updateRequestMaterialProvider)
//         .get(controller.getRequestMaterialProviderById);
// }