import { Form, Outlet, redirect, NavLink, useNavigation } from "react-router-dom";
import { createTask, updateTask } from "../redux/slices/tasksSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import store, { useTypedSelector } from "../store";
import { getTask } from "../tasks";


export function action() {
	store.dispatch(createTask());
	const tasks = store.getState().tasksReducer;
	const task = tasks[tasks.length - 1];
	return redirect(`/${task!.id}/edit`);
}



const Root = () => {
	const tasks = useTypedSelector((state) => state.tasksReducer);
	const navigation = useNavigation();

	return (
		<>
			<div id="sidebar">
				<nav>
					{tasks.length ? (
						<ul>
							{tasks
								.map((task) => {
									if(!task.num1)return;
									return(<li key={task.id}>
										<NavLink
											to={`/${task.id}`}
											className={({ isActive, isPending }) =>
												isActive
													? "active"
													: isPending
														? "pending"
														: ""
											}
										>
											{`${task.num1} ${task.oper} ${task.num2} `+ (task.res ? `= ${task.res}`:"")}
										</NavLink>
										<div className="button-container">
											<Form action={`/${task.id}/edit`}>
												<button type="submit">Edit</button>
											</Form>
											<Form
												method="post"
												action={`/${task.id}/destroy`}
												onSubmit={(event) => {
													if (
														!window.confirm(
															"Please confirm you want to delete this record."
														)
													) {
														event.preventDefault();
													}
												}}
											>
												<button type="submit">Delete</button>
											</Form>
										</div>
									</li>)}
								)}
						</ul>
					) : (
						<p>
							<i>No tasks</i>
						</p>
					)}
				</nav>
			</div>
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