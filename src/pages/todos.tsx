import Todo from "../components/todo";

const Todos = () => {
  return (
    <div className="p-6 flex flex-col items-center container mx-auto">
      <h1 className="text-5xl">Todos</h1>
      <div className="flex p-5">
        {sampleTodos.map((todo) => {
          //   console.log(todo);
          return <Todo key={todo.name} todo={todo}></Todo>;
        })}
      </div>
    </div>
  );
};

const sampleTodos = [
  {
    name: "Todo 1",
    dueDate: "1/1/2022",
    done: false,
  },
];

export default Todos;
