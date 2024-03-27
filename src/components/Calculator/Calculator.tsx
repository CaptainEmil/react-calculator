import TaskType from "src/types/Task";
import Buttons from "./Buttons/Buttons";
import Display from "./Display/Display";
type CalculatorProps = {
    task: TaskType
}

const Calculator = ({ task }: CalculatorProps) => {
    return (
        <div className="calculator-container">
            <Display task={task}></Display>
            <Buttons task={task}></Buttons>
        </div>
    )
}

export default Calculator;