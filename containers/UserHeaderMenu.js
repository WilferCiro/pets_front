
import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import Image          from 'next/image';
import KiwiModal      from '@/components/KiwiModal';
import FormInputText  from '@/formcomponents/FormInputText';
import FormPassword    from '@/formcomponents//FormPassword';

class UserHeaderMenu extends BasePanel{
	constructor(props) {
		super(props);

		this.refModal = React.createRef();
		this.refEmail = React.createRef();
		this.refPassword = React.createRef();
	}
	componentDidMount() {
	}


	render() {
		return (
			<div>
				<div className="header-item">
					<div className="header-item-img"  onClick={(e) => {this.refModal.current.open()}}>
						<Image
							src={this.constants.img_user_white}
							alt={"Caja"}
							width={40}
							height={40}
							layout={"fixed"}
							/>
					</div>
					<div className="header-item-text">
						Usuario
					</div>
				</div>

				<KiwiModal title="Iniciar sesión" ref={this.refModal}>
					<FormInputText
						placeholder="Correo electrónico"
						label="Correo electrónico"
						id="login_email"
						ref={this.refEmail}
						/><br />
					<FormPassword
						placeholder="Contraseña"
						label="Contraseña"
						id="login_pasword"
						ref={this.refPassword}
						/><br />
					<a onClick={(e) => this.redirectPage(this.constants.route_recover, this.constants.route_recover_alias)}>¿Olvidaste tu contraseña?</a><br />
					<button>Iniciar sesión</button>
					<br />
					ó<br />
					<button>Ingresar con facebook</button><br />
					<button>Ingresar con gmail</button><br />
					<a onClick={(e) => this.redirectPage(this.constants.route_register, this.constants.route_register_alias)}>Regístrate</a>
				</KiwiModal>
			</div>
		);
	}
}

export default UserHeaderMenu;
