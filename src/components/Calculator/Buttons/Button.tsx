import { ReactNode } from "react";
import TaskType from "src/types/Task";
import store, { useTypedDispatch, useTypedSelector } from "../../../store";
import { createTask, updateTask } from "../../../redux/slices/tasksSlice";
import { getTask } from "../../../tasks";
import { useNavigate } from "react-router-dom";
import BigDecimal from "../../../BigDecimal";

type ButtonProps = {
    task: TaskType;
    children: ReactNode;
    oper?: string;
}

const Button = ({ task, children, oper }: ButtonProps) => {
    const dispatch = useTypedDispatch();
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const navigate = useNavigate();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = e => {
        const text = e.currentTarget.textContent;
        const num = Number(text!);

        if (Number.isNaN(num)) {
            if (taskUpdated.res === undefined) {
                dispatch(updateTask({ id: task.id, oper: text!, calcOper: oper }));
                return;
            }

            dispatch(createTask());
            const newTask = store.getState().tasksReducer[0];
            dispatch(updateTask({ id: newTask!.id, oper: text!, calcOper: oper, num1: taskUpdated.res }));

            navigate(`/${newTask!.id}`);
            return;
        }

        const newNum = Number(text!);

        if (taskUpdated.res === undefined) {
            const bigDec1 = taskUpdated.num1 ?? new BigDecimal("0");
            const bigDec2 = taskUpdated.num2 ?? new BigDecimal("0");
            if (taskUpdated.oper === undefined) {
                dispatch(updateTask({ id: task.id, num1: new BigDecimal(bigDec1.toString() + newNum) }));
                return;
            }

            dispatch(updateTask({ id: task.id, num2: new BigDecimal(bigDec2.toString() + newNum) }));
            return;
        }

        dispatch(createTask());
        const newTask = store.getState().tasksReducer[0];
        dispatch(updateTask({ id: newTask?.id, num1: new BigDecimal(newNum.toString()) }));

        navigate(`/${newTask!.id}`);
    }

    return (
        <button onClick={handleClick}>{children}</button>
    )
}

export default Button;