#!/usr/bin/env node

import { Command } from "commander"
import { TaskForgeTask } from "./helpers/task.js"

const program = new Command()

program
	.command("add <task>")
	.action((task: string) => {
		const TFT = new TaskForgeTask()
		TFT.addTask(task)
	})
	.description("Add a new task.")

program
	.command("list")
	.action(() => new TaskForgeTask().listTasks())
	.description("List all tasks.")

program
	.command("doing <tasknumber>")
	.action((tasknum: number) => new TaskForgeTask().markAsDoing(tasknum))

program
	.command("done <tasknumber>")
	.action((tasknum: number) => new TaskForgeTask().markAsDone(tasknum))

program.parse(process.argv)
