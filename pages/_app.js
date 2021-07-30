import App             from 'next/app';
import Router          from 'next/router'
import Head            from 'next/head';
import NProgress       from 'nprogress';
import React           from 'react'
import Constant        from '@/components//Constant';
import Header          from '@/containers//Header';
import Footer          from '@/containers//Footer';
import BasePanel       from '@/containers//BasePanel';
import LeftPanel       from '@/containers//LeftPanel';
import LeftPanelMobile from '@/containers//LeftPanelMobile';
import { withRouter }  from 'next/router'
import {ConfigProvider, Layout, Menu} from 'antd';
import esEs            from 'antd/lib/locale/es_ES';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

//import 'antd/dist/antd.css';
import '../public/css/index.css';
import '../public/css/responsive.css';
require('format-unicorn');
Router.events.on('routeChangeStart', (url) => {
	NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const { Content, Sider } = Layout;


export function redirectUser(ctx, location) {
	const {res} = ctx;
	res.writeHead(302, { Location: location });
	res.end();
}

class LocalDashboard extends App
{
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


		/*window.onload = (e) => {
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('./sw.js', {useCache: true}).then(function(registration) {
					console.log('Worker registration is successful', registration.scope);
				}, function(err) {
					console.log('Worker registration has failed', err);
				}).catch(function(err) {
					console.log(err);
				});
			} else {
				console.log('Service Worker is not supported by your browser.');
			}
			window.addEventListener('beforeinstallprompt', (e) => {
				console.log(e);
			});
		}*/

	}
	componentDidUpdate(){
	}

	render(){
		let {Component, pageProps, leftPanelProps, headerProps} = this.props;
		let urlPage = Constant.URL_webpage;
		let nombrePage = Constant.getWebName();
		let defaultDescription = nombrePage + " Dashboard.";
		let imageBlog = urlPage + "/images/index/pic01.jpg";
		let lemaPage = "Inicio";

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
				  "url": urlPage + "/images/favicon.png",
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

					<title>{nombrePage + " :: " + lemaPage}</title>

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
					<meta name="theme-color" content="#00132B" />

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
						(pageProps.query !== undefined && pageProps.query.head !== undefined && pageProps.query.head.image !== undefined) ?
							<React.Fragment>
								<meta property="twitter:image:src" content={pageProps.query.head.image} />
								<meta property="og:image" content={pageProps.query.head.image} />
							</React.Fragment>
						:
							<React.Fragment>
								<meta property="twitter:image:src" content={imageBlog}/>
								<meta property="og:image" content={imageBlog}/>
							</React.Fragment>
					}

					{/* Social Media data */}
					<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

				</Head>

				<ConfigProvider locale={esEs}>
					<Layout>
						<LeftPanelMobile {...leftPanelProps} ref={BasePanel.refMobileMenu} />
						<Sider
							breakpoint="lg"
							collapsedWidth="0"
							theme="light"
							width="255"
							style={{
								height: "100vh",
								position: "absolute",
								backgroundColor: "#f0f2f5",
								border: "none"
							}}
							className="sidebar"
						>
							<LeftPanel {...leftPanelProps} />
						</Sider>
						<Layout className="layout-content" style={{backgroundColor: "white"}}>
							<Header empresas={this.props.empresas} pageName={this.props.pageName} {...headerProps} />
							<CustomBreadcrumb ref={BasePanel.refBreadcrumb} />
							<Content style={{padding: "10px 20px"}}>
								<Component {...pageProps}/>
							</Content>
							<Footer />
						</Layout>
					</Layout>
				</ConfigProvider>

			</div>
		);
	}
}

export default withRouter(LocalDashboard);
