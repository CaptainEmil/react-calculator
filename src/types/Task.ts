import BigDecimal from "src/BigDecimal";
type TaskType = {
	id?: string,
	createdAt?: number,
	num1?: BigDecimal,
	oper?: string,
	calcOper?: string,
	num2?: BigDecimal,
	res?: BigDecimal,
	isDecimal?: boolean[],
}

export default TaskType;