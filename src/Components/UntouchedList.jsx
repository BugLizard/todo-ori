import React from 'react'

export default function UntouchedList(props) {
  const TodosTakeOut = () =>  {
    const result = [];
    for(let i = 0; i < props.todos.length; i++){
      result.push(
        <li>
          { i + 1 }: { props.todos[i] }
          <br />
          {props.todosDetail[i]}
          <button className='editButton' onClick={() => props.onClickEdit(i)}>編集</button>
          <button className='startButton' onClick={() => props.onClickTodoStart(i)}>開始</button>
          <button className='deleteButton' onClick={() => props.onClickDeleteTodo(i)}>削除</button>
        </li>
      )
    }
    return <ul style={{listStyle: 'none'}}>{ result }</ul>;
  }

  return (
    <>
      <ul style={{listStyle: 'none'}}>
        <div className='untouched'>
          <label>未着手リスト</label>
          {TodosTakeOut()}
        </div>
      </ul>
    </>
  )
}
