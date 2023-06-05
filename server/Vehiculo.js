const fs = require('fs');
const { v4: uuid } = require('uuid');

class Vehiculo {
	constructor(id, marca, modelo, asientos) {
		this.id = id;
		this.marca = marca;
		this.modelo = modelo;
		this.asientos = asientos;
	}
	findAllObj() {
		let resultadoJson = fs.readFileSync(__dirname + '/data.json', 'utf8');
		let resultado = JSON.parse(resultadoJson);
		return resultado;
	}
	findAll() {
		let resultado = this.findAllObj();
		return resultado;
	}
	findById(id) {
		let autos = this.findAll();
		return autos.find((auto) => auto.id == id);
	}
	findByMarca(marca) {
		let autos = this.findAll();
		return autos.filter(
			(auto) => auto.marca.toLowerCase() == marca.toLowerCase()
		);
	}
	save() {
		let resultado = this.findAllObj();
		let objAuto = {
			id: uuid().slice(0, 6),
			marca: this.marca,
			modelo: this.modelo,
			asientos: this.asientos,
		};
		resultado.autos.push(objAuto);
		fs.writeFileSync(
			__dirname + '/data.json',
			JSON.stringify(resultado, null, 4),
			'utf8'
		);
		return objAuto;
	}
	update() {
		let resultado = this.findAllObj();

		let filtrado = resultado.find((auto) => auto.id == this.id);
		if (filtrado) {
			filtrado.marca = this.marca || filtrado.marca;
			filtrado.modelo = this.modelo;
			filtrado.asientos = this.asientos;
			fs.writeFileSync(
				__dirname + '/data.json',
				JSON.stringify(resultado, null, 4),
				'utf8'
			);
			return filtrado;
		} else {
			return { message: `El id ${this.id} no fue encontrado` };
		}
	}
	delete(id) {
		let resultado = this.findAllObj();
		let encontrado = this.findById(id);
		if (encontrado) {
			resultado = resultado.filter((auto) => auto.id !== id);
			fs.writeFileSync(
				__dirname + '/data.json',
				JSON.stringify(resultado, null, 4),
				'utf8'
			);
			return resultado;
		} else {
			return { message: `El id ${this.id} no fue encontrado` };
		}
	}
}

module.exports = { Vehiculo };

/* let auto = new Vehiculo();
// console.log(auto.findAll());
console.log(auto.findById(4));
console.log(auto.findByMarca('peugeot'));

let auto2 = new Vehiculo(1, 'Ferrari', 'F40', 3);
let resultado = auto2.update();
console.log(resultado);
console.log(auto2.findAll()); */
