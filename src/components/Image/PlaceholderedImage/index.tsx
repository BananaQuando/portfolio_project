import React from 'react';

import './styles.sass';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface Props{
	src: string
	placeholder: string
	alt?: string
	className?: string
	id?: string
}


@observer
class PlaceholderedImage extends React.Component <Props>{

	@observable id = '';

	componentDidMount(){

		const date = new Date();
		this.id = `placeholdered_image-${date.getTime() + Math.round(Math.random() * 10000)}`
	}

	getPlaceholderImage = (placeholder: string | undefined, alt: string = 'placeholder', className: string = '') => {

		if (!placeholder) return '';

		const matchData = placeholder.match(/_(\d+)x(\d+)\.(\D+)$/);

		const width = matchData![1];
		const height = matchData![2];

		return <img src={placeholder} style={{width: `${width}px`, height: `${height}px`}} onLoad={this.startLoad} className={`placeholder-image ${className}`} alt={alt} />
	}

	startLoad = () => {

		const image = document.querySelector(`#${this.id} .loading-image`);
		const src =  image!.getAttribute('data-src');
		image!.setAttribute('src', src ? src : '');
		image!.removeAttribute('data-src');
	}

	endLoad = () => {

		document.querySelector(`#${this.id}`)!.classList.add('image-loaded');
	}

	render() {

		const {
			src,
			placeholder,
			alt,
			className,
			id
		} = this.props;

		return (
			<div className='placeholdered-image' id={this.id}>
				<img data-src={src} alt={alt} onLoad={this.endLoad} className={`loading-image ${className ? className : ''}`} id={id} />
				{ this.getPlaceholderImage(placeholder, alt, className) }
			</div>
		)
	}
}

export default PlaceholderedImage;