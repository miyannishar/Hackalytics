import {useState, useEffect} from 'react';
import '../home.css';
import NavBar from '../components/navbar';
import RightProfileBar from '../components/RightProfileBar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

const HealthAI = () => {
    const [messages, setMessages] = useState([{
            message: "Hello! This is Health-AI. What do you want to know about your health? ",
            sentTime: "just now",
            sender: "Health-AI"
        },]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendRequest = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage
        ]);
        setIsTyping(true);

        try {
            const response = await processMessageToChatGPT([
                ...messages,
                newMessage
            ]);
            const content = response.choices[0] ?. message ?. content;
            if (content) {
                const chatGPTResponse = {
                    message: content,
                    sender: "Health-AI"
                };
                setMessages((prevMessages) => [
                    ...prevMessages,
                    chatGPTResponse
                ]);
            }
        } catch (error) {
            console.error("Error processing message:", error);
        } finally {
            setIsTyping(false);
        }
    };

    async function processMessageToChatGPT(chatMessages) {
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "Health-AI" ? "assistant" : "user";
            return {role, content: messageObject.message};
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    role: "system",
                    content: "I am a Health-AI. I am here to assist you with your health insights."
                },
                ... apiMessages,
            ]
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });

        return response.json();
    }

    return (
        <div className="Health-Dashboard">
            <NavBar/>


            <div id="main">
                <div id="greeting" className="card">
                    <h2>Your Health Analysis</h2>
                    <p id="greeting-message">This is your detailed health based on your personal health data. This is predicted by AI.</p>
                </div>

                <div id="cards" className="card">
                    <h2>Health-AI</h2>
                    <div style={
                        {
                            position: "relative",
                            height: "800px",
                            width: "700px"
                        }
                    }>
                        <MainContainer>
                            <ChatContainer>
                                <MessageList scrollBehavior="smooth"
                                    typingIndicator={
                                        isTyping ? <TypingIndicator content="Health-AI is typing"/> : null
                                }>
                                    {
                                    messages.map((message, i) => {
                                        console.log(message)
                                        return <Message key={i}
                                            model={message}/>
                                    })
                                } </MessageList>
                                <MessageInput placeholder="Send a Message"
                                    onSend={handleSendRequest}/>
                            </ChatContainer>
                        </MainContainer>
                    </div>

                    {/* Repeat for other cards */} </div>


                {/* Repeat for other sections */} </div>
            <RightProfileBar/>


        </div>


    );
}

export default HealthAI;
