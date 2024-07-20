import React from 'react';
import './Tooltip.css';
import { useState, useRef, useEffect } from 'react';

function Tooltip({ children, text }) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ left: '50%', marginLeft: '-100px', bottom: '125%' });
    const tooltipRef = useRef();

    useEffect(() => {
        if (visible && tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const newPosition = { ...position };

            if (tooltipRect.left < 0) {
                newPosition.left = '0';
                newPosition.marginLeft = '0';
            } else if (tooltipRect.right > window.innerWidth) {
                newPosition.left = 'auto';
                newPosition.right = '0';
                newPosition.marginLeft = '0';
            }

            if (tooltipRect.top < 0) {
                newPosition.bottom = 'auto';
                newPosition.top = '125%';
            }

            setPosition(newPosition);
        }
    }, [visible]);
    return (
        <div className="tooltip-container"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            >
            {children}
            {visible && (
                <div className="tooltip-text" ref={tooltipRef} style={position}>
                    {text}
                </div>)}
        </div>
    );
}

export default Tooltip;
