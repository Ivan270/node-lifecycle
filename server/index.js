const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares - actuan antes de entrar a rutas. En este caso para poder hacer put y post
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
	console.log('Servidor escuchando en http://localhost:' + PORT);
});
