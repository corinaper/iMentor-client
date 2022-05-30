import React, { createContext, useState } from 'react'

const MessageContext = createContext()

function MessageProviderWrapper(props) {

    const [show, setShow] = useState(true)
    const [messageInfo, setMessageInfo] = useState({
        title: 'HOLA HOLA NANANANA',
        description: 'Estamos en el contexto'
    })

    const showMessage = (title, description) => {
        setShow(true)
        setMessageInfo({ title, description })
    }

    return (
        <MessageContext.Provider value={{ show, setShow, messageInfo, showMessage }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }