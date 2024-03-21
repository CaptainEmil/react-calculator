import { LoaderFunctionArgs, useLoaderData, ActionFunctionArgs } from "react-router-dom";
import TaskType from "src/types/Task";
import Nullable from "src/types/Nullable";
import { getTask } from "../tasks";
import { updateTask } from "../redux/slices/tasksSlice"
import store from "../store";




export async function action({ request, params }: ActionFunctionArgs<any>) {
	let formData = await request.formData();
	return store.dispatch(updateTask({
		id: params.taskId,
		isDone: formData.get("isDone") === "true",
	}
	));
}

export function loader({ params }: LoaderFunctionArgs): { task: Nullable<TaskType> } {
	const tasks = store.getState().tasksReducer;
	const task = getTask(tasks,params.taskId);
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
		<div id="task">

			<div>
				<h1>
					{task?.name ? (
						<>
							{task?.name}
						</>
					) : (
						<i>No Name</i>
					)}
					{" "}

				</h1>

				{task?.description && <p>{task?.description}</p>}

			</div>
		</div>
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