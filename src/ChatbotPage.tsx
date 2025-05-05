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
        savedRecipes?: { name: string }[];
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
                const { data: savedRecipes, errors: savedRecipesErrors } = await client.models.SavedRecipe.list({
                    filter: { userId: { eq: currentUser.userId } },
                });

                if (savedRecipesErrors) {
                    console.error('Error fetching SavedRecipes:', savedRecipesErrors);
                    return;
                }

                setProfiles(profiles);
                setErrors(errors);

                if (savedRecipes && savedRecipes.length > 0) {
                    setUserProfile((prevProfile) => ({
                        ...prevProfile,
                        savedRecipes: savedRecipes.map((recipe) => ({ name: recipe.title ?? '' })),
                    }));
                    console.log("setUserProfile after saved recipes: ", userProfile)
                }

                if (errors) {
                    console.error('Error fetching UserProfile:', errors);
                    return;
                }
                console.log('Fetched UserProfile: ', profiles);
                if (profiles.length > 0) {
                    setUserProfile((prevProfile) => ({
                        ...prevProfile,
                        likedFoods: profiles[0].likedFoods ?? null,
                        dislikedFoods: profiles[0].dislikedFoods ?? null,
                        diet: profiles[0].diet ?? null,
                        intolerances: profiles[0].intolerances ?? null,
                    }));
                    console.log("setUserProfile after userPreferences: ", userProfile);
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
    // console.log("messages: ", messages);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <SideBar />
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Chat with AI</h1>
            <div className="chat-page" style={{ width: '80%', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
    );
};

export default ChatPage;