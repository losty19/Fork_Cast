// src/pages/ChatPage.tsx
import React from 'react';
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import { Schema } from '../amplify/data/resource';
import SideBar from './SideBar';
import { useAIConversation } from './client';
import { getCurrentUser } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
// Create Amplify client and AI hooks (using the conversation we defined in the schema)
// const client = generateClient<Schema>({ authMode: 'userPool' });
// const { useAIConversation } = createAIHooks(client);

const client = generateClient<Schema>();

const ChatPage: React.FC = () => {
    const { user } = useAuthenticator((context) => [context.user]);
    const [userId, setUserId] = React.useState<string | null>(null);
    const [profiles, setProfiles] = React.useState<any>(null);
    const [errors, setErrors] = React.useState<any>(null);
    const [userProfile, setUserProfile] = React.useState<{
        likedFoods?: string | null;
        dislikedFoods?: string | null;
        diet?: string | null;
        intolerances?: string | null;
      } | null>(null);

    React.useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user) return;
            try {
                const currentUser = await getCurrentUser();
                setUserId(currentUser.userId);
                const { data: profiles, errors } = await client.models.UserProfile.list({
                    filter: { userId: { eq: currentUser.userId } },
                });

                if (errors) {
                    console.error('Error fetching UserProfile:', errors);
                    return;
                }
                console.log('Fetched UserProfile: ', profiles);
                if (profiles.length > 0) {
                    setUserProfile({
                        likedFoods: profiles[0].likedFoods,
                        dislikedFoods: profiles[0].dislikedFoods,
                        diet: profiles[0].diet,
                        intolerances: profiles[0].intolerances,
                    });
                    console.log("User profile looks like: ", userProfile);
                }
            } catch (error) {
                console.error('Error fetching UserProfile:', error);
            }
        };

        fetchUserProfile();
    }, [user]);
    
    // Initialize the AI conversation hook for the "chat" route
    const [ { data: { messages }, isLoading }, handleSendMessage ] = useAIConversation('chat');
    // 'conversationAI' corresponds to the key we defined in amplify/data/resource.ts:contentReference[oaicite:11]{index=11}
    console.log("messages: ", messages);
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideBar />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="chat-page" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                    <div className="AIConversation">
                        <AIConversation 
                            messages={messages}
                            isLoading={isLoading}
                            handleSendMessage={handleSendMessage}
                            aiContext={() => userProfile || {}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;