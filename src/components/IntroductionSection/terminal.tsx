import React, { useEffect, useState, useRef } from 'react';
import './terminal.css';

interface TerminalProps {
  lines: string[];
  onTypingDone?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ lines, onTypingDone })  => {

    const typingSpeed = 50;   // milliseconds per character
    const linePause = 1000;   // pause after each line
    const terminalBodyRef = useRef<HTMLDivElement | null>(null);

    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>('');
    const [lineIndex, setLineIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);

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
                setDisplayedLines((prev) => [...prev, lines[lineIndex]]);
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

    
    return (
        <div className="terminal">
            <div className="terminal-header">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
                {displayedLines.map((line, idx) => (
                    <div key={idx}>
                        <span className="prompt">
                            C:\www\NickTheGreek: &nbsp;
                        </span>
                        <span className="completedLine">
                            {line}
                        </span>
                    </div>
                ))}
                <div>
                    <span className="prompt">
                        C:\www\NickTheGreek: &nbsp;
                    </span>
                    {/* <div className="userInput"></div> */}
                    <span className="currentLine">
                        {lineIndex < lines.length ?  currentLine : ''}
                    </span>
                    <div className="cursor" />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
