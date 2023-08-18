export default function ChatBubble({
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
