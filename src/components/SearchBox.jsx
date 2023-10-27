import React from 'react'

const SearchBox = () => {
    return (
        <form className=' ml-7 mr-7 mt-4'>
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="">
                <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm  border border-gray-200 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white  text-black " placeholder="Search" required />
            </div>
        </form>
    )
}

export default SearchBox