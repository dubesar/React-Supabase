import "./todo.css";

export default function Todo(todo) {
    console.log(todo)
    return todo.map((id, todos) => <li key={id}>{id} {todos}</li>);
}
