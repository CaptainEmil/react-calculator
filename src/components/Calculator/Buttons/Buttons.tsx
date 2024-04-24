import TaskType from "src/types/Task";
import Button from "./Button";
import { Form } from "react-router-dom";

type ButtonsProps = {
    task: TaskType
}

const Buttons = ({ task }: ButtonsProps) => {

    return (
        <>
            <div className="buttons-container">
                <div className="buttons-left">
                    <div className="line-container">
                        <Form method="post">
                            <button name="oper" value="clear">
                                C
                            </button>
                        </Form>
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
                <div className="buttons-right">
                    <div className="line-container">
                        <Form method="post">
                            <button name="oper" value="clear">
                                C
                            </button>
                        </Form>
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