import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import Image from 'next/image'
import {BsSearch} from 'react-icons/bs';

class KiwiSearch extends BasePanel{
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
	}
	componentDidMount() {
	}

	search() {

	}

	render() {
		return (
			<div className="search-container">
				<input type="text" name="search" placeholder="Buscar en la página" className="search-input" />
				<button className="search-button" onClick={(e) => this.search()}>
					<BsSearch />
				</button>
			</div>
		);
	}
}

export default KiwiSearch;
