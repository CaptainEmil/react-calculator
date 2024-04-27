import sortBy from "sort-by";
import TaskType from "./types/Task";
import Nullable from "./types/Nullable";
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import BigDecimal from "./BigDecimal";
import singleOpers from "./options/singleOpers";


export const getTasks = (): TaskType[] => {
	const tasksStr = localStorage.getItem('tasks');
	let tasks = tasksStr === null ? [] : JSON.parse(tasksStr, (key, value) => {
		if ((key === "num1" || key === "num2" || key === "res") && typeof value === "string") {
			return new BigDecimal(value);
		}
		return value;
	}) as TaskType[];

	return tasks.sort(sortBy("-createdAt"));
}

export const getTask = (tasks: TaskType[], id?: string): Nullable<TaskType> => {
	let task = tasks.find(task => task.id === id);

	return task ?? null;
}

export const createTask: CaseReducer<TaskType[]> = (state): TaskType[] => {
	let id = Math.random().toString(36).substring(2, 9);
	let task = { id, createdAt: Date.now(), isDone: false };
	let tasks = state;

	tasks.unshift(task);

	set(tasks);

	return tasks;
}

export const calcTask: CaseReducer<TaskType[], PayloadAction<string>> = (state, action): TaskType[] => {

	let tasks: TaskType[] = state;

	let task = tasks.find(task => task.id === action.payload);

	if (!task) throw new Error("No task found for", { cause: action.payload });

	if (task.num1 === undefined || task.oper === undefined || (task.num2 === undefined && !singleOpers.includes(task.oper))) return tasks;

	let res: BigDecimal;

	switch (task.calcOper) {
		case "+":
			res = BigDecimal.sum(task.num1, task.num2!);
			break;
		case "-":
			res = BigDecimal.diff(task.num1, task.num2!);
			break;
		case "*":
			res = BigDecimal.prod(task.num1, task.num2!);
			break;
		case "/":
			res = BigDecimal.div(task.num1, task.num2!);
			break;
		case "nthPower":
			res = BigDecimal.pow(task.num1, task.num2!);
			break;
		case "nthRoot":
			res = BigDecimal.nthRoot(task.num1, task.num2!.num1);
			break;
		case "sin":
			res = BigDecimal.sin(task.num1);
			break;
		case "cos":
			res = BigDecimal.cos(task.num1);
			break;
		case "tan":
			res = BigDecimal.tan(task.num1);
			break;
		case "log":
			res = BigDecimal.log(task.num1);
			break;
		case "fac":
			res = BigDecimal.fac(task.num1);
			break;
		case "ln":
			res = BigDecimal.fac(task.num1);
			break;
		case "sqrt":
			res = BigDecimal.nthRoot(task.num1);
			break;
		case "square":
			res = BigDecimal.pow(task.num1, new BigDecimal("2"));
			break;
		case "powerOf10":
			res = BigDecimal.pow(new BigDecimal("10"), task.num1);
			break;
		case "powerOfE":
			res = BigDecimal.pow(BigDecimal.E(), task.num1);
			break;
		default:
			throw new Error("No such operation:", { cause: task.calcOper });
	}

	Object.assign(task, { res });

	set(tasks);

	return tasks;
}


export const updateTask: CaseReducer<TaskType[], PayloadAction<TaskType>> = (state, action): TaskType[] => {

	let tasks: TaskType[] = state;

	let task = tasks.find(task => task.id === action.payload.id);

	if (!task) throw new Error("No task found for", { cause: action.payload.id });
	delete action.payload.id;

	Object.assign(task, action.payload);

	set(tasks);

	return tasks;
}

export const deleteTask: CaseReducer<TaskType[], PayloadAction<string>> = (state, action): TaskType[] => {
	let tasks: TaskType[] = state;
	let index = tasks.findIndex(task => task.id === action.payload);

	if (index > -1) {
		tasks.splice(index, 1);
		set(tasks);
	}

	return tasks;
}

export const set = (tasks: TaskType[]) => {
	localStorage.setItem("tasks", JSON.stringify(tasks, (key, value) => (key === "num1" || key === "num2" || key === "res") && typeof value === "object" ? value.toString() : value))
}