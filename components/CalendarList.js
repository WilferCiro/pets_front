import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';

class CalendarList extends BasePanel{
	constructor(props) {
		super(props);
		this.state = {
			events : []
		}
		this.setEventos = this.setEventos.bind(this);
	}
	componentDidMount() {
	}

	setEventos(events) {
		this.setState({
			events: events
		})
	}

	render() {
		let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return (
			<div className="events-container">
				{
					(this.state.events.length === 0) ?
					<p>No hay eventos en el mes seleccionado</p>
					:
					(this.state.events).map((ev) => {
						let date_desde = new Date(ev.fecha_inicio);
						let date_hasta = new Date(ev.fecha_fin);
						return <div className="event">
							<p>
								{ev.descripcion}<br />
								<label className="fecha">{date_desde.toLocaleDateString("es-CO", options)} hasta {date_hasta.toLocaleDateString("es-CO", options)}</label>
							</p>
						</div>
					})
				}
			</div>
		);
	}
}

export default CalendarList;
