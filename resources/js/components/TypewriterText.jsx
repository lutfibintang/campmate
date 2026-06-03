import React, { useEffect, useState } from 'react';

export default function TypewriterText({ text = '', speed = 42, startDelay = 250, className = '', cursor = true }) {
    const [visibleText, setVisibleText] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setVisibleText('');
        setDone(false);

        let index = 0;
        let intervalId;

        const timeoutId = window.setTimeout(() => {
            intervalId = window.setInterval(() => {
                index += 1;
                setVisibleText(text.slice(0, index));

                if (index >= text.length) {
                    window.clearInterval(intervalId);
                    setDone(true);
                }
            }, speed);
        }, startDelay);

        return () => {
            window.clearTimeout(timeoutId);
            window.clearInterval(intervalId);
        };
    }, [text, speed, startDelay]);

    return (
        <span className={className} aria-label={text}>
            <span>{visibleText}</span>
            {cursor && (
                <span className={`ml-1 inline-block w-[0.08em] translate-y-1 bg-current ${done ? 'animate-pulse opacity-70' : 'opacity-100'}`}>
                    &nbsp;
                </span>
            )}
        </span>
    );
}
