'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useRef, useState } from 'react';
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';

interface Message {
  id: number;
  author: string;
  message: string;
  time: string;
}

export default function Chat() {
  const client = createClientComponentClient();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const chatContainerRef = useRef<HTMLInputElement>(null);
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });
  const censor = new TextCensor();

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await client.from('messages').select('*').order('id');
      setMessages(data as Message[]);
      scrollToBot();
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
            console.log('payload');
            setMessages([...messages, payload.new as Message]);
            scrollToBot();
          },
        )
        .subscribe();
    };

    const scrollToBot = () => {
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
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
  }, [client, messages]);

  const sendMessage = async () => {
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
    console.log(data);
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
        <input
          value={userMessage}
          className="input input-primary w-full"
          onChange={e => setUserMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}

function ChatBubble({
  author,
  time,
  msg,
}: {
  author: string;
  time: string;
  msg: string;
}) {
  const isAdmin: boolean = author === 'Admin';

  return (
    <div className={isAdmin ? 'chat chat-end' : 'chat chat-start'}>
      <div className="chat-header">
        {!isAdmin && author}
        <time className="text-xs opacity-80 mx-4">{time}</time>
        {isAdmin && author}
      </div>
      <div className="chat-bubble">{msg}</div>
    </div>
  );
}
