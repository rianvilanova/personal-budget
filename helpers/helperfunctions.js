function createId(data) {
    const latestRecord = data[data.length - 1];
    const newId = latestRecord + 1;
    if (newId === NaN || newId < 0 || newId === undefined) {
        console.error(`ID inválido`)
    }
}

function findById(data, recordId) {
    const record = data.find((item) => item.id === parseInt(recordId));
    if (!record) {
        console.error(`ID inexistente`)
    }
    return record;
}

function deleteById(data, recordId) {
    let index = data.findIndex((item) => {
        return item.id === parseInt(recordId);
    })
    if (index === -1) {
        console.log('Indíce inválido')
    }
    data.splice(index, 1);
    return data;
}

module.exports = { createId, findById, deleteById };