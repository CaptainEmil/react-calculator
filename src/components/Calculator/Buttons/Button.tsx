import { ReactNode } from "react";
import TaskType from "src/types/Task";
import { useTypedDispatch } from "../../../store";
import { updateTask } from "../../../redux/slices/tasksSlice";

type ButtonProps = {
    task: TaskType;
    children: ReactNode;
    oper?:string;
}

const Button = ({ task, children,oper }: ButtonProps) => {
    const dispatch = useTypedDispatch();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = e => {
        const text = e.currentTarget.textContent;
        const num = Number(text);
        if(oper){
            
        }
        if (Number.isNaN(num)) {
            dispatch(updateTask({ id: task.id, oper: text! }));
            return;
        }
        if (task.num1 === undefined) {
            dispatch(updateTask({ id: task.id, num1: num }));
            return;
        }
        dispatch(updateTask({ id: task.id, num2: num }));
    }

    return (
        <button onClick={handleClick}>{children}</button>
    )
}

export default Button;