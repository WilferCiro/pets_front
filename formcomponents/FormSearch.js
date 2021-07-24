/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import { Input } from 'antd';
const { Search } = Input;

class FormSearch extends BaseFormComponent{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="input-text">
			</div>
		);
	}
}

export default FormSearch;
