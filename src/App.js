import './App.css';
import data from './tasks.json';
import React from 'react';
/*
const TaskAvatar = ({imageUrl}) => { 
  if(imageUrl !== undefined){
    return (<img className='Avatar' src={imageUrl}/>);
  };
  return null;
}*/
const Task = (props) => {
  
  return(
    <div className='Task'>
          <input type='checkbox' checked={props.done}/>
          <span className='textTask' title={'requested by ' + props.who}>{props.title}</span>
          {/*<TaskAvatar imageUrl={props.imageUrl}/> */}
          
    </div>
  )
};
const TaskList = (props) => {
  if(props.length === 0){
    return <div>No hay tareas en esta página</div>
  };
  return(
    <div className='TaskList'>
      {props.tasks.map(task => <Task done={task.done} title={task.title} who={task.who} imageUrl={task.imageUrl}/>)}
    </div>
  )
};
const TaskCounter = (props) => {
  const tasks = props.tasks;
  const tasksNotDone = tasks.filter(task => !task.done).length;
  return(
    <div>
     {tasksNotDone} tasks left of {tasks.length}
    </div>
  )
};
/*Ver clase de arrays, para poder pasar esta función dentro del useState
const TaskDone = (props) => {
  const tasks = props.tasks;
  const tasksNotDone = tasks.filter(task => task.done).length;
  return(
    <div>
     Has hecho: {tasksNotDone} tareas
    </div>
  )
};*/
const OverWork = (props) => {
  const tasks = props.tasks;
  const muchWork = 3;
  const tasksNotDone = tasks.filter(task => !task.done).length;
    if(tasksNotDone > muchWork){
    return <div className='OverWork'>Cuidado tienes mucho trabajo!</div>
    }
    return null;
    
  
}
const PageTasks = (tasks, page, pageSize) => tasks.slice(page * pageSize, (page +1) * pageSize);

function App() {

  const unfiltereTasks = data.tasks;
  const amountTasks = unfiltereTasks.length;
  const [page, setPage] = React.useState(0);
  const pageSize = 10;
  const pages = Math.ceil(amountTasks / pageSize);
  const tasks = PageTasks(unfiltereTasks, page, pageSize);

 
  return(
  <div className='App'>
        <h1>What do you want to do today?</h1>
        
        <input className='newToDo'></input>

        <OverWork tasks={tasks}/>
        <TaskList tasks={tasks}/>
        

        <div className='footer'>
          <TaskCounter tasks={tasks}/>  
          {/*<TaskDone tasks={tasks}/>
            Preparado para siguiente ejericio, no borrar
          */} 
          
          <div>Load More</div>
         <div className='pagesFooter'>
          {page > 0 && <button onClick={( ) => setPage(page -1)}>Pagina anterior</button>}
          <div> Seeing page {page+1} of {pages} </div>
          {page < (pages-1) && <button onClick={( ) => setPage(page +1)}>Siguiente pagina</button>}
        </div>
        </div>
             
        
     
       

  </div>
  
  )
};
export default App;