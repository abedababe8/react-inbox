import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Inbox from './components/Inbox'
// import Messages from './components/Messages'
// import Toolbar from './components/Toolbar'

class App extends Component {
  render() {
    return (
      <div>
        <Inbox />
      </div>
    );
  }
}

export default App;
// <Messages messages={messageData}/>
