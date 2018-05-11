import React from 'react'
import Message from './Message'

export default ( props ) => {
  const {messages, handleCheckBox, handleStar} = props
  let allMessages = messages.map(message => {
    return <Message key={message.id} message={message} handleCheckBox={handleCheckBox} handleStar={handleStar} />
  })
  return (
    <div>
      <ul>
        { allMessages }
      </ul>
    </div>
  )
}
