import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	Navigate,
	redirect,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import './index.css';
import Root, {
	action as rootAction
} from './routes/root';
import ErrorPage from './error-page';
import Task, {
	loader as taskLoader,
	action as taskAction,
} from './routes/task';
import EditTask, {
	action as editAction
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import { Provider } from 'react-redux';
import store, { useTypedDispatch, useTypedSelector } from './store';
import Calculator from './components/Calculator/Calculator';
import { createTask } from './redux/slices/tasksSlice';


const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error('Can\'t find root container');

export default function Index() {
	const tasks=useTypedSelector((state)=>state.tasksReducer);
	const dispatch=useTypedDispatch();
	if(tasks[0]===undefined) dispatch(createTask());
	
	return (
		<Navigate to={`/${store.getState().tasksReducer[0]!.id}`} />
	);
}





const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		// loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: "/:taskId",
						element: <Task />,
						loader: taskLoader,
						action: taskAction,
					},
					{
						path: "/:taskId/edit",
						element: <EditTask />,
						loader: taskLoader,
						action: editAction
					},
					{
						path: "/:taskId/destroy",
						action: destroyAction,
						errorElement: <div>Oops! There was an error.</div>,
					}
				],
			},
		]
	}
]);


const root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)