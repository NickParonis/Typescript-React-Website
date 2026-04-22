import React, { useEffect, useRef, useState } from "react";
import "./terminal.css";
import TerminalLine from "./ternimalLine";

interface TerminalProps {
    lines: string[];
    onTypingDone?: () => void;
}

type QueueItem = {
    text: string;
    prompt: string;
    textColor?: string;
    type?: "user" | "ai" | "boot";
};
type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const typingSpeed = 30;
const linePause = 400;

const Terminal: React.FC<TerminalProps> = ({ lines, onTypingDone }) => {


    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const terminalBodyRef = useRef<HTMLDivElement | null>(null);

    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [output, setOutput] = useState<QueueItem[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [index, setIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const pushToTerminal = (item: QueueItem) => {
        setQueue((prev) => [...prev, item]);
    };

    useEffect(() => {
        setQueue(
            lines.map((line) => ({
                text: line,
                prompt: "C:\\www\\NickTheGreek:",
            }))
        );
    }, [lines]);

    useEffect(() => {
        if (index >= queue.length) {
            onTypingDone?.();
            return;
        }

        const item = queue[index];

    if (!item) return;

    // 👇 USER ITEMS: always instant, never enter typing state
    if (item.type === "user") {
        setOutput((prev) => [...prev, item]);
        setIndex((prev) => prev + 1);
        setCurrentText("");
        return;
    }

        if (currentText.length < item.text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + item.text[currentText.length]);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setOutput((prev) => [...prev, item]);
            setCurrentText("");
            setIndex((prev) => prev + 1);
        }, linePause);

        return () => clearTimeout(timeout);
    }, [queue, index, currentText]);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop =
                terminalBodyRef.current.scrollHeight;
        }
    }, [output, currentText]);

    const sendMessage = async (input: string) => {
        const updatedHistory: ChatMessage[] = [
            ...chatHistory,
            { role: "user", content: input },
        ];

        try {
            const response = await fetch("/.netlify/functions/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: updatedHistory,
                }),
            });

            const data = await response.json();

            const aiReply = data.message;

            // save BOTH user + assistant messages
            setChatHistory([
                ...updatedHistory,
                { role: "assistant", content: aiReply },
            ]);

            return aiReply;
        } catch {
            return "Error connecting to AI";
        }
    };

    const handleKeyDown = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key !== "Enter" || !userInput.trim()) return;

        const input = userInput;
        setUserInput("");

        // user line
        pushToTerminal({
            text: input,
            prompt: "C:\\www\\AnonymousUser:",
            textColor: "#077a07",
            type: "user",
        });

        setIsLoading(true);

        // AI response
        const aiResponse = await sendMessage(input);

        setIsLoading(false);

        pushToTerminal({
            text: aiResponse,
            prompt: "C:\\www\\NickTheGreek:",
            textColor: "#ffffff",
        });
    };

    return (
        <div className="terminal">
            <div className="terminal-header">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
            </div>

            <div className="terminal-body" ref={terminalBodyRef}>
                {/* committed output */}
                {output.map((line, idx) => (
                    <TerminalLine
                        key={idx}
                        prompt={line.prompt}
                        text={line.text}
                        textColor={line.textColor}
                    />
                ))}

                {/* live typing line */}
                {index < queue.length && (
                    <TerminalLine
                        prompt={queue[index].prompt}
                        text={currentText}
                        textColor={queue[index].textColor}
                    />
                )}

                {/* input */}
{index >= queue.length && (
    <div>
        <span className="prompt">
            C:\www\AnonymousUser:&nbsp;
        </span>

        <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="userInput"
            autoFocus
            disabled={isLoading}
        />

        {isLoading && <span className="cursor" />}
    </div>
)}
            </div>
        </div>
    );
};

export default Terminal;