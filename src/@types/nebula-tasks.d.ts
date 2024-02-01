export interface INebulaCategory {
	id: string
	name: string
}

export interface INebulaTask {
	id: string
	name: string
	status: "To do" | "Doing" | "Completed"
	order: number
	category: INebulaCategory
}

export interface INebulaConfig {
	username: string
	tasks: Array<INebulaTask>
	categories: Array<INebulaCategory>
}
