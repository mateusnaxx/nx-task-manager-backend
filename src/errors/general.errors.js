const notAllowedFieldsToUpdateError = (res) => {
    return res
        .status(500)
        .send("One or more inserted fields are not editable!");
};

module.exports = {
    notAllowedFieldsToUpdateError,
};
