import React from 'react'

export default function OngoingList(props) {
  return (
    <>
      <ul style={{listStyle: 'none'}}>
        <div className='ongoingTodo'>
          <br></br>
          <label>進行中リスト</label>
          {props.ongoingTodos.map((ongoingTodo, index) => {
            return (
              <div key={index}>
                <li>
                {`${index+1}: `}{ongoingTodo}
                </li>
                <button className='removeButton' onClick={() => props.onClickOngoingRemove(index)}>戻す</button>
                <button className='startButton' onClick={() => props.onClickTodoComplete(index)}>完了</button>
                <button className='deleteButton' onClick={() => props.onClickOngoingDeleteTodo(index)}>削除</button>
              </div>
            )
          })}
        </div>
      </ul>
    </>
  )
}
