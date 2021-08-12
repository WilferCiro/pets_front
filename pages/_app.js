/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Classes
import React           from 'react'
import { withRouter }  from 'next/router'

// Next classes
import App             from 'next/app';
import Router          from 'next/router'
import Head            from 'next/head';

// Custom classes
import Constant        from '@/components//Constant';
import Header          from '@/containers//Header';
import Footer          from '@/containers//Footer';
import BasePanel       from '@/containers//BasePanel';
import LeftPanel       from '@/containers//LeftPanel';
import LeftPanelMobile from '@/containers//LeftPanelMobile';
import Login           from '@/containers/Login';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

// Ant classes
import {
	ConfigProvider,
	Layout,
	Menu
} from 'antd';
import esEs            from 'antd/lib/locale/es_ES';
const { Content, Sider } = Layout;

// Third part
import NProgress       from 'nprogress';
//import { LiveChatLoaderProvider, Messenger } from 'react-live-chat-loader'

// Styles
import '../public/css/index.css';
import '../public/css/responsive.css';
require('format-unicorn');

// NProgress config
Router.events.on('routeChangeStart', (url) => {
	NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())



export function redirectUser(ctx, location) {
	const {res} = ctx;
	res.writeHead(302, { Location: location });
	res.end();
}

// My App

class LocalDashboard extends App{
	static async getInitialProps({Component,router, ctx, asPath, req}) {

		let isServer = !!req;
		let isBrowser = !req;

		let pageProps = {};
		let leftPanelProps = {};
		let headerProps = {}
		let urls_servidores = [];
		let redirect = true;
		let isLogged = true;
		let pageName = "";

		isLogged = BasePanel.store.isLogged(ctx);//BasePanel.user.isLoggedServer(ctx) || BasePanel.user.isLogged();
		//isLogged = BasePanel.store.isLoggedServer(ctx) || BasePanel.store.isLogged();
		//console.log(!process.browser, router.route);
		if(!process.browser){
			if(!isLogged){
				if (router.route === "/mascotas" || router.route === "/pay"){
					redirect = false;
					redirectUser(ctx, "/login");
				}
			}
			else{
				if(router.route === "/login"){
					redirect = false;
					redirectUser(ctx, "/");
				}
			}
		}
		leftPanelProps = await LeftPanel.getInitialProps(ctx);
		headerProps = await Header.getInitialProps(ctx);
		if(redirect && Component.getInitialProps){
			pageProps = await Component.getInitialProps(ctx);
		}
		pageName = Component.getPageName ? Component.getPageName() : "";

		return {pageProps, leftPanelProps, pageName, headerProps};
	}

	componentDidMount() {
		Router.events.on('routeChangeComplete', () => {
			if(typeof window !== "undefined"){
				window.scroll({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			}
		});

	}

	render(){
		let {Component, pageProps, leftPanelProps, headerProps} = this.props;
		let urlPage = Constant.getUrlFront();
		let nombrePage = Constant.getWebName();
		let defaultDescription = "Bienvenidos a esta gran aventura llamada KiwiPeluditos";
		let imageDefault = "/favicon.png";
		let lemaPage = "kiwipeluditos";

		const structuredData = {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "WebSite",
					"@id": urlPage + "#website",
					"url": urlPage,
					"name": nombrePage,
					"description": defaultDescription,
					"inLanguage": "es-CO"
				},
				{
					"@type": "ImageObject",
					"@id": urlPage + "#primaryimage",
					"inLanguage": "es-CO",
					"url": urlPage + "/app-icon-512x512",
					"width": 512,
					"height": 512
				},
				{
					"@type": "WebPage",
					"@id": urlPage + "/#webpage",
					"url": urlPage + "/",
					"name": "Inicio : " + nombrePage,
					"isPartOf": {
						"@id": urlPage + "#website"
					},
					"primaryImageOfPage": {
						"@id": urlPage + "#primaryimage"
					},
					"datePublished": "2021-03-29T02:30:36+00:00",
					"dateModified": "2021-03-28T18:57:03+00:00",
					"inLanguage": "es-CO",
					"potentialAction": [
						{
							"@type": "ReadAction",
							"target": [
								urlPage
							]
						}
					]
				}
			]
		}

		return (
			<div className="site">
				<Head>

					{/* Site data */}
					<meta charSet="UTF-8" />
					{
						(pageProps.query !== undefined && pageProps.query !== null && pageProps.query.isAmp === true)?
						null
						:
						<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					}
					<meta name="author" content="Davinci"/>
					<link rel="manifest" href="/manifest.json" />
					<link rel="icon" href="/favicon.png" />
					<link rel="apple-touch-icon" href="/favicon.png" />
					<meta name="theme-color" content="purple" />

					{/* Additional data */}
					<meta httpEquiv="Expires" content="0"/>
					<meta httpEquiv="Last-Modified" content="0"/>
					<meta httpEquiv="Cache-Control" content="no-cache, mustrevalidate"/>
					<meta httpEquiv="Pragma" content="no-cache"/>
					<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

					{/* The Open Graph protocol */}
					<meta property="og:type" content="website"/>
					<meta property="og:locale" content="es_ES"/>
					<meta property="og:url" content={urlPage}/>

					{/* Twitter card tags */}
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content={urlPage} />

					<link rel="canonical" href={urlPage + this.props.router.asPath} />

					{/* Dynamic meta */}
					{
						(pageProps.query !== undefined && pageProps.query.head !== undefined && pageProps.query.head.keywords !== undefined) ?
							<React.Fragment>
								<meta name="keywords" content={pageProps.query.head.keywords}/>
							</React.Fragment>
						:
							<React.Fragment>
								<meta name="keywords" content="Local, comercio, ayuda"/>
							</React.Fragment>
					}

					{
						(pageProps.query !== undefined && pageProps.query.head !== undefined && pageProps.query.head.title !== undefined) ?
							<React.Fragment>
								<meta property="og:title" content={ pageProps.query.head.title + " : " + lemaPage} />
								<meta property="og:site_name" content={ pageProps.query.head.title + " : " + lemaPage} />
								<meta name="twitter:title" content={pageProps.query.head.title + " : " + lemaPage} />
								<meta name="title" content={pageProps.query.head.title + " : " + lemaPage} />
								<title> {pageProps.query.head.title} : {lemaPage}</title>
							</React.Fragment>
						:
							<React.Fragment>
								<meta property="og:title" content={nombrePage + " : " + lemaPage}/>
								<meta property="og:site_name" content={nombrePage + " : " + lemaPage}/>
								<meta name="twitter:title" content={nombrePage + " : " + lemaPage} />
								<meta name="title" content={nombrePage + " : " + lemaPage} />
								<title>{nombrePage + " : " + lemaPage}</title>
							</React.Fragment>
					}
					{
						(pageProps.query !== undefined && pageProps.query.head !== undefined && pageProps.query.head.description !== undefined) ?
							<React.Fragment>
								<meta property="twitter:description" content={pageProps.query.head.description} />
								<meta property="og:description" content={pageProps.query.head.description} />
								<meta name="description" content={pageProps.query.head.description} />
							</React.Fragment>
						:
							<React.Fragment>
								<meta property="twitter:description" content={defaultDescription}/>
								<meta property="og:description" content={defaultDescription}/>
								<meta name="description" content={defaultDescription}/>
							</React.Fragment>
					}
					{
						(pageProps.query !== undefined && pageProps.query.head !== undefined && pageProps.query.head.image) ?
							<React.Fragment>
								<meta property="twitter:image:src" content={pageProps.query.head.image} />
								<meta property="og:image" content={pageProps.query.head.image} />
							</React.Fragment>
						:
							<React.Fragment>
								<meta property="twitter:image:src" content={imageDefault}/>
								<meta property="og:image" content={imageDefault}/>
							</React.Fragment>
					}

					{/* Social Media data */}
					<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
					{
						(pageProps.query && pageProps.query.structuredData) ?
							<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageProps.query.structuredData) }} />
						:
						null
					}

				</Head>



				<ConfigProvider locale={esEs}>
					<Login ref={BasePanel.refLogin} />

					<Layout>
						<LeftPanelMobile {...leftPanelProps} ref={BasePanel.refMobileMenu} />
						<div
							className="sidebar"
						>
							<LeftPanel {...leftPanelProps} />
						</div>
						<Layout className="layout-content" style={{backgroundColor: "white"}}>
							<Header empresas={this.props.empresas} pageName={this.props.pageName} {...headerProps} />
							<CustomBreadcrumb ref={BasePanel.refBreadcrumb} />
							<Content style={{padding: "10px 20px"}}>
								<div className="page-container">
									<Component {...pageProps}/>
								</div>
							</Content>
							<Footer />
						</Layout>
					</Layout>
				</ConfigProvider>

				{/*<LiveChatLoaderProvider
					provider="messenger"
					providerKey="100921802295312"
					appID="1225262257945841"
					color="#800080"
					greetingDialogDisplay={"icon"}
					locale="es_CO">
					<Messenger />
				</LiveChatLoaderProvider>*/}

			</div>
		);
	}
}

export default withRouter(LocalDashboard);
