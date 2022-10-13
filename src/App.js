import React, { useState } from 'react';
import logo from './logo.svg';
import { FaUserCircle,FaRegCompass } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { Select,Input } from 'react-daisyui'
function App() {
  const [block, setBlock] = useState("Block1");
  return (
    <div className=" flex flex-col h-screen bg-black justify-center " >
      <header className="flex  py-3 px-2 bg-gray-800 text-gray-400  ">
        <div className='icon '><FaUserCircle size={40} /></div>
        <div className='title self-center ml-2 font-semibold  text-[1.5rem]'>Home</div>
        <div className='ml-auto'><AiFillSetting size={40}></AiFillSetting></div>
      </header>
      <div className='box flex  px-3 py-3 my-auto'>
        <div className='rounded-xl text-white px-3 py-3 w-full bg-gray-400' >
          <div>
            Your Destination
          </div>
          <div> 
            {block}
          </div>
          <div> 
            Parking Status
          </div>
          <div className='text-emerald-600 text-lg font-semibold' > 
            In Campus
          </div>
          <div> 
            Your Allotment
          </div>
          <div className='text-xl font-bold'>
            A - 12
          </div>
        </div>
      </div>
      <div data-theme="cupcake"  className='flex flex-col justify-between  bg-black  text-white py-5' >
        <div className='h-[5rem]  text-sm mx-auto flex justify-center ' >
        <SelectBlock block={block} setBlock={setBlock}  />
        </div>
 
        <div className='bg-gray-400 rounded-md mx-auto py-2 px-4  font-medium w-fit flex ' >
          <span className='self-center' >
             Dynamic Allotment
          </span>
          <span className='ml-10' ><Input type="checkbox" className=" mt-2 toggle self-stretch "  /></span>
        </div>
      </div>
      <div className='p-5' >
        <div className='bg-cyan-500 p-3 rounded-full w-fit ml-auto ' ><FaRegCompass size={30} /></div>
      </div>

    </div>
  );
}

const SelectBlock = ({block ,setBlock}) => {
  return (
    <Select  className='bg-gray-500 pr-20 text-left text-sm rounded-xl text-white select' size={100} color={''}
        initialValue={'default'}
        onChange={x => setBlock(x)}
      >
        <option value={'default'} className='rounded-t-md text-gray-400' disabled>
            {block}
        </option>
        <option value={'Block1'}>Block1</option>
        <option value={'Block2'}>Block2</option>
        <option value={'Block3'}>Block3</option>
        <option value={'Block4'}>Block4</option>
        <option value={'Block5'}>Block5</option>
      </Select>
  )
}
export default App;
