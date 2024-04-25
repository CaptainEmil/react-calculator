import Button from "../Button/Button"
import TaskType from "../../../../types/Task"
import { Form } from "react-router-dom"

type ButtonsRightProps = {
    task: TaskType,
    dotFlags: boolean[],
    setDotFlags: React.Dispatch<React.SetStateAction<boolean[]>>
}

const ButtonsRight = ({ task, dotFlags, setDotFlags }: ButtonsRightProps) => {
    return (
        <>
            <div className="buttons-right">
                <div className="line-container">
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper="pi">π</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper="e">e</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} id="ans" oper="ans">Ans</Button>
                    <Form method="post">
                        <button name="oper" value="clear">
                            C
                        </button>
                    </Form>
                </div>
                <div className="line-container">

                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>7</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>8</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>9</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper="/">÷</Button>
                </div>
                <div className="line-container">
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>4</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>5</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>6</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper="*">×</Button>
                </div>
                <div className="line-container">
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>1</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>2</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>3</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper="-">-</Button>
                </div>
                <div className="line-container">
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags}>0</Button>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper=".">.</Button>
                    <Form method="post">
                        <button name="oper" value="equals">
                            =
                        </button>
                    </Form>
                    <Button task={task} dotFlags={dotFlags} setDotFlags={setDotFlags} oper="+">+</Button>
                </div>
            </div>
        </>
    )
}

export default ButtonsRight;