import React, { useState } from 'react'
import CompleteList from './Components/CompleteList';
import EditForm from './Components/EditForm';
import NormalForm from './Components/NormalForm';
import OngoingList from './Components/OngoingList';
import UntouchedList from './Components/UntouchedList';

//グローバル変数
//編集モード中のindex保持関数
let editIndex = 0;

function App() {
  //todoリスト
  //未着手　リスト
  const [todos, setTodos] = useState([])
  //進行中
  const [ongoingTodos, setOngoingTodos] = useState([])
  //完了
  const [completeTodos, setCompleteTodos] = useState([])

  //form
  //状態保持
  const [formText, setFormText] = useState('')
  //切り替えフラグ　true: 通常モード　false: 編集中モード
  const [formFlag, setFormFlag] = useState(true)

  //編集中モード・通常モード切り替え
  const onClickEdit = (index) => {
    setFormFlag(!formFlag)
    //indexをセット
    editIndex = index;
  }

  //form内の入力値を未着手リストにセット
  const onClickSetTodo = (e) => {
    e.preventDefault()
    if (formText === '') {
      return
    }
    setTodos([...todos, formText])
    setFormText('')
  }

  //未着手リストからTodoを削除
  const onClickDeleteTodo = (index) => {
    const todosCoppy = [...todos]
    todosCoppy.splice(index, 1)
    setTodos(todosCoppy)
    //編集中なら戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  //編集処理
  const onClickEditComplete = (e) => {
    e.preventDefault()
    if (formText === '') {
      return
    }
    todos[editIndex] = formText
    setFormText('')
    //編集モード終了
    setFormFlag(true)
    //初期化しておく
    editIndex = 0;
  }

  //未着手リストから進行中リストに移動する
  const onClickTodoStart = (index) => {
    setOngoingTodos([...ongoingTodos, todos[index]]);
    //未着手リストから削除する
    const todosCopy = [...todos];
    todosCopy.splice(index, 1);
    setTodos(todosCopy)
    //編集中モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  //進行中
  //進行中リストから未着手リストに移動する
  const onClickOngoingRemove = (index) => {
    setTodos([...todos, ongoingTodos[index]]);
    //進行中リストから削除する
    const todosCopy = [...ongoingTodos];
    todosCopy.splice(index, 1);
    setOngoingTodos(todosCopy)
    //編集中モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
}

  //進行中リストから完了リストに移動する
  const onClickTodoComplete = (index) => {
    setCompleteTodos([...completeTodos, ongoingTodos[index]]);
    //未着手リストから削除する
    const todosCopy = [...ongoingTodos];
    todosCopy.splice(index, 1);
    setOngoingTodos(todosCopy)
    //編集中モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }
  //進行中リストからTodoを削除する
  const onClickOngoingDeleteTodo = (index) => {
    const todosCopy = [...ongoingTodos];
    todosCopy.splice(index, 1);
    setOngoingTodos(todosCopy)
    //編集中なら戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  //完了
  //完了リストから進行中リストに移動する
  const onClickCompleteRemove = (index) => {
    setOngoingTodos([...ongoingTodos, completeTodos[index]]);
    //進行中リストから削除する
    const todosCopy = [...completeTodos];
    todosCopy.splice(index, 1);
    setCompleteTodos(todosCopy)
    //編集中モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }
  
  //完了リストからTodoを削除する
  const onClickCompleteDeleteTodo = (index) => {
    const todosCopy = [...completeTodos];
    todosCopy.splice(index, 1);
    setCompleteTodos(todosCopy)
    //編集中なら戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  return (
    <>
      {/* 通常モード */}
      <NormalForm 
        formFlag={formFlag}
        formText={formText}
        setFormText={setFormText}
        onClickSetTodo={onClickSetTodo}
      />
      {/* 編集モード */}
      <EditForm 
        formFlag={formFlag}
        formText={formText}
        setFormText={setFormText}
        onClickEditComplete={onClickEditComplete}
      />
      {/* リスト */}
      <UntouchedList
        todos={todos}
        onClickEdit={onClickEdit}
        onClickTodoStart={onClickTodoStart}
        onClickDeleteTodo={onClickDeleteTodo}
      />
      <OngoingList 
        ongoingTodos={ongoingTodos}
        onClickOngoingRemove={onClickOngoingRemove}
        onClickTodoComplete={onClickTodoComplete}
        onClickOngoingDeleteTodo={onClickOngoingDeleteTodo}
      />
      <CompleteList 
        completeTodos={completeTodos}
        onClickCompleteRemove={onClickCompleteRemove}
        onClickCompleteDeleteTodo={onClickCompleteDeleteTodo}
      />
    </>
  )
}

export default App;
