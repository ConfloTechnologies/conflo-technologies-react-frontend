import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface BreadcrumbProps {
    link: string;
    title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ link, title }) => {
    return (
        <div className='mb-1'>
            <a
                href={link}
                className="flex items-center text-sm font-semibold text-gray-600 hover:text-blue-500"
                style={{ textDecoration: 'none' }}
            >
                <FaArrowLeft className="h-4 w-4 mr-2" />
                Back to {title}
            </a>
        </div>
    );
};

export default Breadcrumb;
