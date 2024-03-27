import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createTask, deleteTask } from "../redux/slices/tasksSlice";
import store, { useTypedDispatch } from "../store";


export function action({ params }: ActionFunctionArgs) {
  if (params.taskId !== undefined) store.dispatch(deleteTask(params.taskId));

  return redirect(`/`);

}