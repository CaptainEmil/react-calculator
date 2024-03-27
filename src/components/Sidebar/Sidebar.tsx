import { Form, NavLink } from "react-router-dom";
import { useTypedSelector } from "../../store";
import TasksList from "./TasksList/TasksList";

const Sidebar = () => {
    const tasks = useTypedSelector((state) => state.tasksReducer);

    const bigIntOpt: BigIntToLocaleStringOptions = {
        notation: 'scientific',
        maximumFractionDigits: 3
    };

    return (
        <div id="sidebar">
            <nav>
                {tasks.length ? (
                    <TasksList></TasksList>
                ) : (
                    <p>
                        <i>No tasks</i>
                    </p>
                )}
            </nav>
        </div>
    );
}

export default Sidebar;