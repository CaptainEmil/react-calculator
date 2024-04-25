import { getTask } from "../../../tasks";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import TaskType from "src/types/Task";
import { createTask } from "../../../redux/slices/tasksSlice";
type DisplayProps = {
    task: TaskType
}

const Display = ({ task }: DisplayProps) => {
    const dispatch = useTypedDispatch();
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const zerosCnt = useTypedSelector((state) => state.zerosCntReducer);
    if (taskUpdated === null) {
        dispatch(createTask());
    }

    const isEmpty = taskUpdated.num1 === undefined && taskUpdated.oper === undefined && taskUpdated.num2 === undefined && taskUpdated.res === undefined;
    let expr;

    if (!isEmpty) {

        const num1 = taskUpdated.num1 === undefined ? "" : taskUpdated.num1.toString() + (zerosCnt[0]! ? taskUpdated.num1.toString().includes(".") ? "" : "." : "") + "0".repeat(zerosCnt[0]!);
        const oper = taskUpdated.oper ?? "";
        const num2 = taskUpdated.num2 === undefined ? "" : taskUpdated.num2.toString() + (zerosCnt[1]! ? taskUpdated.num2.toString().includes(".") ? "" : "." : "") + "0".repeat(zerosCnt[1]!);

        expr = `${num1} ${oper} ${num2}`;
    }
    else {
        expr = "0";
    }

    return (
        <div className="display-container">
            <div id="upper">{expr}</div>
            <div id="lower">{
                taskUpdated.res === undefined ? expr
                    : taskUpdated.res.toString()
            }
            </div>
        </div>
    )
}

export default Display;