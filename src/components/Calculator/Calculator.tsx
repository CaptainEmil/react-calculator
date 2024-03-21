import TaskType from "src/types/Task";
import Buttons from "./Buttons/Buttons";
type CalculatorProps = {
    task: TaskType
}

const Calculator = ({ task }: CalculatorProps) => {
    return (
        <div className="calculator-container">
            <Display></Display>
            <Buttons task={task}></Buttons>
        </div>
    )
}

export default Calculator;