const { connect, set } = require('mongoose');

const dbConnection = async() => {
    const { DATABASE_CONNECTION_STRING } = process.env;

    try {
        set('strictQuery', false);
        await connect(DATABASE_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('\STARTING MONGO DB SERVER\n✔  uadegram_db/uadegram');
    } catch(error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos.');
    }
}

module.exports = dbConnection;