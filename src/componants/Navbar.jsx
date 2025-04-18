import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-violet-800 text-white py-2'>
        <div className="log">
            <span className='font-bold text-x1 mx-8'> myTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
