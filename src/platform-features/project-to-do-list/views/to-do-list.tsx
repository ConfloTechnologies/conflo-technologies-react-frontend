import React, { useRef, useEffect, useState } from 'react';
import { MdRemove, MdAdd } from 'react-icons/md';
import PageHeader from "../../../common/components/PageHeader.component";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuTabs from "../../../common/components/MenuTabs.component";
import {DocumentArrowDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import Pagination from "../../../common/components/Pagination.component";
import {Link} from "react-router-dom";

interface TodoEntry {
    task: string;
    dueDate: string;
    priority: string;
    added: boolean;
    completed: boolean;
}

// Define the structure for the Tab object
interface Tab {
    name: string;
    key: string;
}

const tabs: Tab[] = [
    { name: 'All Tasks', key: 'all' },
    { name: 'Archived Tasks', key: 'archived' },
];

const TodoList: React.FC = () => {
    const [todoEntries, setTodoEntries] = useState<TodoEntry[]>([]);
    const todoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentTab, setCurrentTab] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalItems = todoEntries.length;
    const lastPageIndex = currentPage * itemsPerPage;

    function handlePageChange(newPage: any) {
        console.log("Page change initiated");
        setCurrentPage(newPage);
    }


    useEffect(() => {
        // Mock fetch function to simulate fetching data
        const fetchData = async () => {
            console.log("Fetching mock data...");
            const mockData: TodoEntry[] = [
                { task: 'Task 1', dueDate: '2024-10-12', priority: 'High', added: false, completed: false },
                { task: 'Task 2', dueDate: '2024-10-13', priority: 'Medium', added: false, completed: false },
            ];
            setTodoEntries(mockData);
        };

        fetchData();
    }, []);

    const handleTodoChange = (index: number, field: keyof TodoEntry, value: string | boolean) => {
        setTodoEntries((current) =>
            current.map((entry, idx) => (idx === index ? { ...entry, [field]: value } : entry))
        );
    };

    const handleTabClick = (tab: Tab) => {
        setCurrentTab(tab.key);
    };

    const addTodoEntry = () => {
        setTodoEntries((current) => [
            ...current,
            {
                task: '',
                dueDate: '',
                priority: '',
                added: true,
                completed: false,
            },
        ]);
    };

    const removeTodoEntry = (index: number) => {
        setTodoEntries((current) => current.filter((_, idx) => idx !== index));
    };

    const toggleCompleted = (index: number) => {
        setTodoEntries((current) =>
            current.map((entry, idx) =>
                idx === index ? { ...entry, completed: !entry.completed } : entry
            )
        );
    };

    useEffect(() => {
        if (
            todoEntries.length > 0 &&
            todoEntries[todoEntries.length - 1].added
        ) {
            const element = todoRefs.current[todoEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [todoEntries]);

    return (
        <>
        <PageHeader
            pageTitle="Todo list"
            pageDescription="A list of all tasks to be completed with this project."
            trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
            trainingTitle="TodoList Trainings Training"
        />
        <div className="sticky top-0 sm:static z-30 bg-white pt-2">
            <MenuTabs
                tabs={tabs}
                currentTab={currentTab}
                handleTabClick={handleTabClick}
            />
            <div className="flex items-center justify-end space-x-2 sm:space-x-4 max-w-full py-2">

                <button
                    type="button"
                    className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    // onClick={() => handleAddButtonClick()}
                >
                    <MdAdd className="h-4 w-4"/>
                    <p className="hidden sm:block text-md font-semibold ml-1">New Task</p>
                </button>
                <button
                    type="button"
                    className="relative inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    // onClick={handleExportClick}
                >
                    <DocumentArrowDownIcon className="h-4 w-4 text-gray-700"/>
                    <p className="hidden sm:block text-md font-semibold ml-1">Export</p>
                </button>
            </div>
        </div>


    <div className="h-full pb-4">
        <table className="min-w-full rounded-corners">
            <thead className="bg-gray-100 sticky top-0 z-40">
            <tr>
                <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4">
                    Completed
                </th>
                <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4">
                    Task
                </th>
                <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4 hidden sm:table-cell">
                    Due Date
                </th>
                <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4 hidden md:table-cell">
                    Priority
                </th>
                <th scope="col" className="py-2 text-centertext-sm font-semibold text-gray-900 px-4">
                    Actions
                </th>
            </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
            {todoEntries.map((task, index) => (
                <tr key={`task-${index}`}
                    // className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                    <td className="whitespace-nowrap py-2.5 text-sm text-gray-900 text-center">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompleted(index)}
                            className="h-4 w-4 md:h-7 md:w-7 text-blue-600 ring-blue-500 border-gray-300 rounded hover:ring-2 hover:ring-blue-500 transition-all"
                        />
                    </td>
                    <td className="py-2.5 text-sm text-gray-900 text-center px-4">
                        {task.task}
                    </td>
                    <td className="py-2.5 text-sm text-gray-500 text-center px-4 hidden sm:table-cell">
                        {task.dueDate}
                    </td>
                    <td className="py-2.5 text-sm text-gray-500 text-center px-4 hidden md:table-cell">
                        <div
                            className={`rounded-md px-2 py-1 text-white font-semibold ${
                                task.priority === 'High'
                                    ? 'bg-red-400'
                                    : task.priority === 'Medium'
                                        ? 'bg-yellow-400'
                                        : task.priority === 'Low'
                                            ? 'bg-green-400'
                                            : 'bg-gray-400'
                            }`}
                        >
                            {task.priority}
                        </div>
                    </td>
                    <td className="py-2.5 text-sm text-gray-500 text-center px-4 ">
                        <Link
                            className="text-blue-600 hover:text-blue-900"
                            to={`/project/:id/project-directory/contact/:id}`}
                        >
                            <p className="hidden sm:block">View</p>
                            <span className="sm:hidden">
                                    <InfoOutlinedIcon/>
                                    </span>
                        </Link>
                    </td>

                </tr>
            ))}
            </tbody>
        </table>
    </div>

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                itemTitle={"Tasks"}
            />
        </>
    );
};

const RemoveButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div className="flex items-center justify-start py-2 ">
            <button
                type="button"
                onClick={onClick}
                className="ml-4 bg-red-500 text-white font-semibold rounded hover:bg-red-700  flex items-center justify-center w-6 h-6 md:w-7 md:h-7"
            >
                <MdRemove className="w-full h-full" />
            </button>
        </div>
    );
};

const AddButton: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
    return (
        <div className="flex items-center justify-start py-2">
            <button
                type="button"
                onClick={onClick}
                className="ml-4 bg-green-500 text-white font-semibold rounded hover:bg-green-700  flex items-center justify-center w-6 h-6 md:w-7 md:h-7"
            >
                <MdAdd className="w-full h-full" />
            </button>
            <div className="flex items-center justify-end px-4 font-semibold">
                <h2>{title}</h2>
            </div>
        </div>
    );
};

export default TodoList;