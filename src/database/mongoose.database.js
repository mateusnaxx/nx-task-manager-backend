const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("Conexão com o MongoDB estabelecida com sucesso!");

    } catch (error) {
        console.error("Erro ao conectar com o MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectToDatabase;