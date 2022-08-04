import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Todo from '../components/todo';
import { trpc } from '../utils/trpc';

const Todos = () => {
	const trpcContext = trpc.useContext();
	const { data, isLoading, error } = trpc.useQuery(['example.getTodos']);
	const [submitTodoState, setSubmitTodoState] = useState('');
	const { data: session, status } = useSession();
	const router = useRouter();

	const { mutate, isLoading: mutationLoading } = trpc.useMutation(
		['example.createTodo'],
		{
			onSuccess() {
				trpcContext.invalidateQueries(['example.getTodos']);
			},
		}
	);

	console.log(data);
	if (status === 'unauthenticated') {
		router.push('/signin');
	}

	if (!data || status === 'loading' || isLoading) {
		return <div>Loading</div>;
	}

	if (error) {
		return <div>Error loading todos, please try again later</div>;
	}

	const AddTodo = (e: any) => {
		e.preventDefault();
		mutate({ name: submitTodoState, done: false });
		setSubmitTodoState('');
	};

	const TodoFormChange = (e: any) => {
		e.preventDefault();
		setSubmitTodoState(e.target.value);
	};

	return (
		<div className="p-6 flex flex-col items-center container mx-auto">
			<h1 className="text-5xl">Todos</h1>
			<button
				onClick={() => signOut()}
				type="button"
				className="absolute top-4 right-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Sign Out
			</button>

			<div className="p-5">
				<form className="flex space-x-4" onSubmit={(e) => AddTodo(e)}>
					<input
						type="text"
						id="first_name"
						placeholder={mutationLoading ? 'Adding...' : 'Add Todo'}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						value={submitTodoState}
						onChange={(e) => TodoFormChange(e)}
						required
					></input>
					<button
						type="submit"
						className="w-10 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							></path>
						</svg>
						<span className="sr-only">Add Todo</span>
					</button>
				</form>
			</div>
			<div className="flex flex-col space-y-2 p-5">
				{data.map((todo: any) => {
					//   console.log(todo);
					return <Todo key={todo.id} todo={todo}></Todo>;
				})}
			</div>
		</div>
	);
};

const sampleTodos = [
	{
		name: 'Todo 1',
		dueDate: '1/1/2022',
		done: false,
	},
];

export default Todos;
