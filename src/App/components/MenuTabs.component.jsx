import React from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const MenuTabs = ({ tabs, currentTab, handleTabClick }) => {
    return (
        <div className='mb-5'>
            <div className="md:hidden">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    value={currentTab}
                    onChange={(e) => handleTabClick(tabs.find(tab => tab.key === e.target.value))}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.key}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden md:block">
                <div className="border-b">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href="#"
                                className={classNames(
                                    currentTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabClick(tab);
                                }}
                                aria-current={currentTab === tab.key ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MenuTabs;
