import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Todo from '../components/todo';
import { trpc } from '../utils/trpc';

const Todos = () => {
	const trpcContext = trpc.useContext();
	const { data } = trpc.useQuery(['example.getTodos', { id: '' }]);
	const [submitTodoState, setSubmitTodoState] = useState('');
	const { data: session, status } = useSession();
	const router = useRouter();

	const { mutate } = trpc.useMutation(['example.createTodo'], {
		onSuccess() {
			trpcContext.invalidateQueries(['example.getTodos']);
		},
	});

	console.log(data);
	if (status === 'unauthenticated') {
		router.push('/signin');
	}

	if (!data || status === 'loading') {
		return <div>Loading</div>;
	}

	const AddTodo = (e: any) => {
		e.preventDefault();
		mutate({ name: submitTodoState, done: false });
	};

	const TodoFormChange = (e: any) => {
		setSubmitTodoState(e.target.value);
	};

	return (
		<div className="p-6 flex flex-col items-center container mx-auto">
			<h1 className="text-5xl">Todos</h1>
			<button
				onClick={() => signOut()}
				type="button"
				className=" absolute top-4 right-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
			>
				Sign Out
			</button>

			<div className="p-5">
				<form className="flex space-x-4" onSubmit={(e) => AddTodo(e)}>
					<input
						type="text"
						id="first_name"
						placeholder="Add Todo"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						value={submitTodoState}
						onChange={(e) => TodoFormChange(e)}
						required
					></input>
					<button type="submit">Add</button>
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
