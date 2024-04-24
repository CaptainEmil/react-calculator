import TaskType from "src/types/Task";
import Button from "./Button";
import { Form } from "react-router-dom";
import { useState } from "react";

type ButtonsProps = {
    task: TaskType
}

const Buttons = ({ task }: ButtonsProps) => {
    const [showAlt, setShowAlt] = useState(false);
    const handleClick = () => {
        setShowAlt(prevState => !prevState);
    }
    return (
        <>
            <div className="buttons-container">
                <div className={"buttons-left" + (showAlt ? " buttons-hidden" : "")}>
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
                        <Button task={task} oper="tan">tan</Button>
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
                        <Button task={task} oper="tan">tan</Button>
                        <Button task={task} oper="nthPower">x<sup>y</sup></Button>
                    </div>
                </div>
                <div className="buttons-right">
                    <div className="line-container">
                        <Form method="post">
                            <button name="oper" value="clear">
                                C
                            </button>
                        </Form>
                        <Button task={task} oper="pi">π</Button>
                        <Button task={task} oper="e">e</Button>
                    </div>
                    <div className="line-container">

                        <Button task={task}>7</Button>
                        <Button task={task}>8</Button>
                        <Button task={task}>9</Button>
                        <Button task={task} oper="/">÷</Button>
                    </div>
                    <div className="line-container">
                        <Button task={task}>4</Button>
                        <Button task={task}>5</Button>
                        <Button task={task}>6</Button>
                        <Button task={task} oper="*">×</Button>
                    </div>
                    <div className="line-container">
                        <Button task={task}>1</Button>
                        <Button task={task}>2</Button>
                        <Button task={task}>3</Button>
                        <Button task={task} oper="-">-</Button>
                    </div>
                    <div className="line-container">
                        <Button task={task}>0</Button>
                        <Button task={task} oper=".">.</Button>
                        <Form method="post">
                            <button name="oper" value="equals">
                                =
                            </button>
                        </Form>
                        <Button task={task} oper="+">+</Button>
                    </div>
                </div>

            </div>

        </>

    )
}

export default Buttons;