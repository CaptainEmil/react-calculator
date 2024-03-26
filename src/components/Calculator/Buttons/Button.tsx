import { ReactNode } from "react";
import TaskType from "src/types/Task";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import { updateTask } from "../../../redux/slices/tasksSlice";
import { getTask } from "../../../tasks";

type ButtonProps = {
    task: TaskType;
    children: ReactNode;
    oper?: string;
}

const Button = ({ task, children, oper }: ButtonProps) => {
    const dispatch = useTypedDispatch();
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = e => {
        const text = e.currentTarget.textContent;
        const num = Number(text!);
        if (Number.isNaN(num)) {
            dispatch(updateTask({ id: task.id, oper: text!, calcOper: oper }));
            return;
        }
        const bigNum = BigInt(text!);
        const bigNum1 = BigInt(taskUpdated.num1 ?? 0);
        if (taskUpdated.oper === undefined) {
            console.log(taskUpdated.num1);
            dispatch(updateTask({ id: task.id, num1: (bigNum1 ?? 0n) * 10n + bigNum }));
            return;
        }
        dispatch(updateTask({ id: task.id, num2: (taskUpdated.num2 ?? 0n) * 10n + bigNum }));
    }

    return (
        <button onClick={handleClick}>{children}</button>
    )
}

export default Button;