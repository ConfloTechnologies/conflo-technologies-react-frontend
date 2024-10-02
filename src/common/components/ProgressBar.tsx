import React from 'react';

interface ProgressBarComponentProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ currentStep, totalSteps }) => {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2 my-2.5">
            <div
                className="bg-blue-300 h-2.5 rounded-full transition-width duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBarComponent;
