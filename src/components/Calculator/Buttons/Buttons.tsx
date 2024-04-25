import TaskType from "src/types/Task";
import ButtonsLeft from "./ButtonsLeft/ButtonsLeft";
import ButtonsRight from "./ButtonsRight/ButtonsRight";
import { useState } from "react";

type ButtonsProps = {
    task: TaskType
}

const Buttons = ({ task }: ButtonsProps) => {
    return (
        <>
            <div className="buttons-container">
                <ButtonsLeft task={task}></ButtonsLeft>
                <ButtonsRight task={task}></ButtonsRight>
            </div>
        </>

    )
}

export default Buttons;