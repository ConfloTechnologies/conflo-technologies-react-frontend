import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function PageHeader({pageTitle, pageDescription, trainingImageSrc, trainingVideoSrc, trainingTitle})  {

    return  (
        <>
            <div className='grid grid-cols-2 border pl-4 pr-2 py-3 rounded-md'>
                <div className='col-span-1 flex justify-start items-center'>
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold leading-6 text-gray-900">
                            {pageTitle}
                        </h1>
                        <p className="hidden md:flex mt-2 text-sm text-gray-700 " style={{ minWidth: '350px' }}>
                            {pageDescription}
                        </p>
                    </div>
                </div>

                {/* For larger screens */}
                <div className='hidden sm:flex col-span-1 justify-end items-center '>
                    <a 
                        href={trainingVideoSrc} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='border-blue-200 bg-blue-50 rounded-md border flex items-center space-x-2 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transform transition-transform duration-200 hover:scale-105'
                    >
                        {/* <img src={trainingImageSrc} alt="YouTube" className="h-12 w-12 rounded-l-md"/> */}
                        <YouTubeIcon 
                            style={{ fontSize: '40px', padding: '2px', color: 'red' }} // Inline styles for larger icon size
                        />
                        <span className='pr-2'>{trainingTitle}</span>
                    </a>
                </div>

                {/* For mobile screens */}
                <div className='sm:hidden flex col-span-1 justify-end items-center '>
                    <a 
                        href={trainingVideoSrc} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='border-blue-200 bg-blue-50 rounded-md border flex items-center  space-x-2 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transform transition-transform duration-200 hover:scale-105'
                        style={{ width: 'auto', height: 'auto' }} // Ensure the container allows larger content
                    >
                        <YouTubeIcon 
                            style={{ fontSize: '40px', padding: '2px', color: 'red' }} // Inline styles for larger icon size
                        />
                    </a>
                </div>
            </div>    
        </>
    )
}
