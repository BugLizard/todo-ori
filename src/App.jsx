import React, { useState } from "react";
import CompleteList from "./Components/CompleteList";
import EditForm from "./Components/EditForm";
import NormalForm from "./Components/NormalForm";
import OngoingList from "./Components/OngoingList";
import UntouchedList from "./Components/UntouchedList";

function App() {
  /** Todo List */
  /**
   * 未着手リスト
   * */
  const [untouchedList, setUntouchedList] = useState([]);

  /**
   * 進行中リスト
   * */
  const [ongoingList, setOngoingList] = useState([]);

  /**
   * 完了リスト
   * */
  const [completeList, setCompleteList] = useState([]);

  /** form */
  /**
   * 入力内容保持
   * */
  const [formText, setFormText] = useState("");
  const [formTextDetail, setFormTextDetail] = useState("");

  /**
   * form切り替えフラグ
   * @type {boolean} true: 通常モード　false: 編集中モード
   */
  const [formFlag, setFormFlag] = useState(true);

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
    setFormFlag(!formFlag);
    //indexをセット
    setEditIndex(index);
  };

  /** 未着手処理 */
  /**
   * form内の入力値を未着手リストにセット
   * @module onClickSetTodo
   * @param {*} e
   * @return void formTextが空の場合は処理を行わない
   */
  const onClickSetTodo = (e) => {
    e.preventDefault();
    if (formText === "") return;
    setUntouchedList([
      ...untouchedList,
      {
        id: untouchedList.length + 1,
        title: formText,
        detail: formTextDetail,
      },
    ]);
    setFormText("");
    setFormTextDetail("");
  };

  /**
   * 未着手リストからTodoを削除
   * @module onClickDeleteTodo
   * @param {number} index 削除対象のindex
   */
  const onClickDeleteTodo = (index) => {
    const untouchedListCopy = untouchedList.filter((todo) => todo.id !== index);
    setUntouchedList(untouchedListCopy);
    //編集中なら戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  /**
   * 編集処理
   * @module onClickEditComplete
   * @param {*} e
   * @returns void formTextが空の場合は処理を行わない
   */
  const onClickEditComplete = (e) => {
    e.preventDefault();
    if ((formText === "" && formTextDetail === "") || editIndex === null)
      return;
    //formが空じゃない場合はセットする
    const editTodoList = untouchedList.map((todo) => {
      if (todo.id !== editIndex) return todo;
      return {
        id: todo.id,
        title: formText !== "" ? formText : todo.title,
        detail: formTextDetail !== "" ? formTextDetail : todo.detail,
      };
    });
    setUntouchedList(editTodoList);
    setFormText("");
    setFormTextDetail("");
    //編集モード終了
    setFormFlag(true);
    //初期化しておく
    setEditIndex(null);
  };

  //未着手リストから進行中リストに移動する
  /**
   * 未着手リストから進行中リストにTodoを移動する
   * @module onClickTodoStart
   * @param {number} index 移動対象のindex
   */
  const onClickTodoStart = (index) => {
    const targetTodo = untouchedList.find((todo) => todo.id === index);
    setOngoingList([...ongoingList, targetTodo]);
    //未着手リストから削除する
    const untouchedListCopy = untouchedList.filter((todo) => todo.id !== index);
    setUntouchedList(untouchedListCopy);
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  /** 進行中 */
  /**
   * 進行中リストから未着手リストに移動する
   * @module onClickOngoingRemove
   * @param {number} index 移動対象のindex
   */
  const onClickOngoingRemove = (index) => {
    const removeTargetTodo = ongoingList.find((todo) => todo.id === index);
    setUntouchedList([...untouchedList, removeTargetTodo]);
    //進行中リストから削除する
    const ongoingListCopy = ongoingList.filter((todo) => todo.id !== index);
    setOngoingList(ongoingListCopy);
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  /**
   * 進行中リストから完了リストに移動する
   * @module onClickTodoComplete
   * @param {number} index 移動対象のindex
   */
  const onClickTodoComplete = (index) => {
    const targetTodo = ongoingList.find((todo) => todo.id === index);
    setCompleteList([...completeList, targetTodo]);
    //未着手リストから削除する
    const ongoingListCopy = ongoingList.filter((todo) => todo.id !== index);
    setOngoingList(ongoingListCopy);
    //編集中モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  /**
   * 進行中リストからTodoを削除する
   * @module onClickOngoingDeleteTodo
   * @param {number} index 削除対象のindex
   */
  const onClickOngoingDeleteTodo = (index) => {
    const ongoingListCopy = ongoingList.filter((todo) => todo.id !== index);
    setOngoingList(ongoingListCopy);
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  /** 完了 */
  /**
   * 完了リストから進行中リストに移動する
   * @module onClickCompleteRemove
   * @param {number} index 移動対象のindex
   */
  const onClickCompleteRemove = (index) => {
    const removeTargetTodo = completeList.find((todo) => todo.id === index);
    setOngoingList([...ongoingList, removeTargetTodo]);
    //進行中リストから削除する
    const completeListCopy = completeList.filter((todo) => todo.id !== index);
    setCompleteList(completeListCopy);
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  /**
   * 完了リストからTodoを削除する
   * @module onClickCompleteDeleteTodo
   * @param {number} index 削除対象のindex
   */
  const onClickCompleteDeleteTodo = (index) => {
    const completeListCopy = completeList.filter((todo) => todo.id !== index);
    setCompleteList(completeListCopy);
    //編集モードの場合は戻す
    if (formFlag === false) {
      setFormFlag(true);
    }
  };

  return (
    <>
      {formFlag ? (
        /** 通常モード */
        <NormalForm
          formText={formText}
          formTextDetail={formTextDetail}
          setFormText={setFormText}
          setFormTextDetail={setFormTextDetail}
          onClickSetTodo={onClickSetTodo}
        />
      ) : (
        /** 編集モード */
        <EditForm
          formText={formText}
          formTextDetail={formTextDetail}
          setFormText={setFormText}
          setFormTextDetail={setFormTextDetail}
          onClickEditComplete={onClickEditComplete}
        />
      )}
      {/* リスト */}
      <UntouchedList
        untouchedList={untouchedList}
        onClickEdit={onClickEdit}
        onClickTodoStart={onClickTodoStart}
        onClickDeleteTodo={onClickDeleteTodo}
      />
      <OngoingList
        ongoingList={ongoingList}
        onClickOngoingRemove={onClickOngoingRemove}
        onClickTodoComplete={onClickTodoComplete}
        onClickOngoingDeleteTodo={onClickOngoingDeleteTodo}
      />
      <CompleteList
        completeList={completeList}
        onClickCompleteRemove={onClickCompleteRemove}
        onClickCompleteDeleteTodo={onClickCompleteDeleteTodo}
      />
    </>
  );
}

export default App;
