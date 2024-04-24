import { useState } from "react"
import TaskType from "../../../../types/Task"
import Button from "../Button/Button"
type ButtonsLeftProps = {
    task: TaskType
}
const ButtonsLeft = ({ task }: ButtonsLeftProps) => {
    const [showAlt, setShowAlt] = useState(false);

    const handleClick = () => {
        setShowAlt(prevState => !prevState);
    }

    return (
        <>
            <div className={"buttons-left" + (showAlt ? " buttons-hidden" : "")}>
                <div className="line-container">
                    <button className="alt" onClick={handleClick}>Alt</button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="sin">sin</Button>
                    <Button task={task} oper="ln">ln</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="cos">cos</Button>
                    <Button task={task} oper="log">log</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="tan">tan</Button>
                    <Button task={task} oper="sqrt">√</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="fact">x!</Button>
                    <Button task={task} oper="nthPower">x<sup>y</sup></Button>
                </div>
            </div>
            <div className={"buttons-left-alt" + (showAlt ? "" : " buttons-hidden")}>
                <div className="line-container">
                    <button className="alt" onClick={handleClick}>Alt</button>
                    <Button task={task} id="ans" oper="ans">Ans</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="sin">sin</Button>
                    <Button task={task} oper="ln">ln</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="cos">cos</Button>
                    <Button task={task} oper="log">log</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="tan">tan</Button>
                    <Button task={task} oper="sqrt">√</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="fact">x!</Button>
                    <Button task={task} oper="nthPower">x<sup>y</sup></Button>
                </div>
            </div>
        </>
    )
}

export default ButtonsLeft;