const notFoundError = (res) => {
    return res.status(404).send("Not found!");
};

const idInvalidError = (res) => {
    return res.status(400).send("ID invalid!");
};

module.exports = {
    notFoundError,
    idInvalidError,
};
