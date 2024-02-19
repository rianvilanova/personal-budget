const express = require(`express`);
const morgan = require('morgan');

const app = express();

const envelopesRouter = require(`./routes/envelopes`);

app.use(morgan('dev'));
app.use(express.json());

app.use(`/envelopes`, envelopesRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}.`)
});