import BigDecimal from "src/BigDecimal";
type TaskType = {
	id?: string,
	createdAt?: number,
	num1?: BigDecimal,
	oper?: string,
	calcOper?: string,
	num2?: BigDecimal,
	isDecimal?: boolean,
	res?: BigDecimal,
}

export default TaskType;