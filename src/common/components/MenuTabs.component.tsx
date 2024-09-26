import React from 'react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface Tab {
    name: string;
    key: string;
}

interface MenuTabsProps {
    tabs: Tab[];
    currentTab: string;
    handleTabClick: (tab: Tab) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ tabs, currentTab, handleTabClick }) => {
    return (
        <div className='mb-1'>
            <div className="md:hidden mt-1">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 md:text-sm"
                    value={currentTab}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const key = e.target.value;
                        const selectedTab = tabs.find(tab => tab.key === key);
                        if (selectedTab) {
                            handleTabClick(selectedTab);
                        }
                    }}
                                    >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.key}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden md:block mx-1">
                <div className="border-b">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                
                                className={classNames(
                                    currentTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium'
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabClick(tab);
                                }}
                                aria-current={currentTab === tab.key ? 'page' : undefined}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MenuTabs;
