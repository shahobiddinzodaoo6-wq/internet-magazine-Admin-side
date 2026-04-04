import React from 'react'
import { Bell, Folder, Home, List, Search, Tag } from "lucide-react"
import { Outlet } from 'react-router'
import logo from '../assets/Group 1116606595 (3).png'

const Layout = () => {
    return (
        <>
            <header className="w-full bg-[#0f1b2d] text-white h-[70px] px-6 py-3 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                    />
                </div>

                <div className="flex items-center bg-[#334155] px-4 py-2 rounded-lg w-[400px]">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none ml-2 text-sm w-full placeholder-gray-400"
                    />
                </div>

                <div className="flex items-center gap-6">

                    <div className="relative cursor-pointer">
                        <Bell size={20} />
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            5
                        </span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-semibold">
                            R
                        </div>
                        <p className="text-sm">Randhir kumar</p>
                    </div>

                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout