import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import logo from '../assets/Group 1116606595 (2).png'
import { useNavigate } from "react-router"

import { jwtDecode } from "jwt-decode"
import { axiosRequest } from "../reducers/token"
import { loginUser } from "../api/authApi/authApi"
import { useDispatch } from "react-redux"

const Login = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function submitLogin(e) {
    e.preventDefault()
    const form = e.currentTarget
    const userName = (form.elements.namedItem("userName") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    const res = await dispatch(
      loginUser({
        userName,
        password,
      })
    )

    if ((res as any).payload?.statusCode === 200) {
      navigate("/Dashboard")
    }
  }




  
  return (
    <div className="min-h-screen flex">


      <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-10">
        <div>
          <p className="text-lg mb-6">Welcome to admin panel</p>

          <img src={logo} />

        </div>
      </div>


      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-[#0b0b0f]">

        <div className="w-full max-w-[400px] bg-white dark:bg-[#111] p-8 rounded-xl shadow-md">

          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Log in
          </h2>

          <form onSubmit={submitLogin}>

            <input
              type="text"
              name="userName"
              placeholder="Email"
              className="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent text-gray-900 dark:text-white outline-none"
            />


            <div className="relative mb-4">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent text-gray-900 dark:text-white outline-none"
              />

              <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-sm text-blue-600 mb-4 cursor-pointer">
              Forgot password?
            </p>


            <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Log in
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login