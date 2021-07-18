import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import {FiEdit2, FiTrash2, FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight, FiPlusCircle}           from "react-icons/fi";
import FormInputText  from '@/formcomponents/FormInputText';

class Table extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			data : [],
			paginador : {"total": 0,"pages": 1,"current": 1}
		}

		this.options = this.props.options ? this.props.options : {};

		this.canAdd = this.options["add"] ? this.options["add"] : false;
		this.canEdit = this.options["edit"] ? this.options["edit"] : false;
		this.canDelete = this.options["delete"] ? this.options["delete"] : false;
		//this.canAdd = this.options["add"] ? this.options["add"] : false;

		this.cuttentPage = 1;
		this.pageSize = 10;

		this.header = this.props.fields ? this.props.fields : [];
		this.bodyLoad = this.props.bodyLoad ? this.props.bodyLoad : {};

		this.refSearchInput = React.createRef();

		// Methods
		this.successGetDataService = this.successGetDataService.bind(this);
		this.getDataService = this.getDataService.bind(this);
		this.goTo = this.goTo.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}

	componentDidMount() {
		this.getDataService();
	}

	getDataService(filter = null) {
		let body = Object.assign({}, this.bodyLoad);
		body["cantidad"] = this.pageSize;
		body["pagina"] = this.cuttentPage;
		let conditions = body["campos"] ? body["campos"] : {};
		conditions["activo-en"] = [false, true];
		if(filter && filter !== "") {
			conditions["nombre-contiene"] = filter;
		}
		body["campos"] = conditions;

		this.send({
			endpoint: this.props.serviceLoad,
			method: 'GET',
			success: this.successGetDataService,
			body: body,
			page: this.cuttentPage,
			showMessage : true
		});
	}

	successGetDataService(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
			this.setState({
				data: data["data"],
				paginador: data["paginator"]
			});
		}
	}

	goTo(page) {
		this.cuttentPage = page;
		this.getDataService();
	}

	onSearch() {
		this.cuttentPage = 1;
		this.getDataService(this.refSearchInput.current.getValue());
	}

	render() {
		return (
			<div>
				<div className="table-actions">
					{
						this.canAdd ?
						<button className="btn-table btn-add"><FiPlusCircle /> Agregar</button>
						:
						null
					}
					<FormInputText
						label="Buscar..."
						placeholder="Buscar en la tabla..."
						id="buscar_table"
						onEnter={this.onSearch}
						ref={this.refSearchInput}
					/>
				</div>
				<div className="table-container">
					<table className="table" border="1">
						<thead>
							<tr>
								{
									(this.header).map((item, index) => {
										return <th key={Math.random()}>{item.label}</th>
									})
								}
								{
									(this.canEdit || this.canDelete) ?
										<th>Acciones</th>
									:
									null
								}
							</tr>
						</thead>
						<tbody>
							{
								this.state.data.map((item, index) => {
									return <tr key={Math.random()}>
										{
											(this.header).map((itemHeader, indexHeader) => {
												return <td key={Math.random()}>
													{itemHeader.type === "image" && Array.isArray(item[itemHeader.id]) && item[itemHeader.id][0]
													?
														<img className="image-table" src={item[itemHeader.id][0]["foto"]} />
													:
														itemHeader.type === "image" && !Array.isArray(item[itemHeader.id]) && item[itemHeader.id]
														?
															<img className="image-table" src={item[itemHeader.id]} />
														:
													 	item[itemHeader.id] ? item[itemHeader.id].toString() : ""}
												</td>
											})
										}
										{
											(this.canEdit || this.canDelete) ?
												<td>
												{
													this.canEdit ? <button className="btn-table btn-edit"><FiEdit2 /></button> : null
												}
												{
													this.canDelete ? <button className="btn-table btn-delete"><FiTrash2 /></button> : null
												}
												</td>
											:
											null
										}
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
				{this.state.paginador.total} Filas - Página {this.state.paginador.current} de {this.state.paginador.pages}

				<div className="table-paginator">
					<ul className="paginador">
						{
							(this.state.paginador.current > 1) ?
								<React.Fragment>
									<li onClick={(e) => this.goTo(1)}><FiChevronsLeft /></li>
									<li onClick={(e) => this.goTo(this.state.paginador.current - 1)}><FiChevronLeft /></li>
								</React.Fragment>
							:
							null
						}
						{
							(Array.from(Array(this.state.paginador.pages).keys())).map((item, index) => {
								return <li className={this.state.paginador.current === item+1 ? "paginador-selected" : ""} key={Math.random()} onClick={(e) => this.goTo(item + 1)}>{item + 1}</li>
							})
						}
						{
							(this.state.paginador.current + 1 <= this.state.paginador.pages) ?
								<React.Fragment>
									<li onClick={(e) => this.goTo(this.state.paginador.current + 1)}><FiChevronRight /></li>
									<li onClick={(e) => this.goTo(this.state.paginador.pages)}><FiChevronsRight /></li>
								</React.Fragment>
							:
							null
						}
					</ul>
				</div>
				<div className="clear-both" />
			</div>
		);
	}
}

export default Table;
