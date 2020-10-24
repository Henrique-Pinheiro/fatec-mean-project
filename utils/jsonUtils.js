function findIndexById(id) {
    return usersMock.data.findIndex(json => json.id == id);
}