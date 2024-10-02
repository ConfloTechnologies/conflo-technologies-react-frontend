import React, {forwardRef} from 'react';
import {MagnifyingGlassIcon, DocumentArrowDownIcon} from '@heroicons/react/20/solid';
import {MdAdd} from 'react-icons/md';
import MenuTabs from "./MenuTabs.component";
import PageHeader from "./PageHeader.component";
import {Tab} from "../../types/directory";


interface FullPageHeaderProps {
    pageTitle: string,
    pageDescription: string,
    trainingVideoSrc: string,
    trainingTitle: string,
    tabs: Tab[],
    currentTab: string,
    handleTabClick: (tab: Tab) => void,
    searchQuery: string,
    setSearchQuery: (query: string) => void,
    handleAddButtonClick: () => void,
    addButtonTitle: string,
    handleExportClick: () => void,
}

const FullPageHeader = forwardRef<HTMLDivElement, FullPageHeaderProps>(
    (
        {
            pageTitle,
            pageDescription,
            trainingVideoSrc,
            trainingTitle,
            tabs,
            currentTab,
            handleTabClick,
            searchQuery,
            setSearchQuery,
            handleAddButtonClick,
            addButtonTitle,
            handleExportClick,
        },
        ref
    ) => {
    return (
        <>
            <div ref={ref}>
                <PageHeader
                    pageTitle={pageTitle}
                    pageDescription={pageDescription}
                    trainingVideoSrc={trainingVideoSrc}
                    trainingTitle={trainingTitle}
                />
            <div className="sticky top-0 sm:static z-30 bg-white pt-2">
                <MenuTabs
                    tabs={tabs}
                    currentTab={currentTab}
                    handleTabClick={handleTabClick}
                />
                <div className="flex items-center justify-end space-x-2 sm:space-x-4 max-w-full py-2">
                    <div className="flex-grow sm:flex-shrink-0 max-w-xl">
                        <div className="relative flex-grow focus-within:z-10">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full rounded-md border-gray-300 pl-10 text-gray-900 placeholder:text-gray-400 "
                                style={{height: '36px',}}

                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        onClick={() => handleAddButtonClick()}
                    >
                        <MdAdd className="h-4 w-4"/>
                        <p className="hidden sm:block text-md font-semibold ml-1">{addButtonTitle}</p>
                    </button>
                    <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        onClick={handleExportClick}
                    >
                        <DocumentArrowDownIcon className="h-4 w-4 text-gray-700"/>
                        <p className="hidden sm:block text-md font-semibold ml-1">Export</p>
                    </button>
                </div>
            </div>
            </div>
        </>
    );
})

export default FullPageHeader;
