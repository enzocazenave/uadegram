const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('morgan');
const dbConnection = require('./database/config');
const fileUpload = require('express-fileupload');

dotenv.config();
const { PORT_EXPRESS } = process.env;

const expressServer = express();

dbConnection();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));
expressServer.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
expressServer.use(logger('dev'));

//* DECLARED ROUTES *//
expressServer.use('/api/auth', require('./routes/auth.routes'));
expressServer.use('/api/user', require('./routes/user.routes'));
expressServer.use('/api/couple', require('./routes/couple.routes'));
//* ############### *//

expressServer.listen(PORT_EXPRESS, () => {
    console.log(`\nSTARTING EXPRESS SERVER\n✔  http://localhost:${ PORT_EXPRESS }`);
});