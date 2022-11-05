import React, { useState } from 'react'
import CompleteList from './Components/CompleteList';
import EditForm from './Components/EditForm';
import NormalForm from './Components/NormalForm';
import OngoingList from './Components/OngoingList';
import UntouchedList from './Components/UntouchedList';

function App() {
  /** Todo List */
  /** 
   * 未着手 
   * */
  const [todos, setTodos] = useState([])
  const [todosDetail, setTodosDetail] = useState([])

  /** 
   * 進行中 
   * */
  const [ongoingTodos, setOngoingTodos] = useState([])
  const [ongoingTodosDetail, setOngoingTodosDetail] = useState([])

  /** 
   * 完了 
   * */
  const [completeTodos, setCompleteTodos] = useState([])
  const [completeTodosDetail, setCompleteTodosDetail] = useState([])

  /** form */
  /** 
   * 入力内容保持 
   * */
  const [formText, setFormText] = useState('')
  const [formTextDetail, setFormTextDetail] = useState('')

  /**
   * form切り替えフラグ
   * @type {boolean} true: 通常モード　false: 編集中モード
   */
  const [formFlag, setFormFlag] = useState(true)

  /**
   * 編集モード中のindex取得
   */
  const [editIndex, setEditIndex] = useState(null);


  /** common */
  /**
   * 編集モード・通常モード切り替え
   * @module onClickEdit
   * @param {number} index 編集対象のindex
   */

  const onClickEdit = (index) => {
    setFormFlag(!formFlag)
    //indexをセット
    setEditIndex(index);
  }

  /** 未着手処理 */
  /**
   * form内の入力値を未着手リストにセット
   * @module onClickSetTodo
   * @param {*} e 
   * @return void formTextが空の場合は処理を行わない
   */
  const onClickSetTodo = (e) => {
    e.preventDefault()
    if (formText === '') return
    setTodos([...todos, formText])
    setTodosDetail([...todosDetail, formTextDetail])
    setFormText('')
    setFormTextDetail('')
  }

  /**
   * 未着手リストからTodoを削除
   * @module onClickDeleteTodo
   * @param {number} index 削除対象のindex
   */
  const onClickDeleteTodo = (index) => {
    const todosCoppy = [...todos]
    const todosDetailCoppy = [...todosDetail]
    todosCoppy.splice(index, 1)
    todosDetailCoppy.splice(index, 1)
    setTodos(todosCoppy)
    setTodosDetail(todosDetailCoppy)
    //編集中なら戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  /**
   * 編集処理
   * @module onClickEditComplete
   * @param {*} e 
   * @returns void formTextが空の場合は処理を行わない
   */
  const onClickEditComplete = (e) => {
    e.preventDefault()
    if ((formText === '' && formTextDetail === '') || (editIndex === null) ) return
    //formが空じゃない場合はセットする
    if(formText !== ''){
      todos[editIndex] = formText
    }
    if(formTextDetail !== ''){
      todosDetail[editIndex] = formTextDetail
    }
    setFormText('')
    setFormTextDetail('')
    //編集モード終了
    setFormFlag(true)
    //初期化しておく
    setEditIndex(null);
  }

  //未着手リストから進行中リストに移動する
  /**
   * 未着手リストから進行中リストにTodoを移動する
   * @module onClickTodoStart
   * @param {number} index 移動対象のindex 
   */
  const onClickTodoStart = (index) => {
    setOngoingTodos([...ongoingTodos, todos[index]]);
    setOngoingTodosDetail([...ongoingTodosDetail, todosDetail[index]]);
    //未着手リストから削除する
    const todosCopy = [...todos];
    const todosDetailCopy = [...todosDetail];
    todosCopy.splice(index, 1);
    todosDetailCopy.splice(index, 1);
    setTodos(todosCopy)
    setTodosDetail(todosDetailCopy)
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  /** 進行中 */
  /**
   * 進行中リストから未着手リストに移動する
   * @module onClickOngoingRemove
   * @param {number} index 移動対象のindex
   */
  const onClickOngoingRemove = (index) => {
    setTodos([...todos, ongoingTodos[index]]);
    setTodosDetail([...todosDetail, ongoingTodosDetail[index]]);
    //進行中リストから削除する
    const todosCopy = [...ongoingTodos];
    const todosDetailCopy = [...ongoingTodosDetail];
    todosCopy.splice(index, 1);
    todosDetailCopy.splice(index, 1);
    setOngoingTodos(todosCopy)
    setOngoingTodosDetail(todosDetailCopy)
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
}

  /**
   * 進行中リストから完了リストに移動する
   * @module onClickTodoComplete
   * @param {number} index 移動対象のindex 
   */
  const onClickTodoComplete = (index) => {
    setCompleteTodos([...completeTodos, ongoingTodos[index]]);
    setCompleteTodosDetail([...completeTodosDetail, ongoingTodosDetail[index]]);
    //未着手リストから削除する
    const todosCopy = [...ongoingTodos];
    const todosDetailCopy = [...ongoingTodosDetail];
    todosCopy.splice(index, 1);
    todosDetailCopy.splice(index, 1);
    setOngoingTodos(todosCopy)
    setOngoingTodosDetail(todosDetailCopy)
    //編集中モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  /**
   * 進行中リストからTodoを削除する
   * @module onClickOngoingDeleteTodo
   * @param {number} index 削除対象のindex
   */
  const onClickOngoingDeleteTodo = (index) => {
    const todosCopy = [...ongoingTodos];
    const todosDetailCopy = [...ongoingTodosDetail];
    todosCopy.splice(index, 1);
    todosDetailCopy.splice(index, 1);
    setOngoingTodos(todosCopy)
    setOngoingTodosDetail(todosDetailCopy)
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  /** 完了 */
  /**
   * 完了リストから進行中リストに移動する
   * @module onClickCompleteRemove
   * @param {number} index 移動対象のindex
   */
  const onClickCompleteRemove = (index) => {
    setOngoingTodos([...ongoingTodos, completeTodos[index]]);
    setOngoingTodosDetail([...ongoingTodosDetail, completeTodosDetail[index]]);
    //進行中リストから削除する
    const todosCopy = [...completeTodos];
    const todosDetailCopy = [...completeTodosDetail];
    todosCopy.splice(index, 1);
    todosDetailCopy.splice(index, 1);
    setCompleteTodos(todosCopy)
    setCompleteTodosDetail(todosDetailCopy)
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }
  
  /**
   * 完了リストからTodoを削除する
   * @module onClickCompleteDeleteTodo
   * @param {number} index 削除対象のindex
   */
  const onClickCompleteDeleteTodo = (index) => {
    const todosCopy = [...completeTodos];
    const todosDetailCopy = [...completeTodosDetail];
    todosCopy.splice(index, 1);
    todosDetailCopy.splice(index, 1);
    setCompleteTodos(todosCopy)
    setCompleteTodosDetail(todosDetailCopy)
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true)
    }
  }

  return (
    <>
    {formFlag ?
      /** 通常モード */
      <NormalForm 
        formText={formText}
        formTextDetail={formTextDetail}
        setFormText={setFormText}
        setFormTextDetail={setFormTextDetail}
        onClickSetTodo={onClickSetTodo}
      />
      :
      /** 編集モード */
      <EditForm 
        formText={formText}
        formTextDetail={formTextDetail}
        setFormText={setFormText}
        setFormTextDetail={setFormTextDetail}
        onClickEditComplete={onClickEditComplete}
      />
    }
      {/* リスト */}
      <UntouchedList
        todos={todos}
        todosDetail={todosDetail}
        onClickEdit={onClickEdit}
        onClickTodoStart={onClickTodoStart}
        onClickDeleteTodo={onClickDeleteTodo}
      />
      <OngoingList 
        ongoingTodos={ongoingTodos}
        ongoingTodosDetail={ongoingTodosDetail}
        onClickOngoingRemove={onClickOngoingRemove}
        onClickTodoComplete={onClickTodoComplete}
        onClickOngoingDeleteTodo={onClickOngoingDeleteTodo}
      />
      <CompleteList 
        completeTodos={completeTodos}
        completeTodosDetail={completeTodosDetail}
        onClickCompleteRemove={onClickCompleteRemove}
        onClickCompleteDeleteTodo={onClickCompleteDeleteTodo}
      />
    </>
  )
}

export default App;
