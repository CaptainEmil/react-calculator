import { useState } from "react";
import { useTypedSelector } from "../../store";
import TasksList from "./TasksList/TasksList";

const Sidebar = () => {
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const [showSidebar, setShowSidebar] = useState(true);

    const handleClick = () => {
        setShowSidebar(prevState => !prevState);
    }

    return (
        <>
            <div id="sidebar-container" className={showSidebar ? "sidebar-show" : "sidebar-hide"}>
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
                <button id="sidebar-toggle" onClick={handleClick}>{showSidebar?"←":"→"}</button>
            </div>
        </>
    );
}

export default Sidebar;