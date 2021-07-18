import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import ImageLocal     from '@/components//ImageLocal';

import Table          from '@/components//Table';
import {FiEdit, FiNavigation, FiFolder, FiPlusCircle}       from 'react-icons/fi';
import FormInputText  from '@/formcomponents/FormInputText';

class ResultView extends BasePanel{
	constructor(props) {
		super(props);

		this.searchProductos = this.searchProductos.bind(this);
		this.successSearchProductos = this.successSearchProductos.bind(this);

		this.onSearch = this.onSearch.bind(this);
		this.refSearch = React.createRef();
		this.state = {
			productos : null
		}
		this.empresa = null;
	}

	componentDidMount() {
		this.searchProductos(1);
	}

	searchProductos(page, data = null) {
		let body = {
			"cantidad" : 10,
			"pagina" : page,
			"modelo" : "tabla"
		}
		body["campos"] = {
			"empresa__pk" : this.store.getEmpresa() !== "undefined" ? this.store.getEmpresa() : 0
		}
		if (data) {
			body["campos"]["nombre-contiene"] = data;
		}
		this.send({
			endpoint: Constant.getPublicEndpoint() + "producto",
			method: 'GET',
			success: this.successSearchProductos,
			body: body,
			page: this.cuttentPage,
			showMessage : true
		});
	}

	successSearchProductos(data) {
		if(data["estado_p"] === 200) {
			this.setState({
				productos: data["data"]
			});
		}
		else{
			this.setState({
				productos: []
			});
		}
	}

	onSearch() {
		let value = this.refSearch.current.getValue();
		this.searchProductos(1, value);
	}

	render() {
		if (!this.state.productos) {
			return (
				<div>Cargando...</div>
			);
		}

		if(this.state.productos.length === 0) {
			return (
				<div>No hay resultados</div>
			);
		}

		return (
			<div>
				<div className="table-actions">
					<button className="btn-table btn-add"> Agregar</button>
					<FormInputText
						ref={this.refSearch}
						onEnter={(e) => this.onSearch()}
						label="Buscar productos"
						 />
				</div>
				<div className="cards-list">
					{
						this.state.productos.map((producto, index) => {
							return <div key={Math.random()} className="card">
								<div className="card-top-button" data-tooltip="Ver en la página de E-Commerce">
									<FiNavigation />
								</div>
								<div className="card-portada">
								Hola mundo
								</div>
								<div className="card-image">
									<ImageLocal
										image={{"imagen" : producto.fotos.length > 0 ? producto.fotos[0]["foto"] : this.constants.img_logo, "descripcion" : "Logo"}}
										width={100}
										height={100}
										 data-tooltip="Editar foto de perfil"
										/>
								</div>
								<div className="card-title">
									<h3>{producto.nombre}</h3>
									<p>({producto.empresa__nombre})</p>
								</div>
								<div className="card-description">
									<p>
										{producto.precio_iva}
									</p>
								</div>
								<div className="card-actions">
									<div className="card-actions-item" data-tooltip="Editar empresa" onClick={(e) => this.editEmpresa(empresa)}>
										<FiEdit />
									</div>
									<div className="card-actions-item" data-tooltip="Ver productos de esta empresa">
										<FiFolder />
									</div>
									<div className="card-actions-separator">
									</div>
								</div>

							</div>
						})
					}
				</div>

				{/*<Table
					onAdd={(e) => this.add()}
					onEdit={(e) => this.edit()}
					onOptions={(e) => this.options()}
					options={{
						"add" : true,
						"edit" : true,
						"delete" : true,
						"select" : ["fotos", ""]
					}}
					serviceLoad={Constant.getPublicEndpoint() + "producto"}
					bodyLoad={{
						"modelo" : "tabla",
						"cantidad" : 10
					}}
					fields={[
						{"id" : "pk", "label" : "ID"},
						{"id" : "fotos", "label" : "Imagen", "type" : "image"},
						{"id" : "nombre", "label" : "Nombre"},
						{"id" : "precio_iva", "label" : "Precio"},
						{"id" : "activo", "label" : "Activo"},
						{"id" : "marca", "label" : "Marca"}
					]}
				/>*/}
			</div>
		);
	}
}

export default ResultView;
