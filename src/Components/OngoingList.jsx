import React from "react";

export default function OngoingList(props) {
  const {
    ongoingList,
    onClickOngoingRemove,
    onClickTodoComplete,
    onClickOngoingDeleteTodo,
  } = props;

  return (
    <>
      <ul style={{ listStyle: "none" }}>
        <div className="ongoingTodo">
          <br />
          <label>進行中リスト</label>
          <ul style={{ listStyle: "none" }}>
            {ongoingList.map((todo) => (
              <li key={todo.id}>
                {todo.id}: {todo.title}
                <br />
                {todo.detail}
                <button
                  className="removeButton"
                  onClick={() => onClickOngoingRemove(todo.id)}
                >
                  戻す
                </button>
                <button
                  className="startButton"
                  onClick={() => onClickTodoComplete(todo.id)}
                >
                  完了
                </button>
                <button
                  className="deleteButton"
                  onClick={() => onClickOngoingDeleteTodo(todo.id)}
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
