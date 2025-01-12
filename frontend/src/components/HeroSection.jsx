import { setSearchQuery } from '@/store/jobSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const searchHandler = () => {
    dispatch(setSearchQuery(query))
    console.log(query);
    
    navigate('/browse')
    
  }
  


  return (
    <div className='flex flex-col justify-center items-center text-center m-[6rem] gap-4 '>
      <div className='bg-[#f2f2f2] px-3 py-1.5 rounded-sm font-semibold'><h1 className='text-[#2b2b2b]'>No 1 Job Hunt Website</h1></div>
      <div className='w-[35%]'>
        <h2 className='text-5xl font-semibold'>Search,Apply & Get Your <span className='text-[#1561f0]'>Dream Job</span></h2>
      </div>
      <div className='w-[40%]'>
        <p className='text-[#2b2b2b]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores placeat inventore enim minus ad laboriosam dolorem in soluta veritatis? Nobis?</p>
      </div>

   
        <div className='flex items-center bg-[#2b2b2b]  w-[500px] gap-1.5 rounded-sm' style={{ boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>

          <input
            onChange={(e) => setQuery(e.target.value)}
            className='w-[92%] px-3 py-1.5  border-none outline-none text-md bg-[#f2f2f2]  placeholder:text-black '
            type="text" placeholder='Find Your dream Job here!!' />
          <div className='text-white'
          onClick={searchHandler}>
            <Search style={{ fontSize: "18px" }} />
          </div>
        </div>
      
    </div>
  )
}

export default HeroSection