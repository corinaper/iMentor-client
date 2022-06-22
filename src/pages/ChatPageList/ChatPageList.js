import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import chatService from "../../services/chat.service";
import {  useNavigate } from "react-router-dom";
import socket from "../../components/Socket/Socket";
import '../ChatPageList/ChatPageList.css'

export default function ChatList() {

  const [chats, setChats] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate()

  const getAllChats = () => {
    chatService
      .getOne("chats", id)
      .then((response) => setChats(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    socket.on('updateChat', users => {
        if (users.includes(id)) {
            getAllChats()
        }
    })
}, []);

  return ( 
    <div>
      <div>

        <h1 className="page-title">Chat List</h1>

        <div className="chat-list">
          {chats.map((chat) => {
            const otherUser = chat.user1._id === id ? chat.user2 : chat.user1
            return (
              <div key={chat._id} className="chat-card" onClick={() => navigate(`/chats/${id}/${otherUser._id}`)}>
                <div className="flex">
                  <img src={otherUser.profileImg} className="chat-img" alt=""/>
                  <div>
                  <h2 className="chat-name">{otherUser.username}</h2>
              
                    {(chat.messages[chat.messages.length - 1]?.sender === id) && 
                      <p className="message-preview-content">You: {chat.messages[chat.messages.length - 1]?.content}</p>
                    }
                    
                    {(chat.messages[chat.messages.length - 1]?.sender === otherUser._id) &&
                      <p className="message-preview-content">{otherUser.name}: {chat.messages[chat.messages.length - 1]?.content}</p>
                    }
                    {((Math.floor((new Date().getTime() - new Date(chat.messages[chat.messages.length - 1]?.createdAt).getTime()) / (1000 * 3600 * 24))) > 0 && chat.messages.length > 0) && 
                    <p className="chat-message-time">{`${(Math.floor((new Date().getTime() - new Date(chat.messages[chat.messages.length - 1].createdAt).getTime()) / (1000 * 3600 * 24)))} days ago`}</p>}
                    
                    {!((Math.floor((new Date().getTime() - new Date(chat.messages[chat.messages.length - 1]?.createdAt).getTime()) / (1000 * 3600 * 24))) > 0) && chat.messages.length > 0 && 
                    <p className="chat-message-time">{`At ${new Date(chat.messages[chat.messages.length - 1]?.createdAt).getHours()}:${new Date(chat.messages[chat.messages.length - 1]?.createdAt).getMinutes()}`}</p>}
                    
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
  