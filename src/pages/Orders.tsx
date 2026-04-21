import { Folder, Home, List, Tag, Edit, Trash2, X, Plus, Eye, EyeOff } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import type { RootState, AppDispatch } from "../store/store"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUser, deleteUser, addUser, updateUser } from '../api/userApi/userApi'
import { API_IMAGE } from '../utils/url'

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { dataOrders } = useSelector((state: RootState) => state.user)

  // Modals Visibility
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  // Password Visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // React-Hook-Form
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  // Handlers for Form Modal
  const openAddModal = () => {
    setModalMode("add")
    setSelectedId(null)
    reset({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "Admin"
    })
    setShowPassword(false)
    setShowConfirmPassword(false)
    setIsModalOpen(true)
  }

  const openEditModal = (user: any) => {
    setModalMode("edit")
    setSelectedId(user.userId)
    reset({
      userName: user.userName || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      password: "",
      confirmPassword: "",
      role: user.userRoles?.[0]?.name || "Admin"
    })
    setShowPassword(false)
    setShowConfirmPassword(false)
    setIsModalOpen(true)
  }

  // Handlers for Delete Modal
  const openDeleteModal = (id: string) => {
    setUserToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete))
      setDeleteModalOpen(false)
      setUserToDelete(null)
    }
  }

  const onSubmitForm = async (data: any) => {
    const formData = new FormData()
    if (modalMode === "edit" && selectedId) {
      formData.append("Id", selectedId)
    }
    
    formData.append("UserName", data.userName)
    formData.append("FirstName", data.firstName)
    formData.append("LastName", data.lastName)
    formData.append("Email", data.email)
    formData.append("PhoneNumber", data.phoneNumber)
    
    if (data.password) {
      formData.append("Password", data.password)
      formData.append("ConfirmPassword", data.confirmPassword)
    }
    
    formData.append("Role", data.role)
    
    // data.image is a FileList from react-hook-form
    if (data.image && data.image.length > 0) {
      formData.append("Image", data.image[0])
    }

    if (modalMode === "add") {
      await dispatch(addUser(formData))
    } else {
      await dispatch(updateUser(formData))
    }
    
    setIsModalOpen(false)
    dispatch(getUser()) // Refresh table data
  }

  return (
    <>
      <div className='flex'>
        {/* SIDEBAR */}
        <div className="w-[250px] min-h-screen bg-[#0f1b2d] text-white p-4">
          <Link to={"/Dashboard"}>
            <div className=" flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/5 cursor-pointer ">
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center w-[218px] gap-3 px-4 py-3 rounded-md bg-gray-200 text-gray-900 cursor-pointer">
              <div className="flex items-center gap-3">
                <List size={20} />
                <span>Orders / Users</span>
              </div>
            </div>

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

        {/* MAIN CONTENT */}
        <div className="p-6 w-full bg-[#f5f6fa] min-h-screen">
          <div className="flex justify-between mb-6 mt-20">
            <h1 className="text-2xl font-semibold">Users / Orders</h1>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Add User
            </button>
          </div>

          {/* TABLE CARD */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="text-gray-400">
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {dataOrders?.map((e: any) => (
                  <TableRow key={e.userId} className="hover:bg-gray-50">
                    <TableCell>
                      <img
                        src={e.image ? `${API_IMAGE}/${e.image}` : `https://ui-avatars.com/api/?name=${e.userName}`}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="avatar"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{e.userName}</TableCell>
                    <TableCell>{e.email || "—"}</TableCell>
                    <TableCell>{e.phoneNumber || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {e.userRoles?.map((r: any) => (
                          <span
                            key={r.id}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {r.name}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{e.dob ? new Date(e.dob).toLocaleDateString() : "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => openEditModal(e)}
                          className="text-gray-500 hover:text-blue-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(e.userId)}
                          className="text-gray-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-md w-full max-w-[360px] p-6 text-center">
            
            <h2 className="text-xl font-medium text-gray-900 mb-3 text-left">
              Подтвердите действие
            </h2>
            <p className="text-gray-600 mb-8 font-normal text-[15px] text-left border-t pt-4">
              Оё шумо боварӣ доред, ки инро нест кардан мехоҳед?
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={confirmDelete}
                className="px-6 py-2 text-white bg-[#0f53c1] rounded-full hover:bg-blue-800 font-medium transition"
              >
                ОК
              </button>
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="px-6 py-2 text-[#0f53c1] bg-blue-100/50 hover:bg-blue-100 rounded-full font-medium transition"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "add" ? "Add New User" : "Edit User"}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  {...register("userName", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-[#eff4fa]/50"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    {...register("firstName")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-[#eff4fa]/50"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    {...register("lastName")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-[#eff4fa]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-[#eff4fa]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  {...register("phoneNumber")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-[#eff4fa]/50"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      {...register("password", { required: modalMode === "add" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 pr-10 bg-[#eff4fa]/50"
                      placeholder={modalMode === "edit" ? "Blank = keep" : ""}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", { required: modalMode === "add" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 pr-10 bg-[#eff4fa]/50"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  {...register("role")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  {...register("image", { required: modalMode === "edit" })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium transition"
                >
                  {modalMode === "add" ? "Add User" : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Orders