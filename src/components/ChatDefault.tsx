import axios from "axios";
import { RotateCw, SendHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function ChatDefault() {
  const [userInput, setUserInput] = useState("");
  const [outPut, setOutPut] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const [model, setModel] = useState<"gpt" | "claude">("gpt");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outPut]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTimeUsed(0);
    setOutPut("");
    setIsLoading(true);

    if (userInput === "") {
      return setIsLoading(false);
    }

    let timer = setInterval(() => {
      setTimeUsed((prev) => prev + 1);
    }, 1000);

    await axios
      .get(
        `${API_URL}/chat_with_sentinel?user_input=${userInput}&email=warunsinx@gmail.com&chatId=40c06271-5383-479f-9b3f-f2750a0ca6a3&model=${model}`
      )
      .then((res) => {
        clearInterval(timer);
        setOutPut(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        clearInterval(timer);
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-gray-500">without Stream (Old)</p>
        <p className="text-gray-500">{timeUsed}s</p>
      </div>
      <div
        ref={outputRef}
        className="border h-[300px] w-[335px] mb-2 rounded p-2 overflow-y-scroll"
      >
        <div>{outPut}</div>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          placeholder="Type something.."
          className="border border-gray-300 rounded p-2 w-[155px]"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <select
          className="rounded border-r-8 border-transparent px-2 text-sm outline outline-1 outline-gray-300 h-[41px]"
          value={model}
          onChange={(e) => setModel(e.target.value as "gpt" | "claude")}
        >
          <option value="gpt">GPT</option>
          <option disabled value="claude">
            Claude
          </option>
        </select>
        <button
          disabled={isLoading}
          className={`bg-blue-500 text-white px-4 py-2 rounded h-[41px] w-[72px] flex justify-center items-center`}
          type="submit"
        >
          {isLoading ? (
            <RotateCw className="animate-spin" />
          ) : (
            <SendHorizontal />
          )}
        </button>
      </form>
    </div>
  );
}
