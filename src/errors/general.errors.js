const notAllowedFieldsToUpdateError = (res) => {
    return res
        .status(500)
        .send("One or more inserted fields are not editable!");
};

const GenericServerError = (res) => {
    return res.status(500).send("Internal server error!");
};

module.exports = {
    notAllowedFieldsToUpdateError,
    GenericServerError,
};
