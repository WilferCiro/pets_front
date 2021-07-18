import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import ImageLocal     from '@/components//ImageLocal';

class Footer extends BasePanel{
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let isOnline = navigator.onLine;
		console.log(isOnline);
	}

	render() {
		return (
			<footer>
				<div className="footer-divisor">
					<div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
