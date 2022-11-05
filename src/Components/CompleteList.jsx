import React from 'react'

export default function CompleteList(props) {
  const completeTodosTakeOut = () =>  {
    const result = [];
    for(let i = 0; i < props.completeTodos.length; i++){
      result.push(
        <li>
          { i + 1 }: { props.completeTodos[i] }
          <br />
          {props.completeTodosDetail[i]}
          <button className='removeButton' onClick={() => props.onClickCompleteRemove(i)}>戻す</button>
          <button onClick={() => props.onClickCompleteDeleteTodo(i)}>削除</button>
        </li>
      )
    }
    return <ul style={{listStyle: 'none'}}>{ result }</ul>;
  }
  return (
    <>
      <ul style={{listStyle: 'none'}}>
        <div className='complete'>
          <br></br>
          <label>完了リスト</label>
          <br />
          {completeTodosTakeOut()}
        </div>
      </ul>
    </>
  )
}
