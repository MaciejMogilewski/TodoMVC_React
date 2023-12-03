import {useEffect, useState} from "react";
import {Header} from "./components/Header/Header.jsx";
import InputWrapper from "./components/InputWrapper/InputWrapper.jsx";
import Tasks from "./components/Tasks/Tasks.jsx";
import {TaskCounter} from "./components/TaskCounter/TaskCounter.jsx";
import {Filters} from "./components/Filters/Filters.jsx";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted.jsx";
import {addTaskApi, changeStatusApi, deleteTaskApi, getAllTasksApi} from "./helpers/api.js";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all')

    useEffect(() => {
            const controller = new AbortController();

            getAllTasksApi(controller.signal).then(setTasks);

            return () => {
                controller.abort();
            }
        }, []);

    async function handleAddTask(value) {
            const task = await addTaskApi({name: value, status: false})
            setTasks([...tasks, task]);
    }

    async function handleChangeStatus(task) {
        task.status = !task.status;
        await changeStatusApi(task.id, task.status)
        setTasks([...tasks]);
    }

    async function handleDeleteTask(taskToRemove) {
        await deleteTaskApi(taskToRemove.id)
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    async function handleDeleteAllTask() {
        const filteredTasks = [];

        for (const task of tasks) {
            if (task.status) {
                await deleteTaskApi(task.id)
            } else {
                filteredTasks.push(task);
            }
        }
        setTasks(filteredTasks);
    }

    async function handleAllDone() {
        let done = tasks.every((task) => task.status === true);
        const mappedTask = [];

        for (const task of tasks) {
            mappedTask.push({...task, status: !done});
            await changeStatusApi(task.id, !done);
        }

        setTasks(mappedTask);
    }

    function handleContentEditable(event, taskToChange) {
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task;
        }))
    }

    return (
        <div>
            <Header/>
            <InputWrapper
                tasks={tasks}
                handleAllDone={handleAllDone}
                handleAddTask={handleAddTask}
            />
            {!!tasks.length && (
                <>
                    <Tasks
                        tasks={tasks}
                        filter={filter}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        handleContentEditable={handleContentEditable}
                    />
                    <div>

                        <TaskCounter tasks={tasks} predicate={(task) => !task.status}/>
                        <Filters setFilter={setFilter}/>

                        {!!tasks.filter((task) => !task.status).length && (
                            <ClearCompleted onClick={handleDeleteAllTask}/>)}
                    </div>
                </>
            )}
        </div>
    )
}

export default App
