import { useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { trpc } from '../utils/trpc';

const Todo = (props: any) => {
	const trpcContext = trpc.useContext();

	const [todostate, setTodo] = useState(props.todo);

	const { mutate, isLoading } = trpc.useMutation(['example.deleteTodo'], {
		onSuccess() {
			trpcContext.invalidateQueries(['example.getTodos']);
		},
	});

	const checkTodo = (e: any, finishedtodo: any) => {
		console.log(finishedtodo);
		const check = !finishedtodo.done;
		setTodo({ ...todostate, done: check });
	};

	const deleteTodo = (e: any, todoId: string) => {
		mutate({ id: todoId });
	};

	return (
		<div
			className={` ${
				isLoading ? 'bg-gray-300' : 'bg-white'
			} flex p-2 w-full h-2 items-center justify-center  rounded-lg border shadow-md sm:p-8`}
		>
			<h5
				className={`text-2xl font-bold ${
					todostate.done ? 'line-through' : ''
				} ${isLoading ? 'text-gray-500' : 'text-gray-900'}`}
			>
				{todostate.name}
			</h5>
			<div className=" flex flex-row space-x-4 pl-4 px-2">
				<button onClick={(e) => checkTodo(e, todostate)}>
					<FaCheck className="text-2xl text-green-700"></FaCheck>
				</button>
				<button onClick={(e) => deleteTodo(e, todostate.id)}>
					<FaTrash className="text-2xl text-green-700"></FaTrash>
				</button>
			</div>
		</div>
	);
};

export default Todo;
