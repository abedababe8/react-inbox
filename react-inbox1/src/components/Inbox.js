import React, { Component } from 'react'
import Messages from './Messages'
import Toolbar from './Toolbar'

import messageData from '../data'

class Inbox extends Component{
  constructor(props){
    super(props)
    this.state = {
      messages: messageData
    }
  }

  unselectAll = () => {
    const allFalse = this.state.messages.map(message => ({...message, selected: false}))
    this.setState({messages: allFalse})
  }
  selectAll = () => {
    const allTrue = this.state.messages.map(message => ({...message, selected: true}))
    this.setState({messages: allTrue})
  }

  handleCheckBox = (id, selected) => {
    const checked = this.state.messages.map(message => message.id === id ? {...message, selected} : {...message})
    this.setState( { messages: checked })
  }
  handleStar = (id) => {
    const star = this.state.messages.map(message => message.id === id ? {...message, starred:!message.starred} : {...message})
    this.setState({messages: star})
  }

  handleMarkRead = () => {
    const allRead = this.state.messages.map(message => message.selected === true ? ({...message, read: true, selected: false}) : ({...message}))
    this.setState({messages: allRead})
    // this.unselectAll()
  }
  handleMarkUnread = () => {
    const noneRead = this.state.messages.map(message => message.selected === true ? ({...message, read: false, selected: false}) : ({...message}))
    this.setState({messages: noneRead})
  }

  addLabel = (label) => {
    const selectedForLabel = this.state.messages.map(message => {
      if(message.selected === true && message.labels.indexOf(label) === -1){
        return ({...message, labels:[...message.labels, label]})
      } else {
        return ({...message})
      }
    })
    this.setState({messages: selectedForLabel})
  }
  removeLabel = (label) => {
    const selectedForRemoveLabel = this.state.messages.map(message => {
      if(message.selected === true && message.labels.indexOf(label) !== -1){
        return ({...message, labels:[...message.labels.filter(l => l !== label)]})
      } else {
        return ({...message})
      }
    })
    this.setState({messages: selectedForRemoveLabel})
  }

  trashCan = () => {
    const selectedForTrash = this.state.messages.filter(message => {
      if(message.selected === true){
        return false
      } else {
        return true
      }
  })
  console.log(selectedForTrash);
  this.setState({messages: selectedForTrash})
}


  render(){
    return (
      <div>
      <Toolbar
       messages = { this.state.messages }
       handleMarkRead = {this.handleMarkRead}
       handleMarkUnread = {this.handleMarkUnread}
       unselectAll = {this.unselectAll}
       selectAll = {this.selectAll}
       addLabel = {this.addLabel}
       removeLabel = {this.removeLabel}
       trashCan = {this.trashCan}
      />

      <Messages
       messages = { this.state.messages }
       handleCheckBox = {this.handleCheckBox}
       handleStar = {this.handleStar}
      />
      </div>
    )
  }
}
 export default Inbox

 // {
 //   handleMarkRead = this.handleMarkRead()/>
 // }
