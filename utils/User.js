import Store from '@/utils/Store';

class User {
	static instance = null;

	constructor(){
		if (User.instance!==null){
			return User.instance;
		}
		User.instance = this;

	}

	setName(name) {
		Store.saveData("full_name", name);
	}
	getName(ctx=null) {
		return Store.readValue("full_name", ctx);
	}

	setAvatar(data) {
		Store.saveData("avatar", data);
	}
	getAvatar(ctx=null) {
		return Store.readValue("avatar", ctx);
	}

	setMascotasPk(data){
		Store.saveData("cantidad_mascotas", data === "" || data === " " ? 0 : data.split(",").length);
		Store.saveData("mascotas", data);
	}
	getMascotasPk(ctx=null) {
		return Store.readValue("mascotas", ctx);
	}
	getCantidadMascotas(ctx=null) {
		return Store.readValue("cantidad_mascotas", ctx) || 0;
	}
	addMascotaPk(data, ctx=null) {
		let newPKs = [data];
		let pksStr = this.getMascotasPk(ctx).split(",");
		pksStr.map((item, index) => {
			if(item !== "" && item !== null && item !== undefined) {
				newPKs.push(item);
			}
		});
		this.setMascotasPk(newPKs.join(","));
	}

	setNroPedidos(data) {
		Store.saveData("cantidad_pedidos", data);
	}
	getNroPedidos(ctx=null) {
		return Store.readValue("cantidad_pedidos", ctx) || 0;
	}
	updateNroPedidos(ctx=null){
		let cantidad = parseInt(this.getNroPedidos(ctx)) + 1;
		this.setNroPedidos(cantidad + "")
	}

}

export default new User();
