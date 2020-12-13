import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './ChatLogin.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join a ChatRoom</h1>
        <br/>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Choose an activity to talk about with friends" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chatroom?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Enter Room</button>
        </Link>
      </div>
    </div>
  );
}