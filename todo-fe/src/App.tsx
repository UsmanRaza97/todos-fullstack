import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type DynamicObj = { [key: string]: any };
type ServiceParams= {
  endpoint:string;
  data?:string;
  method:string;
  id?:Number
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<DynamicObj[]>([]);
  const [listItem, setListItem] = useState<null | Number>(null);
  const [updatedTodo, setUpdatedTodo] = useState("");

  const apiService = ({method,endpoint,data,id}:ServiceParams) =>{
    return axios({
      url: `http://localhost:3000/${endpoint}`,
      method,
      headers:{"Content-Type": "application/json"},
      data:{todo:data},
      params:{id}
    })
    
  }

  const getTodos = () => {
    const config = {endpoint:`todo`,method:`GET`}
    apiService(config)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onAdd = () => {
    const config = {endpoint:`todo`,data:todo,method:`POST`}
    apiService(config).then(() => {
        setTodo("");
        getTodos();
      })

      .catch((err) => alert(err));
  };

  const onUpdate = (id: Number) => {
    const config = {endpoint:`todo/${id}`,data:updatedTodo,method:`PUT`}
    
      apiService(config).then(() => alert(`Updated successfully`))
      .then(() => {
        getTodos();
        setListItem(null);
      })
      .catch((err) => alert(err));
  };

  const onDelete = (id: Number) => {
    const config = {endpoint:`todo/${id}`,method:`DELETE`}
    
      apiService(config).then(() => alert(`Deleted successfully`))
      .then(() => {
        getTodos();
        setListItem(null);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <input
        className="mr input-container"
          value={todo}
          onChange={({ target: { value } }) => setTodo(value)}
          placeholder="Enter Todos"
        />
        <button onClick={onAdd}>Add</button>
      </div>
      <div className="listContainer">
        {todos.map((v, i) => (
          <li style={{gap:10}} key={i}>
            <input
              className="mr list-input"
              disabled={listItem !== i}
              value={listItem === i ? updatedTodo : v.todo}
              onChange={({ target: { value } }) => setUpdatedTodo(value)}
            />
            <button
            className="mr"
              onClick={() => {
                listItem ? onUpdate(v._id) : setListItem(i);
              }}
            >
              {listItem===i ? `Done` : `Edit`}
            </button>
            <button className="mr" onClick={() => onDelete(v._id)}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
