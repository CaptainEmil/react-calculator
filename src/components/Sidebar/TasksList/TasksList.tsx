import { Form, NavLink } from "react-router-dom";
import { useTypedSelector } from "../../../store";

const TasksList = () => {
    const tasks = useTypedSelector((state) => state.tasksReducer);

    const bigIntOpt: BigIntToLocaleStringOptions = {
        notation: 'scientific',
        maximumFractionDigits: 3
    };

    return (
        <ul>
            {tasks
                .map((task) => {
                    if (task.res === undefined) return;
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
                            {`${task.num1 === undefined ? "" : task.num1.toString().length > 5 ? task.num1.toLocaleString('en-US', bigIntOpt) : task.num1.toString()} ${task.oper ?? ""} ${task.num2 === undefined ? "" : task.num2.toString().length > 5 ? task.num2.toLocaleString('en-US', bigIntOpt) : task.num2.toString()} ` + (task.res === undefined ? "" : `= ${task.res.toString().length > 5 ? task.res.toLocaleString('en-US', bigIntOpt) : task.res.toString()}`)}
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