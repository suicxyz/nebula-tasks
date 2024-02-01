import fs from "fs"
import { v4 } from "uuid"
import type { TFConfig } from "../@types/nebula-tasks.js"
import { TaskForgeConfig } from "./config.js"
import { prettyPrint } from "./print.js"

export class TaskForgeTask {
	private config: TFConfig

	constructor() {
		this.config = new TaskForgeConfig().config
	}

	public listTasks() {
		prettyPrint(this.config.tasks)
	}

	public addTask(name: string) {
		let order = 1
		if (this.config.tasks[this.config.tasks.length - 1] !== undefined)
			order = this.config.tasks[this.config.tasks.length - 1].order + 1

		this.config.tasks.push({ id: v4(), name, order, status: "TODO" })

		fs.writeFileSync(
			new TaskForgeConfig().configpath,
			JSON.stringify(this.config),
		)
	}

	public markAsDoing(tasknum: number) {
		for (let i in this.config.tasks)
			if (this.config.tasks[i].order == tasknum)
				this.config.tasks[i].status = "DOING"

		fs.writeFileSync(
			new TaskForgeConfig().configpath,
			JSON.stringify(this.config),
		)
	}

	public markAsDone(tasknum: number) {
		for (let i in this.config.tasks)
			if (this.config.tasks[i].order == tasknum)
				this.config.tasks.splice(parseInt(i), 1)
		
		for (let i in this.config.tasks)
			this.config.tasks[i].order = parseInt(i) + 1

		fs.writeFileSync(
			new TaskForgeConfig().configpath,
			JSON.stringify(this.config),
		)
	}
}
