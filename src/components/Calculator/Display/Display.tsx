import { getTask } from "../../../tasks";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import TaskType from "src/types/Task";
type DisplayProps = {
    task: TaskType
}

const Display = ({ task }: DisplayProps) => {
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const isEmpty = taskUpdated.num1 === undefined && taskUpdated.oper === undefined && taskUpdated.num2 === undefined && taskUpdated.res === undefined;
    const expr = isEmpty ? "0" : `${taskUpdated.num1 ?? ""} ${taskUpdated.oper ?? ""} ${taskUpdated.num2 ?? ""}`;

    return (
        <div className="display-container">
            <div id="upper">{expr}</div>
            <div id="lower">{taskUpdated.res ?? expr}</div>
        </div>
    )
}

export default Display;