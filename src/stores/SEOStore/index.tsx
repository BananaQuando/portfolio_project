import {
	observable, action,
	// action,
	// computed
} from "mobx";
import { ISEOStore, ISEOData } from "./interfaces";

const DEFAULT_SEO_DATA = {
	title: '',
	description: '',
	icon: '',
	breadcrumbs: [],
}

export default class SEOStore implements ISEOStore {

	@observable SEOData = {} as ISEOData;
	
	@action setTitie = (t: string) => {
		this.SEOData.title = t;
	}

	@action setDescription = (d: string) => {
		this.SEOData.description = d;
	}

	@action setBreadcrumbs = (b: {
		title: string,
		link: string,
		isCurrent: boolean
	}[]) => {
		this.SEOData.breadcrumbs = b;
	}

	@action setSEOData = (SEOData: ISEOData) => {

		this.SEOData = { ...DEFAULT_SEO_DATA, ...SEOData };
	}
}