#!/usr/bin/env node

import { Command } from "commander"
import { NebulaTask } from "./helpers/task"

const program = new Command()

program
	.command("add <task>")
	.action((task: string) => {
		const TFT = new NebulaTask()
		TFT.addTask(task)
	})
	.description("Add a new task.")

program
	.command("list")
	.action(() => new NebulaTask().listTasks())
	.description("List all tasks.")

program
	.command("doing <tasknumber>")
	.action((tasknum: number) => new NebulaTask().markAsDoing(tasknum))

program
	.command("done <tasknumber>")
	.action((tasknum: number) => new NebulaTask().markAsDone(tasknum))

program.parse(process.argv)
