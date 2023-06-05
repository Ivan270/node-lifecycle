const { Vehiculo } = require('./Vehiculo.js');

const leerVehiculos = () => {
	let autos = new Vehiculo();
	let resultado = autos.findAll();
	console.log(resultado);
};

const buscarPorId = (id) => {
	let autos = new Vehiculo();
	let resultado = autos.findById(id);
	if (resultado) {
		console.log(resultado);
	} else {
		console.log(`Vehiculo con id ${id} no fue encontrado`);
	}
};
const buscarPorMarca = (marca) => {
	let autos = new Vehiculo();
	let resultado = autos.findByMarca(marca);
	if (resultado) {
		console.log(resultado);
	} else {
		console.log(`Vehiculo con id ${marca} no fue encontrado`);
	}
};
const crearAuto = (marca, modelo, asientos) => {
	let auto = new Vehiculo(undefined, marca, modelo, asientos);
	let resultado = auto.save();
	console.log('vehiculo creado: ', resultado);
};

const eliminarAuto = (id) => {
	let auto = new Vehiculo();
	let resultado = auto.delete(id);
	console.log(resultado);
};

const actualizarAuto = (id, marca, modelo, asientos) => {
	marca == 'undefined' ? (marca = undefined) : (marca = marca);
	modelo == 'undefined' ? (modelo = undefined) : (modelo = modelo);
	asientos == 'undefined' ? (asientos = undefined) : (asientos = asientos);
	let auto = new Vehiculo(id, marca, modelo, asientos);
	let resultado = auto.update();
	console.log(resultado);
};

let argumentos = process.argv.slice(2);
let comando = argumentos[0];

switch (comando) {
	case 'leer':
		leerVehiculos();
		break;
	case 'buscar_id':
		let id = argumentos[1];
		buscarPorId(id);
		break;
	case 'buscar_marca':
		let marca = argumentos[1];
		buscarPorMarca(marca);
		break;
	case 'crear':
		let brand = argumentos[1];
		let mod = argumentos[2];
		let seats = argumentos[3];
		crearAuto(brand, mod, seats);
		break;
	case 'eliminar':
		let idEliminar = argumentos[1];
		eliminarAuto(idEliminar);
		break;
	case 'modificar':
		let idMod = argumentos[1];
		let marcaMod = argumentos[2];
		let modeloMod = argumentos[3];
		let asientosMod = argumentos[4];
		actualizarAuto(idMod, marcaMod, modeloMod, asientosMod);
		break;
	default:
		console.log('Comando no reconocido');
		break;
}
