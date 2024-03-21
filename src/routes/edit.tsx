import { Form, useLoaderData, redirect, ActionFunctionArgs, useNavigate, } from "react-router-dom";
import TaskType from "src/types/Task";

import { updateTask } from "../redux/slices/tasksSlice";
import store from "../store";

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);

	store.dispatch(updateTask({id: params.taskId, ...updates}));

	return redirect(`/${params.taskId}`);
}

const EditContact = () => {
	const { task } = useLoaderData() as { task: TaskType };
	const navigate = useNavigate();

	return (
		<Form method="post" id="task-form">
			<p>
				<span>Name</span>
				<input
					placeholder="Name"
					aria-label="Name"
					type="text"
					name="name"
					defaultValue={task.name}
				/>
			</p>
			<label>
				<span>Description</span>
				<textarea
					name="description"
					defaultValue={task.description}
					rows={6}
				/>
			</label>
			<p>
				<button type="submit">Save</button>
				<button
					type="button"
					onClick={() => {
						navigate(-1);
					}}
				>Cancel</button>
			</p>
		</Form>
	);
}

export default EditContact;