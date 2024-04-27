import { Form, NavLink } from "react-router-dom";
import { useTypedSelector } from "../../../store";
import singleOpers from "../../../options/singleOpers";
import UniqDisplay from "../../UniqDisplay/UniqDisplay";

const TasksList = () => {
    const tasks = useTypedSelector((state) => state.tasksReducer);

    return (
        <ul>
            {tasks
                .map((task) => {
                    if (task.res === undefined) return;
                    const expr = `${task.num1 === undefined ? "" : task.num1.toString()} ${task.oper ?? ""} ${task.num2 === undefined ? "" : task.num2.toString()} ` + (task.res === undefined ? "" : `= ${task.res.toString()}`);
                    const uniqOpers = [...singleOpers];
                    uniqOpers.push("nthPower", "nthRoot");
                    return (<li key={task.id}>
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
                            {uniqOpers.includes(task.calcOper ?? "") ? (<UniqDisplay task={task}></UniqDisplay>) : expr}
                        </NavLink>
                        <div className="button-container">
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
                                <button type="submit">🗑</button>
                            </Form>
                        </div>
                    </li>)
                }
                )}
        </ul>
    );
}

export default TasksList;