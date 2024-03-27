import { Outlet, redirect, useNavigation } from "react-router-dom";
import { createTask } from "../redux/slices/tasksSlice";
import store from "../store";
import Sidebar from "../components/Sidebar/Sidebar";


export function action() {
	store.dispatch(createTask());
	const tasks = store.getState().tasksReducer;
	const task = tasks[tasks.length - 1];
	return redirect(`/${task!.id}/edit`);
}



const Root = () => {
	const navigation = useNavigation();

	return (
		<>
			<Sidebar />
			<div
				id="detail"
				className={
					navigation.state === "loading" ? "loading" : ""
				}
			>
				<Outlet />
			</div>
		</>
	);
}

export default Root;