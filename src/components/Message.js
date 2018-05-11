import React from 'react'

const Message = ( {message:{ id, subject, read, starred, selected, labels}, handleCheckBox, handleStar}) => {

  return (
  <div className={isReadAndSelected(read, selected)}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox"
          checked={selected}
          onChange={(event) => handleCheckBox(id, event.target.checked)}/>
        </div>
        <div className="col-xs-2">
          <i className={isStarred(starred)}
           onClick={(event) => handleStar(id, starred)}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      {labelDisplay(labels)}
      <a href="#">
        {subject}
      </a>
    </div>
  </div>
)
}

function isStarred(starred){
  if (starred){
    return "star fa fa-star"
  } else {
    return "star fa fa-star-o"
  }
}

function labelDisplay(labels){
  let labelSpans = labels.map(label => {
    // console.log(label);
    return <span className="label label-warning">{label}</span>
  })
  return labelSpans
}

function isReadAndSelected(read, selected){
  if(read && selected){
    return "row message read selected"
  } else if (read){
    return "row message read"
  } else if (selected){
    return "row message selected"
  } else {
    return "row message unread"
    }
}

export default Message
