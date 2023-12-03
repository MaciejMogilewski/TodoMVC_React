import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Details() {
 const [task, setTask] = useState({});
 const {id} = useParams();
 
 useEffect(() => {
  getTaskApi().then(setTask);
 }, []);
 
 async function getTaskApi() {
  const response = await fetch(`http://localhost:3001/tasks/${id}`);
  return await response.json();
 }
 
 return (
     <div>
      <h1>{id}. {task.name}</h1>
      <span>Created at: {task.createdAt}</span><span>{task.status}</span>
      <p>{task.description}</p>
      <button>Edit</button><button>Delete</button>
     </div>
  );
}

export default Details;
