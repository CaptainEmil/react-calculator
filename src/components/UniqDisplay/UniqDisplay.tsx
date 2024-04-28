import { getTask } from "../../tasks";
import { useTypedSelector } from "../../store";
import TaskType from "src/types/Task";
type DisplayProps = {
    task: TaskType
}

const UniqDisplay = ({ task }: DisplayProps) => {
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const dotFlags = useTypedSelector((state) => state.dotFlagsReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const zerosCnt = useTypedSelector((state) => state.zerosCntReducer);
    const oper = taskUpdated.calcOper;
    const num1 = taskUpdated.num1 === undefined ? "0" : taskUpdated.num1.toString() + (dotFlags[0] && !taskUpdated.num1.toString().includes(".") ? "." : "") + "0".repeat(zerosCnt[0]!);
    const num2 = taskUpdated.num2 === undefined ? "0" : taskUpdated.num2.toString() + (dotFlags[1] && !taskUpdated.num2.toString().includes(".") ? "." : "") + "0".repeat(zerosCnt[1]!);

    switch (oper) {
        case "fac":
            return (<>{num1.toString() + "!"}</>);
        case "sin": case "tan": case "cos": case "sqrt": case "ln": case "log":
            return (<>{taskUpdated.oper + " " + num1.toString()}</>);
        case "nthPower":
            return (<>{num1.toString()}<sup>{taskUpdated.num2 === undefined ? "?" : num2}</sup></>);
        case "nthRoot":
            return (<><sup>{taskUpdated.num2?.num1.toString() ?? "?"}</sup>√{num1.toString()}</>);
        case "square":
            return (<>{num1.toString()}<sup>2</sup></>);
        case "powerOf10":
            return (<>10<sup>{num1.toString()}</sup></>);
        case "powerOfE":
            return (<>e<sup>{num1.toString()}</sup></>);
        default:
            throw new Error("no such unique operation: " + oper);
    }
}

export default UniqDisplay;