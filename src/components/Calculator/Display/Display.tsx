import { getTask } from "../../../tasks";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import TaskType from "src/types/Task";
type DisplayProps = {
    task: TaskType
}

const Display = ({ task }: DisplayProps) => {
    const tasks=useTypedSelector((state)=>state.tasksReducer);
    const taskUpdated= getTask(tasks,task.id) as TaskType;
    const expr = `${taskUpdated?.num1} ${taskUpdated?.oper} ${taskUpdated?.num2}`;

    return (
        <div className="display-container">
            <div id="upper">{expr}</div>
            <div id="lower">{taskUpdated.res === undefined ? expr : taskUpdated.res}</div>
        </div>
    )
}

export default Display;