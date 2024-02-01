import fs from "fs"
import { join } from "path"
import type { TFConfig, TFTask } from "../@types/nebula-tasks.js"

export class TaskForgeConfig {
	private path: string
	private filename: string
	private user: string
	private tasks: Array<TFTask>

	constructor() {
		this.path = join(process.env.HOME!, ".config/")
		this.filename = "taskforge-config.json"
		this.user = process.env.USER!
		this.tasks = this.getInitialTasks()
	}

	private initConfig() {
		const dir = fs.readdirSync(this.path)
		if (dir.includes(this.filename)) return

		const baseConfig: TFConfig = {
			username: this.user,
			tasks: [],
		}

		fs.writeFileSync(join(this.path, this.filename), JSON.stringify(baseConfig))
	}

	private getInitialTasks() {
		this.initConfig()

		return JSON.parse(
			fs.readFileSync(join(this.path, this.filename)).toString(),
		)
	}

	public get config(): TFConfig {
		return JSON.parse(
			fs.readFileSync(join(this.path, this.filename)).toString(),
		)
	}

	public get configpath(): string {
		return join(this.path, this.filename)
	}

	public get username(): string {
		return this.user
	}
}
