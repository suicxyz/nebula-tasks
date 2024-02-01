import fs from "fs"
import { v4 } from "uuid"
import { INebulaConfig } from "../@types/nebula-tasks"
import { NebulaConfig } from "./config"
import { prettyPrint } from "./print"

export class NebulaTask {
	private config: INebulaConfig
	private configPath: string

	constructor() {
		this.config = new NebulaConfig().config
		this.configPath = new NebulaConfig().configpath
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
			this.configPath,
			JSON.stringify(this.config),
		)
	}

	public markAsDoing(tasknum: number) {
		for (let i in this.config.tasks)
			if (this.config.tasks[i].order == tasknum)
				this.config.tasks[i].status = "DOING"

		fs.writeFileSync(
			this.configPath,
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
			this.configPath,
			JSON.stringify(this.config),
		)
	}
}
