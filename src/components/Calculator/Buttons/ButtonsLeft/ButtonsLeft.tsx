import { useState } from "react"
import TaskType from "../../../../types/Task"
import Button from "../Button/Button"
type ButtonsLeftProps = {
    task: TaskType,
    dotFlags: boolean[],
    setDotFlags: React.Dispatch<React.SetStateAction<boolean[]>>
}
const ButtonsLeft = ({ task, dotFlags, setDotFlags }: ButtonsLeftProps) => {
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
                    <Button task={task} oper="sin" dotFlags={dotFlags} setDotFlags={setDotFlags}>sin</Button>
                    <Button task={task} oper="ln" dotFlags={dotFlags} setDotFlags={setDotFlags}>ln</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="cos" dotFlags={dotFlags} setDotFlags={setDotFlags}>cos</Button>
                    <Button task={task} oper="log" dotFlags={dotFlags} setDotFlags={setDotFlags}>log</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="tan" dotFlags={dotFlags} setDotFlags={setDotFlags}>tan</Button>
                    <Button task={task} oper="sqrt" dotFlags={dotFlags} setDotFlags={setDotFlags}>√</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="fact" dotFlags={dotFlags} setDotFlags={setDotFlags}>x!</Button>
                    <Button task={task} oper="nthPower" dotFlags={dotFlags} setDotFlags={setDotFlags}>x<sup>y</sup></Button>
                </div>
            </div>
            <div className={"buttons-left-alt" + (showAlt ? "" : " buttons-hidden")}>
                <div className="line-container">
                    <button className="alt" onClick={handleClick}>Alt</button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="sin" dotFlags={dotFlags} setDotFlags={setDotFlags}>sin</Button>
                    <Button task={task} oper="ln" dotFlags={dotFlags} setDotFlags={setDotFlags}>ln</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="cos" dotFlags={dotFlags} setDotFlags={setDotFlags}>cos</Button>
                    <Button task={task} oper="log" dotFlags={dotFlags} setDotFlags={setDotFlags}>log</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="tan" dotFlags={dotFlags} setDotFlags={setDotFlags}>tan</Button>
                    <Button task={task} oper="sqrt" dotFlags={dotFlags} setDotFlags={setDotFlags}>√</Button>
                </div>
                <div className="line-container">
                    <Button task={task} oper="fact" dotFlags={dotFlags} setDotFlags={setDotFlags}>x!</Button>
                    <Button task={task} oper="nthPower" dotFlags={dotFlags} setDotFlags={setDotFlags}>x<sup>y</sup></Button>
                </div>
            </div>
        </>
    )
}

export default ButtonsLeft;