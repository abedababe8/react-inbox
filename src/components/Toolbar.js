import React from 'react'

const Toolbar = ({messages, handleMarkRead, handleMarkUnread, unselectAll, selectAll, addLabel, removeLabel, trashCan, showCompose}) => (
  <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{findAllUnread(messages)}</span>
      unread messages
    </p>

    <a className="btn btn-danger"
    onClick={(event) => showCompose()}>
      <i className="fa fa-plus"></i>
    </a>

    <button className="btn btn-default"
    onClick={(event) => checkSelected(messages, unselectAll, selectAll)}>
      <i className={checkSomeSelected(messages)}></i>
    </button>

    <button className="btn btn-default"
    disabled={checkNoneSelected(messages)}
    onClick={event => handleMarkRead()}>
      Mark As Read
    </button>

    <button className="btn btn-default"
    disabled={checkNoneSelected(messages)}
    onClick={event => handleMarkUnread()}>
      Mark As Unread
    </button>

    <select className="form-control label-select"
    disabled={checkNoneSelected(messages)}
    onChange={event => addLabel(event.target.value)}>
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select"
    disabled={checkNoneSelected(messages)}
    onChange={event => removeLabel(event.target.value)}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default"
    disabled={checkNoneSelected(messages)}
    onClick={event => trashCan()}>
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
)

function checkSelected(messages, unselectAll, selectAll){
  const selectedItems = messages.filter(item => item.selected === true)
    if (selectedItems.length > 0){
      if (selectedItems.length === messages.length){
        unselectAll()
      } else {
        selectAll()
      }
    } else {
      selectAll()
    }
}

function checkSomeSelected(messages){
  const selectedItems = messages.filter(item => item.selected === true)
  if (selectedItems.length > 0){
    if (selectedItems.length === messages.length){
      return "fa fa-check-square-o"
    } else {
      return "fa fa-minus-square-o"
    }
  } else {
    return "fa fa-square-o"
  }
}
function checkNoneSelected(messages){
  const selectedItems = messages.filter(item => item.selected === true)
  if (selectedItems.length === 0){
    return "disabled"
  } else {
    return ""
  }
}

function findAllUnread(messages){
  return messages.reduce((total, message) => !message.read ? total + 1 : total ,0)
}

export default Toolbar
