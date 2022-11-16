import React from "react";

export default function CompleteList(props) {
  const { completeList, onClickCompleteRemove, onClickCompleteDeleteTodo } =
    props;
  return (
    <>
      <ul style={{ listStyle: "none" }}>
        <div className="complete">
          <br></br>
          <label>完了リスト</label>
          <br />
          <ul style={{ listStyle: "none" }}>
            {completeList.map((todo) => (
              <li key={todo.id}>
                {todo.id}: {todo.title}
                <br />
                {todo.detail}
                <button
                  className="removeButton"
                  onClick={() => onClickCompleteRemove(todo.id)}
                >
                  戻す
                </button>
                <button onClick={() => onClickCompleteDeleteTodo(todo.id)}>
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
