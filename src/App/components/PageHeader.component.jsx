import React from 'react';

export default function PageHeader({pageTitle, pageDescription, trainingImageSrc, trainingVideoSrc, trainingTitle})  {

    return  (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 border p-4 rounded-md mb-4 shadow'>
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
                <div className='hidden md:flex col-span-1 justify-end items-center '>
                    <a 
                        href={trainingVideoSrc} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='rounded-md border flex items-center space-x-2 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transform transition-transform duration-200 hover:scale-105'
                    >
                        <img src={trainingImageSrc} alt="YouTube" className="h-12 w-12 rounded-l-md"/>
                        <span className='pr-2'>{trainingTitle}</span>
                    </a>
                </div>
            </div>    
        </>
    )
}