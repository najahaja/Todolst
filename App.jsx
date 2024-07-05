import  { useReducer, useState } from 'react';
import './App.css';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'Clear':
      return [];
    case 'Completed':
      return state.map((todo) => ({...todo, completed: true }));
    case 'Create':
      return [...state, { title: action.title, description: action.description, completed: false }];
    case 'Edit':
      return state.map((todo) => (todo.title === action.title? {...todo, description: action.description } : todo));
    case 'Delete':
      return state.filter((todo) => todo.title!== action.title);
    default:
      return state;
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    dispatch({ type: 'Create', title, description });
    setTitle('');
    setDescription('');
  };

  const handleClear = () => {
    dispatch({ type: 'Clear' });
  };

  const handleCompleted = () => {
    dispatch({ type: 'Completed' });
  };

  const handleEdit = (title, description) => {
    dispatch({ type: 'Edit', title, description });
  };

  const handleDelete = (title) => {
    dispatch({ type: 'Delete', title });
  };
  

  return (
    <>
      <h2>Todo Application</h2>
      <div className="class1">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Todo title" />
        <input type="text"  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button onClick={handleCreate}  >Create Todo</button>
      </div>
      <div className="btn">
      <button onClick={handleClear}>Clear Todos</button>
      <button onClick={handleCompleted}>Marks As Completed</button>
      </div><hr />
      <table>
        <tr>
          <td> <input type="checkbox" /> </td>
          <td>Name</td>
          <td>Description</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
        {state.map((todo) => (
          <tr key={todo.title}>
            <td> <input type="checkbox" checked={todo.completed} /> </td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>
              {todo.completed? (
                <span style={{ color: 'green' }}>Completed</span>
              ) : (
                <span style={{ color: 'red' }}>Pending</span>
              )}
            </td>
            <td>
              <div className="action">
                <button onClick={() => handleEdit(todo.title, prompt('Enter new description'))}>Edit</button>
                <button onClick={() => handleDelete(todo.title)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default App;