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

const handleKeyDown: unknown = (e: React.KeyboardEvent<HTMLBodyElement>) => {
	e.preventDefault()

	let sym;
	if (!e.code.includes("Digit") &&
		!e.code.includes("Minus") &&
		!e.code.includes("Equal") &&
		!e.code.includes("Numpad") &&
		!e.code.includes("KeyE") &&
		!e.code.includes("KeyP")
	) {
		return;
	}
	switch (e.code) {
		case ("NumpadAdd"):
		case ("Equal"):
			sym = "sum"
			break;
		case ("NumpadMultiply"):
			sym = "prod"
			break;
		case ("NumpadSubtract"):
		case ("Minus"):
			sym = "diff"
			break;
		case ("NumpadDivide"):
			sym = "div"
			break;
		case ("KeyP"):
			sym = "pi"
			break;
		default:
			sym = e.code.split("")[e.code.length - 1];

	}
	console.log(e.code);

	console.log(sym);
	const btn = document.querySelector("#b-" + sym?.toLowerCase());
	const event = new MouseEvent("click", {
		bubbles: true,
		cancelable: true,
		view: window,
	});
	if (btn === null) return;

	btn.dispatchEvent(event);
}

const Root = () => {
	const navigation = useNavigation();

	document.body.addEventListener("keydown", handleKeyDown as (this: HTMLElement, ev: KeyboardEvent) => any);

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