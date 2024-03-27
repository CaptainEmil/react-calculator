import { getTask } from "../../../tasks";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import TaskType from "src/types/Task";
import bigIntOpt from "../../../options/bigInt";
type DisplayProps = {
    task: TaskType
}

const Display = ({ task }: DisplayProps) => {
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const isEmpty = taskUpdated.num1 === undefined && taskUpdated.oper === undefined && taskUpdated.num2 === undefined && taskUpdated.res === undefined;
    let expr;

    if (!isEmpty) {


        const num1 = taskUpdated.num1 === undefined ? "" : taskUpdated.num1.toString().length > 5 ? taskUpdated.num1!.toLocaleString('en-US', bigIntOpt) : taskUpdated.num1;
        const oper = taskUpdated.oper ?? "";
        const num2 = taskUpdated.num2 === undefined ? "" : taskUpdated.num2.toString().length > 5 ? taskUpdated.num2!.toLocaleString('en-US', bigIntOpt) : taskUpdated.num2;

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
                    : taskUpdated.res.toString().length > 5 ? taskUpdated.res.toLocaleString('en-US', bigIntOpt)
                        : taskUpdated.res.toString()}
            </div>
        </div>
    )
}

export default Display;