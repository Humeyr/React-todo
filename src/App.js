import { useState } from  'react';
import Todo from  './components/todo';
import Modal from  './components/modal';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [editingTodo,setEditingTodo] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText){
      alert('*Form alani bos birakilamaz');
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,    
    };

    setTodos([...todos, newTodo]);

    setTodoText('');
  };

  const handleDelete = (deletedTodo) => {
    const filtred = todos.filter((item) => item.id !== deletedTodo.id);
    setTodos(filtred);
  };

  const handleDone = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);
    const newValue = !todos[index].isDone;
    const changedTodo = {...todo, isDone: newValue};
    const newTodos = [...todos];
    newTodos.splice(index, 1, changedTodo);
    setTodos(newTodos);
  };

  const handleSaveEdit = () => {
    let index = todos.findIndex((item) => item.id === editingTodo.id);
    const cloneTodos = [...todos];
    cloneTodos.splice(index, 1, editingTodo);
    setTodos(cloneTodos);
    setShowModal(false);
  };

  
 
  return (
    <div>
      <h1 className="bg-dark">CRUD</h1>
      <div className="container border p-4 mt-4">

        <form onSubmit={handleSubmit} className="d-flex gap-3">
          <input className="form-control" 
            type="text" 
            placeholder="yapilacaklari giriniz..."
            value={todoText}
            onChange={(e) => {setTodoText(e.target.value);}}/>
          <button className="btn btn-warning btn-lg">Ekle</button>
        </form>

        <div className='d-flex flex-column gap-3 py-5'>

          {todos.length === 0 && (
            <h4 className='text-center'>Yapilacak herhangi bir isiniz yok</h4>
          )}


          {todos.map((todo) => (
            <Todo 
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowModal={setShowModal}
              setEditingTodo={setEditingTodo} />
          
          ))}

        </div>
      </div>
      {showModal && (
        <Modal editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          setShowModal={setEditingTodo}
          handleSaveEdit={handleSaveEdit}/>
      )}
    </div>
  );
}

export default App;
