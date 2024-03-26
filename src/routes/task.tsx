import { LoaderFunctionArgs, useLoaderData, ActionFunctionArgs, redirect } from "react-router-dom";
import TaskType from "src/types/Task";
import Nullable from "src/types/Nullable";
import { getTask } from "../tasks";
import { calcTask, createTask } from "../redux/slices/tasksSlice";
import { updateTask } from "../redux/slices/tasksSlice"
import store from "../store";
import Calculator from "../components/Calculator/Calculator";




export async function action({ request, params }: ActionFunctionArgs<any>) {
	const tasks = store.getState().tasksReducer;
	const task = getTask(tasks, params.taskId);
	let formData = await request.formData();

	for (let i of formData) {

		let oper = i[1];
		console.log(i[1]);
		if (oper === "equals") {
			return store.dispatch(calcTask(params.taskId!));
		}

		if (task?.num1 === undefined || task?.oper === undefined || task?.num2 === undefined || task?.res === undefined) {
			store.dispatch(updateTask({
				id: params.taskId,
				num1: undefined,
				oper: undefined,
				num2: undefined,
				res: undefined
			}));
			return redirect(``);
		}

		store.dispatch(createTask());

		return redirect(`/${tasks[0]!.id}`);
	}



	return store.dispatch(updateTask({
		id: params.taskId,
		// isDone: formData.get("isDone") === "true",
	}
	));
}

export function loader({ params }: LoaderFunctionArgs): { task: Nullable<TaskType> } {
	const tasks = store.getState().tasksReducer;
	const task = getTask(tasks, params.taskId);
	if (!task) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return { task };
}

const Contact = () => {
	const { task } = useLoaderData() as { task: Nullable<TaskType> };

	return (
		<Calculator task={task!}></Calculator>
	);
}

export default Contact;





{/* <button
name="isDone"
value={isDone ? "false" : "true"}
aria-label={
	isDone
		? "Remove from isDones"
		: "Add to isDones"
}
>
{isDone ? "Done" : "Undone"}
</button> */}