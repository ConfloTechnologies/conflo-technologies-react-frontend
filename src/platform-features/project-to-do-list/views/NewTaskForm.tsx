import React, { FC, useState, ChangeEvent, useEffect, useRef } from 'react';
import PageHeader from "../../../common/components/PageHeader.component";
import {useDynamicContentHeight} from "../../../common/utils/useDynamicContentHeightSettingOne";
const NewTaskForm: FC = () => {
    // Local state variables for form fields
    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [projectAssignment, setProjectAssignment] = useState<string>('');
    const [mainContentHeight, setMainContentHeight] = useState('');
    const headerRef = useRef<HTMLDivElement>(null); // Fix type here
    // const paginationRef = useRef<HTMLDivElement>(null);
    useDynamicContentHeight(headerRef, setMainContentHeight, );
    // Handler functions for input changes
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };

    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleProjectAssignmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setProjectAssignment(e.target.value);
    };

    // Sample project options (you can replace this with data from your API)
    const projectOptions = [
        { id: '1', name: 'Project Alpha' },
        { id: '2', name: 'Project Beta' },
        { id: '3', name: 'Project Gamma' },
    ];

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a new task object
        const newTask = {
            title,
            dueDate,
            priority,
            description,
            projectAssignment,
            completed: false,
            archived: false,
        };

        // Here you would typically send the newTask to your backend API or update your state management
        console.log('New Task:', newTask);

        // Reset the form fields
        setTitle('');
        setDueDate('');
        setPriority('');
        setDescription('');
        setProjectAssignment('');
    };

    return (
        <>
            {/* Sticky Header */}
            <div ref={headerRef} className="overflow-hidden p-4">
                <PageHeader
                    pageTitle="Project To-Dos"
                    pageDescription="Manage and track project tasks."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Project To-Dos Training"
                />
            </div>

            <div className="overflow-auto px-4" style={{height: mainContentHeight}}>


                <div className="border border-gray-300 rounded-lg">

                    <div className=" text-xl font-bold pt-2 pb-2 px-4 bg-white rounded-t-lg">
                        <h2>New Task Form</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-4 p-4">
                        {/* Task Title Field */}
                        <div className="col-span-4 md:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                                Task Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter task title"
                                value={title}
                                onChange={handleTitleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                            />
                        </div>


                        {/* Project Assignment Field */}
                        <div className="col-span-4 md:col-span-2">
                            <label htmlFor="projectAssignment" className="block text-sm font-medium text-gray-900">
                                Project Assignment
                            </label>
                            <select
                                id="projectAssignment"
                                name="projectAssignment"
                                value={projectAssignment}
                                onChange={handleProjectAssignmentChange}
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
                        </div>

                        {/* Due Date Field */}
                        <div className="col-span-4 md:col-span-2">
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-900">
                                Due Date
                            </label>
                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={handleDueDateChange}
                                className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                            />
                        </div>

                        {/* Priority Field */}
                        <div className="col-span-4 md:col-span-2">
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-900">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={priority}
                                onChange={handlePriorityChange}
                                className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                            >
                                <option value="">Select priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        {/* Description Field */}
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter task description"
                                value={description}
                                onChange={handleDescriptionChange}
                                className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                rows={4}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className=" col-span-full flex justify-end space-x-2">
                            <button
                                type="button"
                                // onClick={handleCancel}
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewTaskForm;
