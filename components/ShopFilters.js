/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';


import {
	Collapse,
	Checkbox,
	Tag,
	Drawer,
	Space
} from 'antd';

const { Panel } = Collapse;

class ShopFilters extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.update = this.props.update;

		// States

		// Methods
		this.changeMarca    = this.changeMarca.bind(this);
		this.changeMaterial = this.changeMaterial.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.getData        = this.getData.bind(this);
		this.clearOneFilter = this.clearOneFilter.bind(this);
		this.updateFilters  = this.updateFilters.bind(this);

		// Variables
		let filters = this.props.query;
		this.categoria1  = filters["categoria1"] || null;
		this.categoria2  = filters["categoria2"] || null;
		this.categoria3  = filters["categoria3"] || null;
		this.materiales  = filters["materiales"] || null;
		this.marcas      = filters["marcas"] || null;
		this.query       = filters["query"] || null;
	}
	componentDidMount() {
	}

	componentDidUpdate() {
		let filters = this.props.query;
		this.categoria1  = filters["categoria1"] || null;
		this.categoria2  = filters["categoria2"] || null;
		this.categoria3  = filters["categoria3"] || null;
		this.materiales  = filters["materiales"] || null;
		this.marcas      = filters["marcas"] || null;
		this.query       = filters["query"] || null;
	}

	getData() {
		return {
			"categoria1": this.categoria1,
			"categoria2": this.categoria2,
			"categoria3": this.categoria3,
			"materiales": this.materiales,
			"marcas": this.marcas,
			"query" : this.query
		}
	}

	changeMarca(checkedValues) {
		this.marcas = "";
		for(let index in checkedValues) {
			this.marcas += checkedValues[index] + ","
		}
		this.updateFilters();
	}
	changeMaterial(checkedValues) {
		this.materiales = "";
		for(let index in checkedValues) {
			this.materiales += checkedValues[index] + ","
		}
		this.updateFilters();
	}
	changeCategory(type, value) {
		this.categoria1 = null;
		this.categoria2 = null;
		this.categoria3 = null;
		if(type === "1") {
			this.categoria1 = value;
		}
		if(type === "2") {
			this.categoria2 = value;
		}
		if(type === "3") {
			this.categoria3 = value;
		}
		this.updateFilters();
	}


	clearOneFilter(data) {
		let pk = data["pk"];
		if(data["type"] === "material") {
			let newMaterials = "";
			this.materiales.split(",").map((item, index) => {
				if (item + "" !== pk + "" && item !== "") {
					newMaterials += item + ",";
				}
			});
			this.materiales = newMaterials;
		}
		if(data["type"] === "marca") {
			let newMarcas = "";
			this.marcas.split(",").map((item, index) => {
				if (item + "" !== pk + "" && item !== "") {
					newMarcas += item + ",";
				}
			});
			this.marcas = newMarcas;
		}
		if(data["type"] === "query") {
			this.query = null;
		}
		if(data["type"] === "categoria3") {
			this.categoria3 = null;
		}
		if(data["type"] === "categoria2") {
			this.categoria2 = null;
		}
		if(data["type"] === "categoria1") {
			this.categoria1 = null;
		}

		this.updateFilters();
	}

	updateFilters() {
		this.update(this.getData());
	}


	render() {
		let query = this.props.query;
		let inMateriales = this.props.filters["materiales"] || [];
		let inMarcas = this.props.filters["marcas"] || [];
		let categorias1 = this.props.filters["categorias1"] || [];
		let categorias2 = this.props.filters["categorias2"] || [];
		let categorias3 = this.props.filters["categorias3"] || [];
		let materiales = [];
		let marcas = [];
		let marcasChecked = [];
		let materialesChecked = [];
		let allFilters = [];

		if(query.query) {
			allFilters.push({
				"type" : "query",
				"text" : query.query
			})
		}

		if(query["marcas"]) {
			let splitMarca = query["marcas"].split(",");
			for(let index in splitMarca) {
				if(splitMarca[index] !== "") {
					marcasChecked.push(parseInt(splitMarca[index]));
				}
			}
		}
		if(query["materiales"]) {
			let splitMaterial = query["materiales"].split(",");
			for(let index in splitMaterial) {
				if(splitMaterial[index] !== "") {
					materialesChecked.push(parseInt(splitMaterial[index]));
				}
			}
		}

		inMateriales.map((item, index) => {
			materiales.push({
				"label" : item["nombre"],
				"value" : item["pk"]
			});
			if (materialesChecked.includes(item["pk"])){
				allFilters.push({
					"type" : "material",
					"pk" : item["pk"],
					"text" : item["nombre"]
				});
			}
			return null;
		});
		inMarcas.map((item, index) => {
			marcas.push({
				"label" : item["nombre"],
				"value" : item["pk"]
			})
			if (marcasChecked.includes(item["pk"])){
				allFilters.push({
					"type" : "marca",
					"pk" : item["pk"],
					"text" : item["nombre"]
				});
			}
			return null;
		});

		return (
			<div>
				<h4>Filtros</h4>
				<Collapse defaultActiveKey={['1', '2', '3', '4']} expandIconPosition="right">
					{
						(allFilters.length > 0) ?
						<Panel header="Seleccionados" key="1">
							{
								allFilters.map((filter, index) => {
									return (
										<Tag key={Math.random()} closable onClose={(e) => {this.clearOneFilter(filter)}} color="purple">
											{filter["text"]}
										</Tag>
									)
								})
							}
						</Panel>
						:
						null
					}
					<Panel header="Categorías" key="2">
						<Space direction="vertical">
							{
								(categorias1).map((item, index) => {
									return <a key={Math.random()} onClick={(e) => this.changeCategory("1", item["pk"])}>{item["nombre"]}</a>
								})
							}
							{
								(categorias2).map((item, index) => {
									return <a key={Math.random()} onClick={(e) => this.changeCategory("2", item["pk"])}>{item["nombre"]}</a>
								})
							}
							{
								(categorias3).map((item, index) => {
									return <a key={Math.random()} onClick={(e) => this.changeCategory("3", item["pk"])}>{item["nombre"]}</a>
								})
							}
						</Space>
					</Panel>
					{
						(marcas.length > 0) ?
							<Panel header="Marca" key="3">
								<Checkbox.Group options={marcas} value={marcasChecked} onChange={this.changeMarca} />
							</Panel>
						:
						null
					}
					{
						(materiales.length > 0) ?
							<Panel header="Materiales" key="4">
								<Checkbox.Group options={materiales} value={materialesChecked} onChange={this.changeMaterial} />
							</Panel>
						:
						null
					}
				</Collapse>
			</div>
		);
	}
}

export default ShopFilters;
