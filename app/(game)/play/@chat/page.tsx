'use client';

// Import Supabase client component creation function from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Import React hooks for side effects, state, and refs
import { useEffect, useRef, useState } from 'react';

// Import classes and functions from 'obscenity' library for text matching and censoring
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';

// Import the ChatBubble component from the specified path
import ChatBubble from '@/components/game/chat/ChatBubble';
import Image from 'next/image';

// TODO: get from generated db types
interface Message {
  id: number;
  author: string;
  message: string;
  time: string;
}

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});
const censor = new TextCensor();

export default function Chat() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const chatContainerRef = useRef<HTMLInputElement>(null);
  const client = createClientComponentClient();

  const scrollToBot = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await client.from('messages').select('*').order('id');
      setMessages(data as Message[]);
    };

    const subscribeToMessages = () => {
      client
        .channel('table-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
          },
          payload => {
            setMessages(prevMessages => [
              ...prevMessages,
              payload.new as Message,
            ]);
          },
        )
        .subscribe();
    };

    const getUserName = async () => {
      const { data, error } = await client.auth.getUser();
      if (error) {
        console.log(error);
        return;
      }
      setUser(data.user.email!);
    };

    getMessages();
    subscribeToMessages();
    getUserName();

    return () => {
      client.channel('table-db-changes').unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBot();
  }, [messages]);

  const sendMessage = async () => {
    if (!userMessage) {
      return;
    }
    const matches = matcher.getAllMatches(userMessage);
    const cleanMessage = censor.applyTo(userMessage, matches);
    const { data, error } = await client
      .from('messages')
      .insert({ author: user, message: cleanMessage })
      .select();

    setUserMessage('');

    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="h-full card bg-secondary/80 shadow-xl p-4">
      <div className="bg-accent/50 rounded-tl-lg rounded-tr-lg p-2">
        <h2 className="text-primary text-center text-lg font-semibold">Chat</h2>
      </div>
      <div
        className="card-body max-h-80 p-0 overflow-y-auto"
        ref={chatContainerRef}
      >
        {messages.map(chat => (
          <ChatBubble
            key={chat.id}
            author={chat.author}
            time={chat.time}
            msg={chat.message}
          />
        ))}
      </div>
      <div className="mt-2">
        {/* <div className="form-control w-full"> */}
        <div className="input-group">
          <input
            type="text"
            value={userMessage}
            onChange={e => setUserMessage(e.target.value)}
            className="input input-bordered w-full"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button className="btn btn-square btn-accent" onClick={sendMessage}>
            <Image
              src="https://vyhtnebvbpatwaohzygc.supabase.co/storage/v1/object/public/game/chat/send-alt-2-svgrepo-com.svg"
              alt="send"
              width="32"
              height="32"
            />
          </button>
        </div>
      </div>
      {/* <input
          value={userMessage}
          className="input input-primary w-full"
          onChange={e => setUserMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        /> */}
      {/* </div> */}
    </div>
  );
}
