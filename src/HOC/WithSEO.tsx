import React from 'react';
import { Helmet } from 'react-helmet';

export interface SEOProps {
	
}

type Optionalize<T extends K, K> = Omit<T, keyof K>;

function withSEO<T extends SEOProps = SEOProps>(WrappedComponent: React.ComponentType<T>) {

	return class ComponentWithSEO extends React.Component<Optionalize<T, SEOProps>> {
	
		public render() {
			// @ts-ignore
			console.log(this.props.seo)
			// const seoData = [];
			// // @ts-ignore
			// if (this.props.seo !== undefined){
			// 	// @ts-ignore
			// 	const { title } = this.props.seo
			// 	seoData.push(title ? <Helmet key={1}> <title>{ title }</title> </Helmet> : <Helmet> <title>Default title</title> </Helmet>)
			// }

			return <>

				{/* { seoData } */}

				<WrappedComponent  {...(this.props as T)} />
			</>
			
		}
	};
}

export default withSEO;