import React from 'react'

export default function OngoingList(props) {
  const ongoingTodosTakeOut = () =>  {
    const result = [];
    for(let i = 0; i < props.ongoingTodos.length; i++){
      result.push(
        <li>
          { i + 1 }: { props.ongoingTodos[i] }
          <br />
          {props.ongoingTodosDetail[i]}
          <button className='removeButton' onClick={() => props.onClickOngoingRemove(i)}>戻す</button>
          <button className='startButton' onClick={() => props.onClickTodoComplete(i)}>完了</button>
          <button className='deleteButton' onClick={() => props.onClickOngoingDeleteTodo(i)}>削除</button>
        </li>
      )
    }
    return <ul style={{listStyle: 'none'}}>{ result }</ul>;
  }
  return (
    <>
      <ul style={{listStyle: 'none'}}>
        <div className='ongoingTodo'>
          <br />
          <label>進行中リスト</label>
          {ongoingTodosTakeOut()}
        </div>
      </ul>
    </>
  )
}
