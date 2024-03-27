import { useTypedSelector } from "../../store";
import TasksList from "./TasksList/TasksList";

const Sidebar = () => {
    const tasks = useTypedSelector((state) => state.tasksReducer);

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