import { Folder, Home, List, Tag } from 'lucide-react'
import React from 'react'


const Dashboard = () => {
  return (
    <>
      <div className='flex '>
        <div className="w-[250px] h-[900px] bg-[#0f1b2d] text-white p-4">

       
          <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-gray-200 text-gray-900 cursor-pointer">
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </div>

          <div className="mt-6 flex flex-col gap-4">

      
            <div className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <div className="flex items-center gap-3">
                <List size={20} />
                <span>Orders</span>
              </div>
            </div>

           
            <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <Tag size={20} />
              <span>Products</span>
            </div>

     
            <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer">
              <Folder size={20} />
              <span>Other</span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard