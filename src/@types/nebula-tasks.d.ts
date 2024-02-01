export type TFTask = {
	id: string
	name: string
	status: "TODO" | "DOING" | "DONE"
	order: number
}

export type TFConfig = {
	username: string
	tasks: Array<TFTask>
}
