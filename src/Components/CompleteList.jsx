import React from 'react'

export default function CompleteList(props) {
  return (
    <>
      <ul style={{listStyle: 'none'}}>
        <div className='complete'>
          <br></br>
          <label>完了リスト</label>
          <br></br>
          {props.completeTodos.map((completeTodo, index) => {
            return (
              <div key={index}>
                <li>
                {`${index+1}: `}{completeTodo}
                </li>
                <button className='removeButton' onClick={() => props.onClickCompleteRemove(index)}>戻す</button>
                <button onClick={() => props.onClickCompleteDeleteTodo(index)}>削除</button>
              </div>
            )
          })}
        </div>
      </ul>
    </>
  )
}
