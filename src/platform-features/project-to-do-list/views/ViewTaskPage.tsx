import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../../common/components/PageHeader.component';

// Define the Task type
type Task = {
    title: string;
    dueDate: string;
    priority: string;
    description: string;
    completed: boolean;
    archived: boolean;
    projectAssignment: string;
};

// Mock fetch function to simulate an API call for fetching task details
const fetchTask = async (projectId: string, taskId: string): Promise<Task> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                title: 'Sample Task',
                dueDate: '2023-12-31',
                priority: 'Medium',
                description: 'This is a sample task description.',
                completed: false,
                archived: false,
                projectAssignment: '1', // Sample project ID
            });
        }, 1000);
    });
};

const ViewEditTaskPage = () => {
    const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>(); // Extract project and task IDs from the URL
    const [task, setTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState<Task>({
        title: '',
        dueDate: '',
        priority: '',
        description: '',
        completed: false,
        archived: false,
        projectAssignment: '',
    });
    const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
    const [isModified, setIsModified] = useState(false); // To track if form has been modified

    // Sample project options (you can replace this with data from your API)
    const projectOptions = [
        { id: '1', name: 'Project Alpha' },
        { id: '2', name: 'Project Beta' },
        { id: '3', name: 'Project Gamma' },
    ];

    useEffect(() => {
        const getTaskData = async () => {
            if (projectId && taskId) {
                const taskData = await fetchTask(projectId, taskId);
                setTask(taskData);
                setFormData(taskData); // Initialize form with fetched data
            }
        };

        getTaskData();
    }, [projectId, taskId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ): void => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (target instanceof HTMLInputElement && target.type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        setIsModified(true); // Enable the submit button when any change is made
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        console.log('Submitting form with data:', formData);
        setIsEditing(false); // Switch back to view mode after submitting
        setIsModified(false); // Reset modification status
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing); // Toggle between view and edit modes
        setIsModified(false); // Reset modified status when entering or exiting edit mode
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(task || formData); // Reset the form to the initial task data
        setIsModified(false);
    };

    return (
        <>
            {/* Sticky Header */}
            <div
                // ref={headerRef}
                 className="overflow-hidden p-4">
                <PageHeader
                    pageTitle="Project To-Dos"
                    pageDescription="Manage and track project tasks."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Project To-Dos Training"
                />
            </div>

            <div className="overflow-auto px-4"
                 // style={{ height: mainContentHeight }}
            >
                <div className="border border-gray-300 rounded-lg">
                    <div className="flex items-center justify-between bg-white rounded-t-lg px-4 py-2">
                        <h2 className="text-xl font-bold py-2">
                            Task Information
                        </h2>
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="inline-flex border border-gray-300 bg-gray-200 hover:bg-yellow-300 hover:border-amber-50 text-gray-900 rounded-md px-4 py-2"
                            >
                                Edit
                            </button>
                        ):(
                            <div className="py-5"></div>
                        )}

                    </div>

                    {/* Form / Information */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-8 gap-4 p-4">
                            {/* Task Title Field */}
                            <div className="col-span-8 md:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                                    Task Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 block w-full py-1.5 ${
                                        isEditing
                                            ? 'rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                            : 'border-none bg-transparent focus:ring-0'
                                    } sm:text-sm`}
                                    required
                                />
                            </div>

                            {/* Project Assignment Field */}
                            <div className="col-span-8 md:col-span-4">
                                <label htmlFor="projectAssignment" className="block text-sm font-medium text-gray-900">
                                    Project Assignment
                                </label>
                                {isEditing ? (
                                    <select
                                        id="projectAssignment"
                                        name="projectAssignment"
                                        value={formData.projectAssignment}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select a project</option>
                                        {projectOptions.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id="projectAssignment"
                                        name="projectAssignment"
                                        type="text"
                                        value={
                                            projectOptions.find((project) => project.id === formData.projectAssignment)?.name || ''
                                        }
                                        readOnly
                                        className="mt-1 block w-full py-1.5 border-none bg-transparent focus:ring-0 sm:text-sm"
                                    />
                                )}
                            </div>

                            {/* Due Date Field */}
                            <div className="col-span-8 md:col-span-2">
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-900">
                                    Due Date
                                </label>
                                <input
                                    id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 block w-full py-1.5 ${
                                        isEditing
                                            ? 'rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                            : 'border-none bg-transparent focus:ring-0'
                                    } sm:text-sm`}
                                    required
                                />
                            </div>

                            {/* Priority Field */}
                            <div className="col-span-8 md:col-span-2">
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-900">
                                    Priority
                                </label>
                                {isEditing ? (
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Select priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                ) : (
                                    <input
                                        id="priority"
                                        name="priority"
                                        type="text"
                                        value={formData.priority}
                                        readOnly
                                        className="mt-1 block w-full py-1.5 border-none bg-transparent focus:ring-0 sm:text-sm"
                                    />
                                )}
                            </div>

                            {/* Completed Checkbox */}
                            <div className="col-span-4 md:col-span-2 py-3 sm:py-0 pl-2 md:pt-5 md:pl-4 flex items-center h-full">
                                <label htmlFor="completed" className="text-sm font-medium text-gray-900 mr-2">
                                    Completed:
                                </label>
                                <input
                                    id="completed"
                                    name="completed"
                                    type="checkbox"
                                    checked={formData.completed}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                            </div>

                            {/* Archived Checkbox */}
                            <div className="col-span-4 md:col-span-2 py-3 sm:py-0 md:pt-5 md:pl-4 flex items-center h-full">
                                <label htmlFor="archived" className="text-sm font-medium text-gray-900 mr-2">
                                    Archived:
                                </label>
                                <input
                                    id="archived"
                                    name="archived"
                                    type="checkbox"
                                    checked={formData.archived}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                            </div>



                            {/* Description Field */}
                            <div className="col-span-8">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 block w-full py-1.5 ${
                                        isEditing
                                            ? 'rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                            : 'border-none bg-transparent focus:ring-0'
                                    } sm:text-sm`}
                                    rows={isEditing ? 4 : 2}
                                />
                            </div>

                            {/* Buttons */}
                            {isEditing && (
                                <div className="col-span-full flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                        disabled={!isModified}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ViewEditTaskPage;

