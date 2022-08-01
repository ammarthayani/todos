import { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

const Todo = (todo: any) => {
  const [todostate, setTodo] = useState(todo.todo);

  const checkTodo = (e: any, finishedtodo: any) => {
    console.log(finishedtodo);
    setTodo({ ...todostate, done: true });
  };

  return (
    <div className=" flex p-2 w-full h-2 items-center justify-center bg-white rounded-lg border shadow-md sm:p-8">
      <h5
        className={`text-2xl font-bold text-gray-900 ${
          todostate.done ? "line-through" : ""
        }`}
      >
        {todostate.name} -{" "}
        <span className="font-normal italic"> {todostate.dueDate}</span>
      </h5>
      <div className=" flex flex-row space-x-4 pl-4 px-2">
        <button onClick={(e) => checkTodo(e, todostate)}>
          <FaCheck className="text-2xl text-green-700"></FaCheck>
        </button>
        <button>
          <FaTrash className="text-2xl text-green-700"></FaTrash>
        </button>
      </div>
    </div>
  );
};

export default Todo;
