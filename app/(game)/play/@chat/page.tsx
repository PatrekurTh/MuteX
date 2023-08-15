export default function Chat() {
  return (
    <div className="card bg-secondary/80 shadow-xl p-4 h-full">
      <div className="card-body max-h-full p-4 max-w-full">
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-80 mx-4">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-80 mx-4">2 hours ago</time>
          </div>
          <div className="chat-bubble">What kind of nonsense is this</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-80 mx-4">2 hours ago</time>
          </div>
          <div className="chat-bubble">
            That&apos;s never been done in the history of the Jedi. It&apos;s
            insulting!
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-header">
            <time className="text-xs opacity-80 mx-4">2 hours ago</time>
            Admin
          </div>
          <div className="chat-bubble chat-bubble-info">
            4 Hours until server reset!
          </div>
        </div>
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary w-full bottom-0 static"
        />
      </div>
    </div>
  );
}
