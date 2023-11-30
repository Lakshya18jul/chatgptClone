import './App.css';
import './normal.css'
import {useState} from "react";

function App() {

 const [input, setInput] = useState("");
 const [chatLog, setChatLog] = useState([{
  user:"gpt",
  message:"How can I help you"
 },{
  user:"me",
  message:"I want to use chatGPT"
 }
]);

function clearChat(){
  setChatLog([]);
}


  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew=[...chatLog,{user:"me",message:`${input}`} ]
    //  setChatLog([...chatLog,{user:"me",message:`${input}`}])
     setInput("");
     setChatLog(chatLogNew);
    // fetch response to the api combiing the chat log array of messages and sending it as a
    // message to the localhost 3000 as a post
    const messages=chatLogNew.map((message)=>message.message).join("\n")
    const response=await fetch("http://localhost:3080/",{
     method: "POST",
     headers:{
      "Content-Type":"application/json"
     },
     body: JSON.stringify({
       message:messages
     })
  });
  const data=await response.json();
  
  setChatLog([...chatLogNew, {user:"gpt" , message: `${data.message}`}])
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div
        className="side-menu-button" onClick={clearChat} >
          <span>
            +
          </span>
          New chat
        </div>
      </aside>
      <section className="chatbox">
      <div  className="chat-log">
      {chatLog.map((message,index)=>{
        return <ChatMessage key={index} message={message} />
      })} 
      
      </div>
       <div
       className="chat-input-holder">
        <form onSubmit={handleSubmit}> 
        <input
        rows="1"
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        className="chat-input-textarea"
        >
        </input>
        </form>
       </div>
      </section>
    </div>
  );
}


const ChatMessage=({message}) =>{
  return(
    
      <div className={`chat-message ${message.user==="gpt" && "chatgpt"}`}>
      <div className="chat-message-center">

      <div className={`avatar ${message.user==="gpt" && "chatgpt"}`}>
   
      </div>
      <div className="message">
         {message.message}
      </div>
      </div>
      </div>
  )
}

export default App;
