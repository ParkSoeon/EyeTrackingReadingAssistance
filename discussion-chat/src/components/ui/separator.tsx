import React from 'react';

interface SeparatorProps {
    className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ className }) => {
    return (
        <div
            className={`border-t border-gray-300 my-4 ${className ? className : ''}`}
        ></div>
    );
};

export default Separator;
