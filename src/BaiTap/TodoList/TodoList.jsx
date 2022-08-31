import React, { Component } from 'react';
import { Container } from '../Components/Container';
import { ToDoListLightTheme } from '../Themes/ToDoListLightTheme'
import { ToDoListDarkTheme } from '../Themes/ToDoListDarkTheme'
import { ToDoListPrimaryTheme } from '../Themes/ToDoListPrimaryTheme'
import { ThemeProvider } from 'styled-components'
import { Dropdown } from '../Components/Dropdown';
import { Heading3 } from '../Components/Heading';
import { TextField } from '../Components/TextField';
import { Button } from '../Components/Button';
import { Table, Thead, Tbody, Tr, Th } from '../Components/Table';
import { connect } from 'react-redux';
import { actionAddTask, actionChangeTheme, actionDeleteTask, actionDoneTask, actionEditTask, actionUpdateTask } from "../../redux/actions/ToDoListActions";
import { arrTheme } from '../Themes/ThemeManager';
class TodoList extends Component {
    state = {
        taskName: '',
        disable: true
    }
    renderTaskToDo = () => {
        return this.props.taskList.filter(todo => !todo.done).map((needToDo, index) => {
            return (
                <Tr key={index.toString() + needToDo.id} >
                    <Th style={{
                        verticalAlign: "middle"
                    }} >
                        {needToDo.taskName}
                    </Th>
                    <Th className='text-right' >
                        <Button
                            onClick={() => {
                                this.setState({
                                    disable: false
                                }, () => {
                                    this.props.dispatch(actionEditTask(needToDo));
                                })

                            }}
                        >
                            <i className='fa fa-edit' ></i>
                        </Button>
                        <Button
                            onClick={() => {
                                this.handleCheckDoneTask(needToDo.id)
                            }}
                        >
                            <i className='fa fa-check' ></i>
                        </Button>
                        <Button
                            onClick={() => {
                                this.handleDeleteTask(needToDo.id)
                            }}
                        >
                            <i className='fa fa-trash' ></i>
                        </Button>

                    </Th>

                </Tr>
            )

        })
    }

    renderTaskCompleted = () => {
        return this.props.taskList.filter(task => task.done).map((taskDone, index) => {
            return (
                <Tr key={index.toString() + taskDone.id} >
                    <Th style={{
                        verticalAlign: "middle"
                    }} >
                        {taskDone.taskName}
                    </Th>
                    <Th className='text-right' >
                        <Button
                            onClick={() => {
                                this.handleDeleteTask(taskDone.id)
                            }}
                        >
                            <i className='fa fa-trash' ></i>
                        </Button>
                    </Th>
                </Tr>
            )
        })
    }

    handleAddTask = () => {
        let taskName = this.state.taskName;

        // ! newTask:  id, name, done ? 

        // ! Random ID theo thời gian

        let id = Date.now();

        let newTask = {
            id,
            taskName,
            done: false
        }
        // ! đẩy lên reducer
        this.props.dispatch(actionAddTask(newTask))  // ! dùng dòng này thì khỏi cần tạo mapDispatchToProps
    }
    renderTheme = () => {
        return arrTheme.map((item) => {
            return <option
                key={item.id}
                value={item.id} >{item.name}</option>
        })
    }
    handleChangeTheme = (event) => {
        let { value } = event.target;
        this.props.dispatch(actionChangeTheme(value))
    }
    handleCheckDoneTask = (id) => {
        this.props.dispatch(actionDoneTask(id))
    }
    handleDeleteTask = (id) => {
        this.props.dispatch(actionDeleteTask(id))
    }
    handleTaskName = (event) => {
        let { name, value } = event.target;
        this.setState({
            taskName: value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps: ', prevProps.taskEdit.id);
        console.log('new props: ', this.props.taskEdit.id);
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }
    }

    render() {
        let { themeToDoList } = this.props;
        return (
            <ThemeProvider theme={themeToDoList}>
                <Container className='w-50' >
                    <Dropdown
                        onChange={this.handleChangeTheme} >
                        {this.renderTheme()}
                    </Dropdown>
                    <Heading3>To do list</Heading3>
                    <TextField
                        label="Task Name"
                        className="w-50"
                        onChange={this.handleTaskName} //! mỗi lần nhập thì lưu vào state
                        value={this.state.taskName} //! giá trị lấy từ state
                        name="taskName"

                    />
                    <Button
                        className="ml-2"
                        onClick={() => {
                            this.handleAddTask()
                        }}
                    >
                        <i className="fa fa-plus" />
                        Add task
                    </Button>
                    {this.state.disable ? <Button
                        disabled
                        className="ml-2"
                        onClick={() => {

                            this.props.dispatch(actionUpdateTask(this.state.taskName))
                        }}
                    >
                        <i className="fa fa-upload" />
                        Update task
                    </Button>
                        :
                        <Button
                            className="ml-2"
                            onClick={() => {
                                let taskNameCanGui = this.state.taskName;
                                this.setState({
                                    disable: true,
                                    taskName: ''
                                }, () => {
                                    this.props.dispatch(actionUpdateTask(taskNameCanGui))

                                })
                            }}
                        >
                            <i className="fa fa-upload" />
                            Update task
                        </Button>
                    }
                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Tbody>
                            {this.renderTaskToDo()}

                        </Tbody>
                    </Table>
                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Tbody>
                            {this.renderTaskCompleted()}
                        </Tbody>
                    </Table>
                </Container>
            </ThemeProvider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit,
    }
}
export default connect(mapStateToProps)(TodoList);