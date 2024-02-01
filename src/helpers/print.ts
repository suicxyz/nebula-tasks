import { TaskForgeConfig } from "./config.js"

export const prettyPrint = (
	tasks: Array<{
		order: number
		name: string
		status: "TODO" | "DOING" | "DONE"
	}>,
) => {
	let text = `Hello, ${new TaskForgeConfig().username}, your tasks:\n`

	for (const i of tasks) {
		const order = `0${i.order}`.slice(-2)
		text += `${order} : ${i.status}\t${i.name}\n`
	}

	console.log(text)
}
