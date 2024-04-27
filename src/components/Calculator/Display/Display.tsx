import { getTask } from "../../../tasks";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import TaskType from "src/types/Task";
import { createTask } from "../../../redux/slices/tasksSlice";
import singleOpers from "../../../options/singleOpers";
import UniqDisplay from "./UniqDisplay/UniqDisplay";
type DisplayProps = {
    task: TaskType
}

const Display = ({ task }: DisplayProps) => {
    const dispatch = useTypedDispatch();
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const dotFlags = useTypedSelector((state) => state.dotFlagsReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const zerosCnt = useTypedSelector((state) => state.zerosCntReducer);
    if (taskUpdated === null) {
        dispatch(createTask());
    }

    const isEmpty = taskUpdated.num1 === undefined && taskUpdated.oper === undefined && taskUpdated.num2 === undefined && taskUpdated.res === undefined;
    let expr;

    if (!isEmpty) {

        const num1 = taskUpdated.num1 === undefined ? "" : taskUpdated.num1.toString() + (dotFlags[0] && !taskUpdated.num1.toString().includes(".") ? "." : "") + "0".repeat(zerosCnt[0]!);
        const oper = taskUpdated.oper ?? "";
        const num2 = taskUpdated.num2 === undefined ? "" : taskUpdated.num2.toString() + (dotFlags[1] && !taskUpdated.num2.toString().includes(".") ? "." : "") + "0".repeat(zerosCnt[1]!);

        expr = `${num1} ${oper} ${num2}`;
    }
    else {
        expr = "0" + (dotFlags[0] ? "." : "");
    }
    const uniqOpers = [...singleOpers];
    uniqOpers.push("nthPower", "nthRoot");

    if (taskUpdated.oper !== undefined && uniqOpers.includes(taskUpdated.calcOper ?? "")) {

        return (
            <div className="display-container">
                <div id="upper"><UniqDisplay task={task}></UniqDisplay></div>
                <div id="lower">{
                    taskUpdated.res === undefined ? (<UniqDisplay task={task}></UniqDisplay>)
                        : taskUpdated.res.toString()
                }
                </div>
            </div>
        )
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