import Button from "../Button/Button"
import TaskType from "../../../../types/Task"
import { Form } from "react-router-dom"

type ButtonsRightProps = {
    task: TaskType
}

const ButtonsRight = ({ task }: ButtonsRightProps) => {
    return (
        <>
            <div className="buttons-right">
                <div className="line-container">
                    <Button task={task} oper="fact">x!</Button>
                    <Button task={task} oper="pi">π</Button>
                    <Button task={task} oper="e">e</Button>
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
        </>
    )
}

export default ButtonsRight;