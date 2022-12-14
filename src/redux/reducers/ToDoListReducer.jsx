import { arrTheme } from '../../BaiTap/Themes/ThemeManager'
import { ToDoListDarkTheme } from '../../BaiTap/Themes/ToDoListDarkTheme'
import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from '../consts/ToDoListTypes'
const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [

        {
            id: 'task-1',
            taskName: 'tasks 1',
            done: true
        },
        {
            id: 'task-2',
            taskName: 'tasks 2',
            done: false
        },
        {
            id: 'task-3',
            taskName: 'tasks 3',
            done: true
        },
        {
            id: 'task-4',
            taskName: 'tasks 4',
            done: false
        },
    ],
    taskEdit: {
        id: '-1',
        taskName: '',
        done: false
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            {
                let { newTask } = action
                if (newTask.taskName == '') {
                    alert("ten ko dc rong")
                    return { ...state }
                }

                let index = state.taskList.findIndex(task => task.taskName == newTask.taskName);
                if (index !== -1) {
                    alert("trung ten");
                    return { ...state }
                }
                let newTaskList = [...state.taskList, newTask]
                state.taskList = newTaskList;

                return { ...state }
            }
        case CHANGE_THEME:
            {
                let { id } = action;

                let index = arrTheme.findIndex(theme => theme.id == id);
                let newTheme = arrTheme[index].theme;
                state.themeToDoList = newTheme;
                return { ...state }
            }
        case DONE_TASK: {
            let { id } = action;
            let newArrTask = [...state.taskList];
            let index = newArrTask.findIndex(task => task.id == id)
            newArrTask[index].done = true;
            return { ...state, taskList: newArrTask }
        }
        case DELETE_TASK: {
            let { id } = action;
            return { ...state, taskList: state.taskList.filter(task => task.id !== id) }
        }
        case EDIT_TASK: {
            let { task } = action;
            return { ...state, taskEdit: task }
        }
        case UPDATE_TASK: {
            let { taskName } = action;
            // ! l???y t??n m???i cho task edit
            let newTaskEdit = { ...state.taskEdit, taskName: taskName }

            let newArrTask = [...state.taskList]
            // ! t??m index
            let index = newArrTask.findIndex(task => task.id === newTaskEdit.id);
            // ! s???a l???i t??n c???a task dc edit trong task list
            newArrTask[index].taskName = taskName;
            newTaskEdit = { ...newTaskEdit, id: "-1", taskName: '' }
            return { ...state, taskList: newArrTask, taskEdit: newTaskEdit }
        }
        default:
            return state
    }
}
