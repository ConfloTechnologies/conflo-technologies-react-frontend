import React, { useRef, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import PageHeader from "../../../common/components/PageHeader.component";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuTabs from "../../../common/components/MenuTabs.component";
import { DocumentArrowDownIcon } from "@heroicons/react/20/solid";
import Pagination from "../../../common/components/Pagination.component";
import { Link } from "react-router-dom";

interface TodoEntry {
    task: string;
    dueDate: string;
    priority: string;
    added: boolean;
    completed: boolean;
    archived: boolean;
    originalIndex?: number; // Optional, added for indexing after filtering
    projectAssignment: string;
}

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

    // State variables for modal control
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
    const [modalAction, setModalAction] = useState<'complete' | 'unarchive'>('complete');

    function handlePageChange(newPage: any) {
        setCurrentPage(newPage);
    }

    useEffect(() => {
        // Mock fetch function to simulate fetching data
        const fetchData = async () => {
            const mockData: TodoEntry[] = [
                { task: 'Task 1', dueDate: '2024-10-12', priority: 'High', added: false, completed: false, archived: false, projectAssignment: "Project Alpha" },
                { task: 'Task 2', dueDate: '2024-10-13', priority: 'Medium', added: false, completed: false, archived: false, projectAssignment: "Project Alpha" },
                { task: 'Archived Task', dueDate: '2024-10-14', priority: 'Low', added: false, completed: true, archived: true, projectAssignment: "Project Alpha"},
            ];
            setTodoEntries(mockData);
        };

        fetchData();
    }, []);

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
                archived: false,
                projectAssignment: ''
            },
        ]);
    };

    const removeTodoEntry = (index: number) => {
        setTodoEntries((current) => current.filter((_, idx) => idx !== index));
    };

    // Modified function to handle checkbox click
    const handleCheckboxClick = (index: number) => {
        const task = todoEntries[index];
        if (!task.completed) {
            // Task is not completed, show modal to complete
            setSelectedTaskIndex(index);
            setModalAction('complete');
            setIsModalOpen(true);
        } else if (task.archived) {
            // Task is archived and completed, ask if user wants to unarchive
            setSelectedTaskIndex(index);
            setModalAction('unarchive');
            setIsModalOpen(true);
        } else {
            // Task is completed but not archived, unmark as completed without modal
            setTodoEntries((current) =>
                current.map((entry, idx) =>
                    idx === index
                        ? { ...entry, completed: false }
                        : entry
                )
            );
        }
    };

    // Function to handle modal confirmation
    const handleModalConfirm = (archive: boolean) => {
        if (selectedTaskIndex !== null) {
            if (modalAction === 'complete') {
                setTodoEntries((current) =>
                    current.map((entry, idx) => {
                        if (idx === selectedTaskIndex) {
                            return {
                                ...entry,
                                completed: true,
                                archived: archive,
                            };
                        }
                        return entry;
                    })
                );
            } else if (modalAction === 'unarchive') {
                // Unarchive the task and unmark as completed
                setTodoEntries((current) =>
                    current.map((entry, idx) =>
                        idx === selectedTaskIndex
                            ? { ...entry, completed: false, archived: false }
                            : entry
                    )
                );
            }
            setIsModalOpen(false);
            setSelectedTaskIndex(null);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedTaskIndex(null);
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

    // Filtered entries based on current tab
    const filteredEntries = todoEntries
        .map((entry, index) => ({ ...entry, originalIndex: index }))
        .filter(entry => {
            if (currentTab === 'all') {
                return !entry.archived;
            } else if (currentTab === 'archived') {
                return entry.archived;
            }
            return true;
        });

    return (
        <>
            <div className="p-4">
                <PageHeader
                    pageTitle="Project To-Dos"
                    pageDescription="Manage and track project tasks."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Project To-Dos Training"
                />
            <div className="sticky top-0 sm:static z-30 bg-white pt-2">
                <MenuTabs
                    tabs={tabs}
                    currentTab={currentTab}
                    handleTabClick={handleTabClick}
                />
                <div className="flex items-center justify-end space-x-2 sm:space-x-4 max-w-full py-2">
                    <Link
                        to={"/project/:id/project-to-do-list/new-task"}
                        className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                        <MdAdd className="h-4 w-4" />
                        <p className="hidden sm:block text-md font-semibold ml-1">New Task</p>
                    </Link>
                    <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        // onClick={handleExportClick()}
                    >
                        <DocumentArrowDownIcon className="h-4 w-4 text-gray-700" />
                        <p className="hidden sm:block text-md font-semibold ml-1">Export</p>
                    </button>
                </div>
            </div>

            <div className="h-full pb-4">
                <table className="min-w-full rounded-corners">
                    <thead className="bg-gray-100 sticky top-0 z-40">
                    <tr>
                        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 px-4"></th>
                        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 px-4">Task</th>
                        <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4 hidden sm:table-cell">Due Date</th>
                        <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4 ">Priority</th>
                        <th scope="col" className="py-2 text-center text-sm font-semibold text-gray-900 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.map((task) => (
                        <tr
                            key={`task-${task.originalIndex}`}
                            className="relative"
                        >
                            <td className="py-2.5 text-medium text-gray-900 text-left px-4">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCheckboxClick(task.originalIndex!)}
                                    className="h-4 w-4 px-1 text-blue-600 border-blue-500 rounded transition-all"
                                />
                            </td>
                            <td className="py-2.5 text-medium text-gray-900 text-left px-4">
                                    <span
                                        className={`${task.completed && !task.archived ? 'line-through text-gray-500' : ''}`}>
                                        {task.task}
                                    </span>
                            </td>
                            <td className="py-2.5 text-sm text-gray-500 text-center px-4 hidden sm:table-cell">
                                <span
                                    className={`${task.completed && !task.archived ? 'line-through text-gray-500' : ''}`}>
                                    {task.dueDate}
                                </span>
                            </td>
                            <td className="py-2.5 text-sm text-gray-500 text-center hidden md:table-cell">
                                <div
                                    className={`rounded-md  py-1 font-semibold ${
                                        task.archived || task.completed
                                            ? 'bg-gray-300 text-gray-700'
                                            : task.priority === 'High'
                                                ? 'bg-red-400 text-white'
                                                : task.priority === 'Medium'
                                                    ? 'bg-yellow-400 text-white'
                                                    : task.priority === 'Low'
                                                        ? 'bg-green-400 text-white'
                                                        : 'bg-gray-400 text-white'
                                    }`}
                                >
                                    {task.archived || task.completed ? 'Completed' : task.priority}
                                </div>
                            </td>
                            <td className="py-2.5 text-sm text-gray-500 text-center px-4 md:hidden">
                                <div
                                    className={`rounded-md px-2 py-1 font-semibold ${
                                        task.archived || task.completed
                                            ? 'bg-gray-300 text-gray-700'
                                            : task.priority === 'High'
                                                ? 'bg-red-400 text-white'
                                                : task.priority === 'Medium'
                                                    ? 'bg-yellow-400 text-white'
                                                    : task.priority === 'Low'
                                                        ? 'bg-green-400 text-white'
                                                        : 'bg-gray-400 text-white'
                                    }`}
                                >
                                    {task.archived || task.completed ? 'C' : task.priority.charAt(0).toUpperCase()}
                                </div>
                            </td>

                            <td className="py-2.5 text-sm text-gray-500 text-center px-4">
                                <Link
                                    className="text-blue-600 hover:text-blue-900"
                                    to={`/project/:id/project-to-do-list/view-task`}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {modalAction === 'complete' ? 'Complete Task' : 'Unarchive Task'}
                                        </h3>
                                        <div className="mt-2">
                                            {modalAction === 'complete' ? (
                                                <p className="text-sm text-gray-500">
                                                    Would you like to archive this task after marking it as completed?
                                                </p>
                                            ) : (
                                                <p className="text-sm text-gray-500">
                                                    Would you like to unarchive this task and move it back to active tasks?
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                                {modalAction === 'complete' ? (
                                    <>
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => handleModalConfirm(true)}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => handleModalConfirm(false)}
                                        >
                                            No
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => handleModalConfirm(false)}
                                    >
                                        Yes, Unarchive
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default TodoList;
