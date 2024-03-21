import TaskType from "src/types/Task";
type DisplayProps = {
    task: TaskType
}

const Display = ({ task }: DisplayProps) => {
    const expr = `${task.num1} ${task.oper} ${task.num2}`;

    return (
        <div className="display-container">
            <div id="upper">{expr}</div>
            <div id="lower">{task.res === undefined ? expr : task.res}</div>
        </div>
    )
}

export default Display;