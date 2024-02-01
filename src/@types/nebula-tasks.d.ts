export interface INebulaTask {
	id: string
	name: string
	status: "TODO" | "DOING" | "DONE"
	order: number
}

export interface INebulaConfig {
	username: string
	tasks: Array<TFTask>
}
