import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [socket,setSocket] = useState<WebSocket | null>(null);
  const inputRef =useRef<HTMLInputElement>(null)
  function SendMessage(){
    const message = inputRef.current?.value
    if (!socket) {
    console.log("Socket doesn't exist");
    return;
  }

  if (socket.readyState !== WebSocket.OPEN) {
    console.log("Socket not open");
    return;
  }

    //@ts-ignore
    socket.send(message)

  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws)
    

    ws.onmessage = (ev)=>{
      alert(ev.data)

    }

  },[])
  return (
    <div>
      <input ref={inputRef} type="text" placeholder='Message..'></input>
      <button onClick={SendMessage} type="submit">send</button>
      
    </div>
  )
}

export default App
