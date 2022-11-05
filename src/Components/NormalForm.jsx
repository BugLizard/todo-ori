import React from 'react'

export default function NormalForm(props) {
  return (
    <>
      <form>
        <label htmlFor="todo">Todo:</label>
        <br></br>
        <input
          className="formInput"
          type="text"
          placeholder="予定は？"
          value={props.formText}
          onChange={(e) => {
            props.setFormText(e.target.value)
          }}
        />
        <br/>
        <textarea 
          name='formDetail'
          placeholder='詳細'
          value={props.formTextDetail}
          onChange={(e) => {
            props.setFormTextDetail(e.target.value)
          }}
        />
        <button
          className="formAddButton"
          type="submit"
          onClick={props.onClickSetTodo}
        >
          追加
        </button>
      </form>
    </>
  )
}
