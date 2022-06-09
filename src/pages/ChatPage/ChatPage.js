import axios from "axios";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import chatService from "../../services/chat.service";
import { Link } from "react-router-dom";
import socket from "../../components/Socket/Socket";
import '../ChatPage/ChatPage.css'

export default function ChatList() {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])
    const [receiver, setReceiver] = useState({})
    const [chat, setChat] = useState({})

    const { id, otherId } = useParams()
    
    // Send the token through the request "Authorization" Headers
    async function chats() {
    const chat = await chatService.getAll(`chats/${id}/${otherId}`)
    return chat;    
    }
    const getAllMessages = () => {

        
        console.log("CHATS ", chats())

        if(chats().data)
            {
                chatService
                .getAll(`chats/${id}/${otherId}`)
                .then((response) => {
                    setReceiver(response.data.user1._id === id ? response.data.user2 : response.data.user1)
                    setMessages(response.data.messages)
                    setChat(response.data)
                })
                .catch((error) => console.log(error));
            }else{
                chatService
                    .createChat(id, otherId)
                    .then(response => {
                        setChat(response.data) 
                        setReceiver(response.data.user1._id === id ? response.data.user2 : response.data.user1)
                        setMessages(response.data.messages)
                    })
            }
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []

    
    useEffect(() => {
        /*setInterval(()=> {
        getAllMessages();
        }, 1000);*/
        const interval = setInterval(() => {
            getAllMessages();
          }, 750);
          return () => clearInterval(interval);
    }, []);

    const divRef = useRef(null)

    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' })
    })

    useEffect(() => {
        socket.on('updateChat', users => {
            if (users.includes(id)) {
                getAllMessages()
            }
        })
    }, []);
    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            addNewMessage();
        }
    }
    
    
    const addNewMessage = () => {
        
        if(newMessage){
            chatService.createOne(`chats/newMessage/${chat._id}`, { content: newMessage, sender: id, receiver: otherId })
            .then(response => {
                socket.emit('newMessage', [response.data.sender, response.data.receiver])
                setNewMessage("")
            })
        }
        
    }
    

      return !messages.length ? (
            <div className="chat-page ">
                    <img src={receiver.profileImg} alt="" className="userImage"></img>
                    <h2>{receiver.username}</h2>
                <div className="chat-box">
                    <div className="chat-display-box">
                    </div>
                    <div className="message-box">
                        <textarea onChange={e => setNewMessage(e.target.value)} value={newMessage} onKeyDown={onEnterPress}></textarea>
                        <button type="submit" onClick={addNewMessage}><i className="fa fa-send" style={{color:"blue"}}>submit</i></button>
                    </div>
                </div>
            </div>
        ):(
            <div className="chat-page  ">
            <div className="userDetails">
                    <img src={receiver.profileImg} alt="" className="userImage"></img>
                    <h2>{receiver.username}</h2>
            </div>
                <div className="chat-box">
                    
                    <div className="chat-display-box">

                        {messages.map((message) => {
                            const messageDate = new Date(message.createdAt)
                            const daysPassed = Math.floor((new Date().getTime() - messageDate.getTime()) / (1000 * 3600 * 24))
                            const messageFooter = daysPassed > 0 ? `${daysPassed} days ago` : `At ${messageDate.getHours()}:${messageDate.getMinutes()}`

                            return message.sender === id ? (

                                <div key={message._id} className="my-message-div-container">
                                    <div className="my-message-div">
                                        <p className="my-message-content">{message.content}</p>
                                        <p className="my-message-date">{messageFooter}</p>
                                    </div>
                                </div>

                            ) : (
                                <div key={message._id} className="other-message-div-container">
                                    <div className="other-message-div">
                                        <p className="other-message-content">{message.content}</p>
                                        <p className="other-message-date">{messageFooter}</p>
                                    </div>

                                </div>
                            )
                        },
                        )}
                        <div ref={divRef}></div>
                        
                    </div>
                    <div className="message-box">
                        <textarea onChange={e => setNewMessage(e.target.value)} value={newMessage} onKeyDown={onEnterPress}></textarea>
                        <button type="submit" onClick={addNewMessage} className="sendMessage"><img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654785964/iMentor/Vector_paufg6.png" alt=""></img></button>
                    </div>
                </div>
            </div>
        );
}