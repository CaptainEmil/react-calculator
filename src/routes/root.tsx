import { Form, Outlet, redirect, NavLink, useNavigation } from "react-router-dom";
import { createTask, updateTask } from "../redux/slices/tasksSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import store, { useTypedSelector } from "../store";
import { getTask } from "../tasks";
import Sidebar from "../components/Sidebar/Sidebar";


export function action() {
	store.dispatch(createTask());
	const tasks = store.getState().tasksReducer;
	const task = tasks[tasks.length - 1];
	return redirect(`/${task!.id}/edit`);
}



const Root = () => {
	const tasks = useTypedSelector((state) => state.tasksReducer);
	const navigation = useNavigation();

	const bigIntOpt: BigIntToLocaleStringOptions = {
		notation: 'scientific',
		maximumFractionDigits: 3
	};

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