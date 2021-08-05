import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

// Form Components

class CookiesView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Cookies"}])
	}

	render() {

		return (
			<div className="page-center texto-page-justify">
				<h3>Acerca de las cookies en KiwiPeluditos</h3>
				<p>Una cookie es un pequeño fichero de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página. Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc. El objetivo de la cookie es adaptar el contenido de la web a su perfil y necesidades, sin cookies los servicios ofrecidos por cualquier página se verían mermados notablemente. Si desea consultar más información sobre qué son las cookies, qué almacenan, cómo eliminarlas, desactivarlas, etc., <a href="https://www.isotools.com.co/mas-informacion-sobre-las-cookies/" taget="blank"> le rogamos se dirija a este enlace</a>.</p>
				<h3>Cookies utilizadas en este sitio web</h3>
				<p>Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web con el fin de informarle con la máxima exactitud posible.</p>
				<p>Este sitio web utiliza las siguientes cookies propias:</p>
				<ul>
					<li>Cookies de sesión, para garantizar que los usuarios que utilizan nuestros servicios sean humanos y no aplicaciones automatizadas. De esta forma se combate el spam.</li>
					<li>Cookies de datos de usuario: nombre y cantidad de mascotas y pedidos, para garantizar una correcta visualización de su información en pantalla.</li>
					<li>Cookies de carrito: para conservar los artículos agregados al carrito y guardar.</li>
				</ul>
				<p>Este sitio web utiliza las siguientes cookies de terceros:</p>
				<ul>
					<li>Google Analytics: Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google. Por tanto, el ejercicio de cualquier derecho en este sentido deberá hacerlo comunicando directamente con Google.</li>
					<li>Redes sociales: Cada red social utiliza sus propias cookies para que usted pueda pinchar en botones del tipo Me gusta o Compartir.</li>
				</ul>

				<h3>Notas adicionales</h3>
				<ul>
					<li>Ni esta web ni sus representantes legales se hacen responsables ni del contenido ni de la veracidad de las políticas de privacidad que puedan tener los terceros mencionados en esta política de cookies.</li>
					<li>Los navegadores web son las herramientas encargadas de almacenar las cookies y desde este lugar debe efectuar su derecho a eliminación o desactivación de las mismas. Ni esta web ni sus representantes legales pueden garantizar la correcta o incorrecta manipulación de las cookies por parte de los mencionados navegadores.</li>
					<li>En algunos casos es necesario instalar cookies para que el navegador no olvide su decisión de no aceptación de las mismas.</li>
					<li>En el caso de las cookies de Google Analytics, esta empresa almacena las cookies en servidores ubicados en Estados Unidos y se compromete a no compartirla con terceros, excepto en los casos en los que sea necesario para el funcionamiento del sistema o cuando la ley obligue a tal efecto. Según Google no guarda su dirección IP. Google Inc. es una compañía adherida al Acuerdo de Puerto Seguro que garantiza que todos los datos transferidos serán tratados con un nivel de protección acorde a la normativa europea. Puede consultar información detallada a este respecto <a href="http://safeharbor.export.gov/companyinfo.aspx?id=16626" target="_blank">en este enlace</a>.</li>
					<li>Para cualquier duda o consulta acerca de esta política de cookies no dude en comunicarse con nosotros a través de la sección de ayuda.</li>
				</ul>
			</div>
		);
	}
}

CookiesView.getInitialProps = async ({query}) => {
	return {query};
}
CookiesView.getPageName = () => {
	return "Cookies";
}
export default CookiesView;
