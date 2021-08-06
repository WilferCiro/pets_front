import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

// Form Components

class CondicionesView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Condiciones de servicio"}])
	}

	render() {

		return (
			<div className="page-center texto-page-justify">
				<h3>Política de privacidad</h3>

				<p>El presente Política de Privacidad establece los términos en que KiwiPeluditos usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p>

				<h3>Información que es recogida</h3>
				<p>Nuestro sitio web podrá recoger información personal por ejemplo: Nombre,  información de contacto como  su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.</p>

				<h3>Uso de la información recogida</h3>
				<p>Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios.  Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.</p>
				<p>KiwiPeluditos está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</p>

				<h3>Cookies</h3>
				<p>Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras atletico de madrid noticias recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.</p>
				<p>Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.</p>

				<h3>Enlaces a Terceros</h3>
				<p>Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.</p>

				<h3>Acciones prohibidas</h3>
				<p>Nuestro sitio web desea la mejor experiencia para todos sus usuarios, por ello se han marcado acciones por parte del usuario que pueden ser meritorias a la cancelación y eliminación de todos sus datos personales:</p>
				<ul>
					<li>Incluir contenido ofensivo en los formularios, tales como descripción de mascota, entre otros.</li>
					<li>Incluir contenido no apto para menores de edad en las fotografías de las mascotas, así como el perfil de usuario.</li>
					<li>Realizar intentos de spam o hackeos a nuestra página web.</li>
					<li>Usar de forma no autorizada nuestra web.</li>
					<li>Amenzar, intimidar o chantagear a las personas que utilizan la página web, este comportamiento será reportado ante los entes de judicialización correspondientes.</li>
				</ul>

				<h3>Sobre las compras</h3>
				<p>Los precios y disponibilidad de nuestros productos pueden variar dependiendo de la demanda o condiciones de escasez de materia prima. Al realizar una compra se realizan comprobaciones de precios y descuentos, si los datos suministrados por el usuario no coinciden, se procede a cancelar el pedido.</p>

				<h3>Control de su información personal</h3>
				<p>En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web.  Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico.  En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.</p>
				<p>Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.</p>
				<p>KiwiPeluditos Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p>
			</div>
		);
	}
}

CondicionesView.getInitialProps = async ({query}) => {
	return {query};
}
CondicionesView.getPageName = () => {
	return "Condiciones de servicio";
}
export default CondicionesView;