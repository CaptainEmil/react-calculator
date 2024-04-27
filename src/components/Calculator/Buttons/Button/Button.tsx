import { ReactNode } from "react";
import TaskType from "src/types/Task";
import store, { useTypedDispatch, useTypedSelector } from "../../../../store";
import { createTask, updateTask } from "../../../../redux/slices/tasksSlice";
import { getTask } from "../../../../tasks";
import { useNavigate } from "react-router-dom";
import BigDecimal from "../../../../BigDecimal";
import singleOpers from "../../../../options/singleOpers";
import { increment1, increment2, reset } from "../../../../redux/slices/zerosCntSlice";
import { setFlags } from "../../../../redux/slices/dotFlagsSlice";

type ButtonProps = {
    task: TaskType;
    children: ReactNode;
    oper?: string;
    id?: string;
}

const Button = ({ task, children, oper, id }: ButtonProps) => {
    const dispatch = useTypedDispatch();
    const tasks = useTypedSelector((state) => state.tasksReducer);
    const taskUpdated = getTask(tasks, task.id) as TaskType;
    const zerosCnt = useTypedSelector((state) => state.zerosCntReducer);
    const dotFlags = useTypedSelector((state) => state.dotFlagsReducer);
    const ans=useTypedSelector((state) => state.ansReducer);
    const navigate = useNavigate();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = e => {
        const text = e.currentTarget.textContent;

        if (oper === "pi") {
            if (taskUpdated.oper === undefined || singleOpers.includes(taskUpdated.calcOper!)) {
                dispatch(updateTask({ id: task!.id, num1: BigDecimal.PI() }));
                dispatch(setFlags([true, false]));
                return;
            }
            dispatch(updateTask({ id: task!.id, num2: BigDecimal.PI() }));
            dispatch(setFlags([false, true]));
            return;
        }

        if (oper === "ans") {
            const task=getTask(tasks,ans);
            const bigDec=task===null?new BigDecimal("0"):task.res;
            if (taskUpdated.oper === undefined || singleOpers.includes(taskUpdated.calcOper!)) {
                dispatch(updateTask({ id: taskUpdated!.id, num1:bigDec}));
                dispatch(setFlags([ans.toString().includes("."), false]));
                return;
            }
            dispatch(updateTask({ id: taskUpdated!.id, num2: bigDec }));
            dispatch(setFlags([false, ans.toString().includes(".")]));
            return;
        }


        if (oper === "e") {
            if (taskUpdated.oper === undefined || singleOpers.includes(taskUpdated.calcOper!)) {
                dispatch(updateTask({ id: task!.id, num1: BigDecimal.E() }));
                dispatch(setFlags([true, false]));
                return;
            }
            dispatch(updateTask({ id: task!.id, num2: BigDecimal.E() }));
            dispatch(setFlags([false, true]));
            return;
        }

        if (oper === ".") {
            if (taskUpdated.num2 !== undefined) {
                dispatch(setFlags([false, true]));
                return;
            }
            dispatch(setFlags([true, false]));
            return;
        }

        if (oper !== undefined) {

            if (taskUpdated.num1 === undefined) {
                dispatch(updateTask({ id: task.id, oper: text!, num1: new BigDecimal("0"), calcOper: oper }));
            }
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

            if (taskUpdated.oper === undefined || singleOpers.includes(taskUpdated.calcOper!)) {

                if ((dotFlags[0]) && newNum === 0) {
                    dispatch(increment1());
                    return;
                }

                dispatch(updateTask({ id: task.id, num1: new BigDecimal(bigDec1.toString() + (dotFlags[0] && !bigDec1.toString().includes(".") ? "." : "") + "0".repeat(zerosCnt[0]!) + newNum) }));

                dispatch(reset());
                return;
            }

            if ((dotFlags[1]) && newNum === 0) {
                dispatch(increment2());
                return;
            }
            dispatch(updateTask({ id: task.id, num2: new BigDecimal(bigDec2.toString() + (dotFlags[1] && !bigDec2.toString().includes(".") ? "." : "") + "0".repeat(zerosCnt[1]!) + newNum) }));

            dispatch(reset());
            return;
        }

        dispatch(createTask());
        const newTask = store.getState().tasksReducer[0];
        dispatch(updateTask({ id: newTask?.id, num1: new BigDecimal(newNum.toString()) }));

        navigate(`/${newTask!.id}`);
    }

    return (
        <button onClick={handleClick} id={id ?? undefined}>{children}</button>
    )
}

export default Button;