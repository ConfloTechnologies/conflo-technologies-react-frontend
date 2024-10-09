import React, { useRef, useState, FunctionComponent } from 'react';
import RFIsListView from '../components/RFIsListView.component';
import FullPageHeader from "../../../common/components/FullPageHeader.component";
import { useNavigate } from "react-router-dom";
import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";

interface Tab {
    name: string;
    key: string;
}

const tabs: Tab[] = [
    { name: "All RFI's", key: 'all' },
    { name: 'RFI Groups', key: 'groups' },
];

export default function RFIs(): React.ReactElement {
    const [currentTab, setCurrentTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [mainContentHeight, setMainContentHeight] = useState<string>('');
    const headerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useDynamicContentHeight(headerRef, setMainContentHeight);

    const handleNewRFIClick = (): void => {
        navigate(`/project/:id/request-for-information/new-request-for-information`);
    };

    const handleTabClick = (tab: Tab): void => {
        setCurrentTab(tab.key);
    };

    const handleExportClick = (): void => {
        console.log("Exporting data...");
    };

    return (
        <>
            <div className="p-4">
                <FullPageHeader
                    ref={headerRef}
                    pageTitle="RFIs"
                    pageDescription="A list of all RFIs associated with this project."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="RFIs Training"
                    tabs={tabs}
                    currentTab={currentTab}
                    handleTabClick={handleTabClick}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleAddButtonClick={handleNewRFIClick}
                    addButtonTitle="New RFI"
                    handleExportClick={handleExportClick}
                />
                <div className="overflow-auto" style={{height: mainContentHeight}}>
                    <RFIsListView/>
                </div>
            </div>
            </>
            );
            }
