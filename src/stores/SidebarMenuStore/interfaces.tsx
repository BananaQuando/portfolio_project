export interface ISidebarMenuStore {
	getMenu: Function
}

export type TmenuItemType = "menu_container" | "menu_parent" | "menu_link";

export type TmenuItemLevel = 1 | 2 | 3;

export interface ISidebarMenuItem {
	id: number
	type: TmenuItemType
	title: string
	level: TmenuItemLevel
	link: string | null
	icon: string | null
	children: ISidebarMenuItem[] | null
}

export interface ISidebarMenuList {
	list: ISidebarMenuItem[]
}