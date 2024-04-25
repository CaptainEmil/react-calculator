import TaskType from "src/types/Task";
import ButtonsLeft from "./ButtonsLeft/ButtonsLeft";
import ButtonsRight from "./ButtonsRight/ButtonsRight";
import { useState } from "react";

type ButtonsProps = {
    task: TaskType
}

const Buttons = ({ task }: ButtonsProps) => {
    const [dotFlags, setDotFlags] = useState([false, false]);
    return (
        <>
            <div className="buttons-container">
                <ButtonsLeft task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}></ButtonsLeft>
                <ButtonsRight task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}></ButtonsRight>
            </div>
        </>

    )
}

export default Buttons;