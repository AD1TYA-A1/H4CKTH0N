"use client"
import { useRef } from 'react';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';


export default function UserLogin() {
    useEffect(() => {
        localStorage.clear()
    }, [])

    const router = useRouter()
    const passToggle = useRef(null)

    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const handleChangeUserName = (e) => {
        setUserName(e.target.value)
    }
    const handleChangepassWord = (e) => {
        setPassWord(e.target.value)
    }
    const showPass = () => {
        if (passToggle.current.type == 'password') {
            passToggle.current.type = 'text'
        } else {
            passToggle.current.type = 'password'
        }
    }


    const handleSubmit = () => {
        if (userName.trim() == "") {
            toast.error('Enter UserName', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (passWord.trim() == "") {
            toast.error('Enter Your Password', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "userName": userName,
                "pass": passWord
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("/api/checkUser", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        localStorage.setItem('userData', JSON.stringify({
                            pNo: result.pNo,
                            userName: userName
                        }));
                        router.push("/dashBoard")
                    }
                    else {
                        toast.error('Invalid Credentials', {
                            position: "top-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })

                    }
                })
                .catch((error) => console.error(error));
        }

        // Add your login logic here
        // router.push('/dashboard') // Navigate after successful login
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5">
                <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Please enter your details to continue
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="userName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                User Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={userName}
                                onChange={handleChangeUserName}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {/* Password field */}
                        <div>
                            <label
                                htmlFor="userName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                PassWord <span className="text-red-500">*</span>
                            </label>
                            <input
                                ref={passToggle}
                                type="password"
                                id="password"
                                name="password"
                                value={passWord}
                                onChange={handleChangepassWord}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                            />
                        </div>


                        <div
                            onClick={showPass}
                            className="mt-2 mx-auto px-4 py-1 sm:px-6 sm:py-1.5 w-16 sm:w-20 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-md cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md select-none flex items-center justify-center"
                        >
                            <span>Show</span>
                        </div>





                        {/* Continue Button */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className=" cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 mt-4"
                        >
                            <span>Continue</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

