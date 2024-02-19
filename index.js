const express = require(`express`);
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}.`)
});