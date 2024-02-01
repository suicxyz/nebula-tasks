import fs from "fs"
import { join } from "path"
import { INebulaConfig, INebulaTask } from "../@types/nebula-tasks"

export class NebulaConfig {
	private path: string
	private filename: string
	private user: string
	private tasks: Array<INebulaTask>

	constructor() {
		this.path = join(process.env.HOME!, ".config/")
		this.filename = "nebula-tasks.config.json"
		this.user = process.env.USER!
		this.tasks = this.getInitialTasks()
	}

	private initConfig() {
		const dir = fs.readdirSync(this.path)
		if (dir.includes(this.filename)) return

		const baseConfig: INebulaConfig = {
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

	public get config(): INebulaConfig {
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
