import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../consts/ToDoListTypes";

export const actionAddTask = (newTask) => (
    {
        type: ADD_TASK,
        newTask
    }
)
export const actionChangeTheme = (id) => (
    {
        type: CHANGE_THEME,
        id
    }
)
export const actionDoneTask = (id) => {
    return {
        type: DONE_TASK,
        id
    }
}
export const actionDeleteTask = (id) => (
    {
        type: DELETE_TASK,
        id
    }
)
export const actionEditTask = (task) => (
    {
        type: EDIT_TASK,
        task
    }
)
export const actionUpdateTask = (taskName) => (
    {
        type: UPDATE_TASK,
        taskName
    }
)
// export const actionAddTask = (newTask) => {
//     return {
//         type: ADD_TASK,
//         newTask
//     }
// }

