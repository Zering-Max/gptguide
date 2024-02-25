"use client";
import { useState } from "react";
import {
  generateChatResponse,
  fetchUserTokensById,
  subtractTokens,
} from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

const Chat = () => {
  const { userId } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  // "Token balance is too low..."
  // "Something went wrong..."
  // `${newTokens} tokens remaining...`
  const { mutate, isPending } = useMutation({
    mutationFn: async query => {
      const currentTokens = await fetchUserTokensById(userId);
      if (currentTokens < 100) {
        toast.error("Vous n'avez pas assez de tokens...",{
          duration: 5000 },);
        return;
      }
      const response = await generateChatResponse([...messages, query]);
      if (!response) {
        toast.error("Quelque chose ne ve pas dans votre question...",{
          duration: 5000 },);
        return;
      }
      setMessages(prev => [...prev, response.message]);
      const newTokens = await subtractTokens(userId, response.usedTokens);
      toast.success(`Il vous reste ${newTokens} tokens...`,{
        duration: 5000 },);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages(prev => [...prev, query]);
    setText("");
  };
  // "wait for..."
  // "Ask question"
  return (
    <div className="ml-6 min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? "🧑" : "🤖";
          return (
            <div
              key={index}
              className={`flex py-6 -mx-8 px-8
            text-xl leading-loose rounded-lg mt-4 bg-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading mt-8"></span> : null}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GPTGuide"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={e => setText(e.target.value)}
          />
          <button disabled={isPending} className="btn btn-primary join-item">
            {isPending ? "attendez..." : "Posez question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
