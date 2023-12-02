import './inputWrapper.scss';
import InputTask from "./InputTask.jsx";
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses.jsx";

// eslint-disable-next-line react/prop-types
function InputWrapper({handleAddTask, handleAllDone, doneAll, tasks}) {
    return (
        <div className='inputWrapper'>
            {/* eslint-disable-next-line react/prop-types */}
            {!!tasks.length && (
                <ToggleStatuses handleAllDone={handleAllDone} doneAll={doneAll}/>
            )}
            <InputTask
                handleAddTask={handleAddTask}
            />
        </div>
    );
}

export default InputWrapper;
