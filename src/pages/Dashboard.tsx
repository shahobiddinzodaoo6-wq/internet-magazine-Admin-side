import { Folder, Home, List, Tag } from 'lucide-react'
import { BarChart3, DollarSign, CheckCircle } from "lucide-react"
import React from 'react'
import { Link } from 'react-router'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"





const Dashboard = () => {


  const data = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 5 },
    { name: "Mar", value: 15 },
    { name: "Apr", value: 10 },
    { name: "May", value: 35 },
    { name: "Jun", value: 30 },
    { name: "Jul", value: 35 },
    { name: "Aug", value: 50 },
    { name: "Sep", value: 45 },
    { name: "Oct", value: 25 },
    { name: "Nov", value: 25 },
    { name: "Dec", value: 35 },
  ]



  return (
    <>
      <div className='flex '>
        <div className="w-[250px] h-[1200px] bg-[#0f1b2d] text-white p-4">


          <div className="flex items-center w-[218px] gap-3 px-4 py-3 rounded-md bg-gray-200 text-gray-900 cursor-pointer">
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </div>

          <div className="mt-6 flex flex-col gap-4">


            <Link to={"/Orders"}>
              <div className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <List size={20} />
                  <span>Orders</span>
                </div>
              </div>
            </Link>


            <Link to={"/Products"}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer">
                <Tag size={20} />
                <span>Products</span>
              </div>
            </Link>

            <Link to={"/Categories"}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer">
                <Folder size={20} />
                <span>Other</span>
              </div>
            </Link>

          </div>
        </div>


        <div className="p-6 bg-[#f5f6fa] min-h-screen">

          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          {/* TOP CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-6">

            <div className="flex items-center gap-4 bg-[#fdf0ee] p-5 rounded-2xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#fcd5cf] text-[#ff7a59]">
                <BarChart3 size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sales</p>
                <h2 className="text-xl font-bold">$152k</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#fdf7e7] p-5 rounded-2xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#fdecc8] text-[#f59e0b]">
                <DollarSign size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cost</p>
                <h2 className="text-xl font-bold">$99.7k</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#eafaf3] p-5 rounded-2xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#c9f2dc] text-[#22c55e]">
                <CheckCircle size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profit</p>
                <h2 className="text-xl font-bold">$32.1k</h2>
              </div>
            </div>

            <div></div>
          </div>

          {/* GRAPH + RIGHT */}
          <div className="grid grid-cols-3 gap-6 mb-6">

            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="font-semibold mb-5">Sales Revenue</h2>

              <div className="h-[300px]">
                <ResponsiveContainer>
                  <LineChart data={data}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-semibold">Top selling products</h2>
                <span className="text-sm text-gray-400 cursor-pointer">
                  See All →
                </span>
              </div>

              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-3 mb-4">
                  <img
                    src="https://picsum.photos/50"
                    className="w-12 h-12 rounded-md"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Healthcare Erbology
                    </p>
                    <p className="text-xs text-gray-400">
                      in Accessories
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-green-600 font-medium text-sm">
                      13,153
                    </p>
                    <p className="text-xs text-gray-400">
                      in sales
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABLES */}
          <div className="grid grid-cols-2 gap-6">

            {/* LEFT */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-lg font-semibold mb-5">
                Recent Transactions
              </h2>

              <div className="grid grid-cols-4 text-sm text-gray-400 mb-3">
                <span>Name</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Status</span>
              </div>

              <div className="flex flex-col gap-4 text-sm">
                {[
                  ["Jaganrath S.", "24.05.2023", "$124.97", "Paid"],
                  ["Anand G.", "23.05.2023", "$55.42", "Pending"],
                  ["Kartik S.", "23.05.2023", "$89.90", "Paid"],
                  ["Rakesh S.", "22.05.2023", "$144.94", "Pending"],
                  ["Anup S.", "22.05.2023", "$70.52", "Paid"],
                  ["Jimmy P.", "22.05.2023", "$70.52", "Paid"],
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-4 border-t pt-3 items-center">
                    <span>{item[0]}</span>
                    <span className="text-gray-500">{item[1]}</span>
                    <span>{item[2]}</span>

                    <span
                      className={`w-fit px-3 py-1 rounded-md text-xs font-medium ${item[3] === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {item[3]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-lg font-semibold mb-5">
                Top Products by Units Sold
              </h2>

              <div className="grid grid-cols-3 text-sm text-gray-400 mb-3">
                <span>Name</span>
                <span>Price</span>
                <span>Units</span>
              </div>

              

              <div className="flex flex-col gap-4 text-sm">
                {[
                  ["Men Grey Hoodie", "$49.90", 204],
                  ["Women Striped T-Shirt", "$34.90", 155],
                  ["Women White T-Shirt", "$40.90", 120],
                  ["Men White T-Shirt", "$49.90", 204],
                  ["Women Red T-Shirt", "$34.90", 155],
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 border-t pt-3 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-md" />
                      <span>{item[0]}</span>
                    </div>

                    <span>{item[1]}</span>
                    <span>{item[2]}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard