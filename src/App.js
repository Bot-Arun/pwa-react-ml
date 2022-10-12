import React, { useState } from 'react';
import logo from './logo.svg';
import { FaUserCircle,FaRegCompass } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import {Dropdown } from 'semantic-ui-react'
function App() {
  // // const addressDefinitions = faker.definitions.address;
  // console.log(addressDefinitions)
  const arr = [1,2,3,4,5]
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
      <div className='  text-white py-5' >
        <div className='h-[10rem]' >
        {/* <Dropdown   placeholder='State' search selection options={arr.map((x,y) =>( {"key":y,"value":'Block'+y,text:'Block'+y}))} /> */}
        </div>
 
        <div className='bg-gray-400 rounded-lg mx-auto py-3 px-4 text-xl font-medium w-fit' >
          <span>
             Dynamic Allotment
          </span>
          <span className='ml-10' > 231</span>
        </div>
      </div>
      <div className='p-5' >
        <div className='bg-cyan-500 p-3 rounded-full w-fit ml-auto ' ><FaRegCompass size={30} /></div>
      </div>

    </div>
  );
}

export default App;
