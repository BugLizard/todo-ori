import React from 'react'

export default function UntouchedList(props) {
  return (
    <>
      <ul style={{listStyle: 'none'}}>
        <div className='untouched'>
          <label>未着手リスト</label>
          {props.todos.map((todo, index) => {
            return (
              <div key={index}>
                <li>
                  {`${index+1}: `}{todo}
                </li>
                <button className='editButton' onClick={() => props.onClickEdit(index)}>編集</button>
                <button className='startButton' onClick={() => props.onClickTodoStart(index)}>開始</button>
                <button className='deleteButton' onClick={() => props.onClickDeleteTodo(index)}>削除</button>
              </div>
            )
          })}
        </div>
      </ul>
    </>
  )
}
