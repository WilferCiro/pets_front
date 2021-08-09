/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// NextJS libraries
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="es">
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Lato&display=optional"
						rel="stylesheet"
						/>
						<script
							dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','GTM-N6D478S');`,
							}}
						/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6D478S" height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe></noscript>
				</body>
			</Html>
		)
	}
}

export default MyDocument
