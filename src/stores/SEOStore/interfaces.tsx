export interface ISEOStore {
	SEOData: ISEOData
	setTitie: Function,
	setBreadcrumbs: Function,
	setSEOData: Function
}

export interface ISEOData {
	title: string
	icon: string
	description: string
	breadcrumbs: {
		title: string
		link: string
		isCurrent: boolean
	}[]
}