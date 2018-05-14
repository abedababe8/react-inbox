import React, { Component } from 'react'
import Messages from './Messages'
import Toolbar from './Toolbar'
import Compose from './Compose'
import axios from 'axios'

import messageData from '../data'

class Inbox extends Component{
  constructor(props){
    super(props)
    this.state = {
      compose: false,
      messages: []
    }
  }
  componentDidMount = () => {
    this.getAllMessages()
  }

getAllMessages = () => {
  axios.get('http://localhost:8082/api/messages')
  .then(allMess => {
    console.log(allMess);
    this.setState({messages: allMess.data})
  })

}
  showCompose = () => {
    this.setState({compose: !this.state.compose})
  }
  handleCompose = (event) => {
    event.preventDefault()
    const subject = event.target.subject.value
    const body = event.target.body.value
    axios.post('http://localhost:8082/api/messages', {subject, body})
    .then(response => {
      this.getAllMessages()
      this.showCompose()
    })
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
    axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command: 'star'})
    .then(response => {
      this.getAllMessages()
    })
    // const star = this.state.messages.map(message => message.id === id ? {...message, starred:!message.starred} : {...message})
    // this.setState({messages: star})
  }

  handleMarkRead = () => {
    const filteredForRead = this.state.messages.filter(message => {
      if(message.selected === true){
        return message.id
      }
    })
    const selectedForRead = filteredForRead.map(message => message.id)
    console.log(filteredForRead, selectedForRead);
    axios.patch('http://localhost:8082/api/messages', {messageIds: selectedForRead, read: true, command: 'read'})

    .then(response => {
      this.getAllMessages()
    })
  }
  handleMarkUnread = () => {
    const filteredForUnread = this.state.messages.filter(message => {
      if(message.selected === true){
        return message.id
      }
    })
    const selectedForUnread = filteredForUnread.map(message => message.id)
    console.log(filteredForUnread, selectedForUnread);
    axios.patch('http://localhost:8082/api/messages', {messageIds: selectedForUnread, read: false, command: 'read'})
    .then(response => {
      this.getAllMessages()
    })
  }

  addLabel = (label) => {
    const filteredForAddLabel = this.state.messages.filter(message => {
      if(message.selected === true){
        return message.id
      }
    })
    const selectedForAddLabel = filteredForAddLabel.map(message => message.id)
      axios.patch('http://localhost:8082/api/messages', {messageIds:selectedForAddLabel, label, command: 'addLabel'})
      .then(response => {
        this.getAllMessages()
      })
  }
  removeLabel = (label) => {
    const filteredForUnreadLabel = this.state.messages.filter(message => {
      if(message.selected === true){
        return message.id
      }
    })
    const selectedForUnreadLabel = filteredForUnreadLabel.map(message => message.id)
      axios.patch('http://localhost:8082/api/messages', {messageIds:selectedForUnreadLabel, label, command: 'removeLabel'})
      .then(response => {
        this.getAllMessages()
      })
  }

  trashCan = () => {
    const filteredForTrash = this.state.messages.filter(message => {
      if(message.selected === true){
        return message.id
      }
    })
    const selectedForTrash = filteredForTrash.map(message => message.id)
  console.log(selectedForTrash);
  axios.patch('http://localhost:8082/api/messages', {messageIds:selectedForTrash, command:'delete'})
  .then(response => {
    this.getAllMessages()
  })
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
       showCompose = {this.showCompose}
      />
      {
        this.state.compose ? <Compose handleCompose={this.handleCompose}/> : null
      }
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
