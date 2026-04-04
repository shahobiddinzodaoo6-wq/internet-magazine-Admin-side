import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import logo from '../assets/Group 1116606595 (2).png'
import { useNavigate } from "react-router"
import { axiosRequest } from "../store/counter"
import { jwtDecode } from "jwt-decode"

const Login = () => {
  const [show, setShow] = useState(false)



  const navigate = useNavigate()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const obj =
    {
      userName: (event.target["userName"].value),
      password: (event.target["password"].value)
    }
    try {
      const { data } = await axiosRequest.post(`/Account/login`, obj)
      const decoded = data.data && jwtDecode(data.data);
      const role = data.data && decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      const haveAccess = role == "Admin" || role == "SuperAdmin"
      if (data.status == 200 && haveAccess) {
        navigate("/Dashboard")
      }
      else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);

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

          <form onSubmit={handleSubmit}>

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