// components/SearchBar.component.jsx
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
    return (
        <div className="flex rounded-md shadow-sm border">
            <div className="relative flex-grow focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-0 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
            </div>
        </div>
    );
};

export default SearchBar;
