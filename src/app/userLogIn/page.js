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
            <div className="min-h-screen bg-[#0a0f0d] text-white flex flex-col relative overflow-hidden">

                {/* Grid background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(0,255,130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,130,0.04) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Top glow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,200,100,0.08) 0%, transparent 70%)",
                        top: -200,
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                />

                {/* Navbar */}
                <nav className="flex items-center px-12 py-5 relative z-10">
                    <div className="flex items-center gap-2 text-white font-medium text-lg">
                        <div className="w-8 h-8 bg-[#00c875] rounded-lg flex items-center justify-center text-[#0a0f0d] font-bold text-sm">
                            C
                        </div>
                        CityFix
                    </div>
                </nav>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
                    <div className="w-full max-w-md">

                        {/* Back button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-white/40 text-sm mb-8 hover:text-[#00c875] transition-colors duration-200 cursor-pointer"
                        >
                            ← Back
                        </button>

                        {/* Heading */}
                        <h2 className="font-serif text-5xl font-black mb-2 leading-tight">
                            Welcome <span className="text-[#00c875]">Back.</span>
                        </h2>
                        <p className="text-white/40 italic font-light text-sm mb-10">
                            Sign in to continue reporting and upvoting issues.
                        </p>

                        <div className="space-y-5">
                            {/* Username */}
                            <div>
                                <label htmlFor="userName" className="block text-xs text-white/50 font-medium tracking-wide mb-2">
                                    User Name <span className="text-[#00c875]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={userName}
                                    onChange={handleChangeUserName}
                                    placeholder="Enter your username"
                                    required
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-[rgba(0,200,117,0.6)] focus:bg-[rgba(0,200,117,0.05)] transition-all duration-200"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-xs text-white/50 font-medium tracking-wide mb-2">
                                    Password <span className="text-[#00c875]">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        ref={passToggle}
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={passWord}
                                        onChange={handleChangepassWord}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 pr-20 text-white text-sm placeholder-white/20 outline-none focus:border-[rgba(0,200,117,0.6)] focus:bg-[rgba(0,200,117,0.05)] transition-all duration-200"
                                    />
                                    {/* Show/Hide toggle inside input */}
                                    <button
                                        type="button"
                                        onClick={showPass}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#00c875] font-medium hover:text-[#00e085] transition-colors duration-200 cursor-pointer px-2 py-1 rounded-md border border-[rgba(0,200,117,0.3)] hover:border-[rgba(0,200,117,0.6)]"
                                    >
                                        Show
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="cursor-pointer mt-8 w-full bg-[#00c875] text-[#0a0f0d] font-bold py-4 rounded-xl text-base hover:bg-[#00e085] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,200,117,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Continue</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                    </div>
                </main>
            </div>
        </>
    )
}