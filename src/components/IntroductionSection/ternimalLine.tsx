import React from 'react';

interface TerminalLineProps {
    prompt: string;
    text: string;
    promptColor?: string;
    textColor?: string;
}

const TerminalLine: React.FC<TerminalLineProps> = ({
    prompt,
    text,
    // promptColor = '#00ff00',
    textColor = '#ffffff',
}) => {
    return (
        <div>
            <span
                className="prompt"
                // style={{ color: promptColor }}
            >
                {prompt}&nbsp;
            </span>

            <span
                className="completedLine"
                style={{ color: textColor }}
            >
                {text}
            </span>
        </div>
    );
};

export default TerminalLine;