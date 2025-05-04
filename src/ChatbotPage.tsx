// src/pages/ChatPage.tsx
import React from 'react';
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import { Schema } from '../amplify/data/resource';
import SideBar from './SideBar';

// Create Amplify client and AI hooks (using the conversation we defined in the schema)
const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

const ChatPage: React.FC = () => {
  // Initialize the AI conversation hook for the "chat" route
  const [ { data: { messages }, isLoading }, handleSendMessage ] = useAIConversation('conversationAI')
  // 'conversationAI' corresponds to the key we defined in amplify/data/resource.ts:contentReference[oaicite:11]{index=11}

return (
    <div style={{ display: 'flex', height: '100vh' }}>
        <SideBar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="chat-page">
                <div className="AIConversation">
                    <AIConversation 
                        messages={messages}
                        isLoading={isLoading}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    </div>
);
};

export default ChatPage;
