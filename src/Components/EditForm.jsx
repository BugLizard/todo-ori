import React from 'react'

export default function EditForm(props) {
  return (
    <>
        <form>
          <label htmlFor="todo">編集モード:</label>
          <br></br>
          <input
            className="formInput"
            type="text"
            placeholder="編集内容は？"
            value={props.formText}
            onChange={(e) => {
              props.setFormText(e.target.value)
            }}
          />
          <button
            className="formAddButton"
            type="submit"
            onClick={props.onClickEditComplete}
          >
            編集完了
          </button>
        </form>
    </>
  )
}
