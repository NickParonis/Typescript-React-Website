import React, { useEffect, useState, useRef } from 'react';
import './terminal.css';
import TerminalLine from './ternimalLine';

interface TerminalProps {
  lines: string[];
  onTypingDone?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ lines, onTypingDone })  => {

    type Line = {
        text: string;
        prompt: string;
        textColor?: string;
    };

// const [displayedLines, setDisplayedLines] = useState<Line[]>([]);
    const typingSpeed = 1;   // milliseconds per character
    const linePause = 1000;   // pause after each line
    const terminalBodyRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [displayedLines, setDisplayedLines] = useState<Line[]>([]);
    const [currentLine, setCurrentLine] = useState<string>('');
    const [lineIndex, setLineIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');

    useEffect(() => {
        if (lineIndex >= lines.length) {
        // All lines typed
            onTypingDone?.();
            return;
        }

        let timeout: NodeJS.Timeout;

        if (charIndex < lines[lineIndex].length) {
            timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, typingSpeed);
        } else {
            timeout = setTimeout(() => {
                setDisplayedLines((prev) => [
                    ...prev,
                    {
                        text: lines[lineIndex],
                        prompt: "C:\\www\\NickTheGreek:"
                    }
                ]);
                setCurrentLine('');
                setCharIndex(0);
                setLineIndex((prev) => prev + 1);
            }, linePause);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, lineIndex, lines]);
    
    useEffect(() => {
        if (lines.length === 0) {
            setDisplayedLines([]);
            setCurrentLine('');
            setLineIndex(0);
            setCharIndex(0);
        }
    }, [lines]);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [displayedLines, currentLine]);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && userInput.trim() !== '') {
            setDisplayedLines((prev) => [
                ...prev,
                {
                    text: userInput,
                    prompt: "C:\\www\\internetUser:",
                    textColor: '#699269'
                }
            ]);
            setUserInput('');
        }
    };
    
    return (
        <div className="terminal">
            <div className="terminal-header">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
                {displayedLines.map((line, idx) => (
                    <TerminalLine
                        key={idx}
                        prompt={line.prompt}
                        text={line.text}
                        textColor={line.textColor}
                    />
                ))}
                <div>
                    <span className="prompt">
                        {lineIndex >= lines.length
                            ? "C:\\www\\internetUser:"
                            : "C:\\www\\NickTheGreek:"}
                        &nbsp;
                    </span>
                    <span className="currentLine">
                        {lineIndex < lines.length ?  currentLine : ''}
                    </span>
                {lineIndex < lines.length && <div className="cursor" />}

                {lineIndex >= lines.length && (
                    <input
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="userInput"
                    autoFocus
                    />
                )}
                </div>
            </div>
        </div>
    );
};

export default Terminal;
