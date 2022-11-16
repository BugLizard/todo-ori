import React from "react";

export default function UntouchedList(props) {
  const { untouchedList, onClickEdit, onClickTodoStart, onClickDeleteTodo } =
    props;
  return (
    <>
      <ul style={{ listStyle: "none" }}>
        <div className="untouched">
          <label>未着手リスト</label>
          <ul style={{ listStyle: "none" }}>
            {untouchedList.map((todo) => (
              <li key={todo.id}>
                {todo.id}: {todo.title}
                <br />
                {todo.detail}
                <button
                  className="editButton"
                  onClick={() => onClickEdit(todo.id)}
                >
                  編集
                </button>
                <button
                  className="startButton"
                  onClick={() => onClickTodoStart(todo.id)}
                >
                  開始
                </button>
                <button
                  className="deleteButton"
                  onClick={() => onClickDeleteTodo(todo.id)}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </>
  );
}
