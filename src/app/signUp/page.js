"use client"
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';


export default function GetLocation() {
    const passToggle = useRef(null)
    const [userName, setUserName] = useState("")
    const [userpNo, setUserpNo] = useState("")
    const [password, setPassword] = useState("")
    const [myOTP, setMyOTP] = useState("")
    const router = useRouter()

    const otpHandle = (e) => { setMyOTP(e.target.value) }
    const passHandleChange = (e) => { setPassword(e.target.value) }
    const nameHandleChange = (e) => { setUserName(e.target.value) }
    const pNoHandleChange = (e) => {
        const value = e.target.value;
        if (value === undefined || value === null) return;
        const numericValue = value.replace(/\D/g, '');
        setUserpNo(numericValue);
    };

    const showPass = () => {
        if (passToggle.current.type == 'password') {
            passToggle.current.type = 'text'
        } else {
            passToggle.current.type = 'password'
        }
    }

    const sendOTP = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({ "pNo": userpNo });
        const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };

        fetch("/api/checkIfUserExist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == true) {
                    toast.info('User Already Exists Redirecting.....', { position: "top-center", autoClose: 10000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" })
                    setTimeout(() => { router.push("/userLogIn") }, 3000);
                } else {
                    if (!userpNo.trim()) {
                        toast.error('Please enter your mobile Number', { position: "top-center", autoClose: 3000, theme: "dark" });
                        return;
                    } else {
                        const indianUserpNo = "+91" + userpNo
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        const raw = JSON.stringify({ "phoneNumber": indianUserpNo });
                        const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };
                        fetch("/api/sendOTP", requestOptions)
                            .then((response) => response.text())
                            .then((result) => { toast.info('OTP send SucessFullyy', { position: "top-center", autoClose: 10000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" }) })
                            .catch((error) => console.error(error));
                    }
                }
            })
            .catch((error) => console.error(error));
    }

    const submit = async () => {
        if (!userName.trim() || !userpNo.trim() || !myOTP.trim()) {
            toast.error('Please fill in all fields', { position: "top-center", autoClose: 3000, theme: "dark" });
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({ "phoneNumber": "+91" + userpNo, "otp": myOTP });
        const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };

        fetch("/api/verifyOTP", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == true) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    const raw = JSON.stringify({ "userName": userName, "pass": password, "pNo": userpNo });
                    const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };
                    fetch("/api/userAdd", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            toast.success('Success, Redirecting..', { position: "top-center", autoClose: 10000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" })
                            setUserName(""); setMyOTP(""); setUserpNo("");
                            setTimeout(() => {
                                localStorage.setItem('userData', JSON.stringify({ userName: userName, pNo: userpNo }));
                                router.push("/")
                            }, 2000);
                        })
                        .catch((error) => console.error(error));
                } else {
                    toast.error('Invalid OTP', { position: "top-center", autoClose: 3000, theme: "dark" });
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={false} newestOnTop closeOnClick={false} rtl={false} pauseOnFocusLoss draggable theme="dark" />

            <div className="min-h-screen bg-[#0a0f0d] text-white flex flex-col relative overflow-hidden">

                {/* Grid background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0,255,130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,130,0.04) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Top glow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: 600, height: 600, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,200,100,0.08) 0%, transparent 70%)",
                        top: -200, left: "50%", transform: "translateX(-50%)",
                    }}
                />

                {/* Navbar */}
                <nav className="flex items-center px-12 py-5 relative z-10">
                    <div className="flex items-center gap-2 text-white font-medium text-lg">
                        <div className="w-8 h-8 bg-[#00c875] rounded-lg flex items-center justify-center text-[#0a0f0d] font-bold text-sm">C</div>
                        CityFix
                    </div>
                </nav>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
                    <div className="w-full max-w-md">

                        {/* Back */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-white/40 text-sm mb-8 hover:text-[#00c875] transition-colors duration-200 cursor-pointer"
                        >
                            ← Back
                        </button>

                        {/* Heading */}
                        <h2 className="font-serif text-5xl font-black mb-2 leading-tight">
                            Create <span className="text-[#00c875]">Account.</span>
                        </h2>
                        <p className="text-white/40 italic font-light text-sm mb-10">
                            Join thousands making their city better.
                        </p>

                        <div className="space-y-5">

                            {/* Username */}
                            <div>
                                <label htmlFor="name" className="block text-xs text-white/50 font-medium tracking-wide mb-2">
                                    Username <span className="text-[#00c875]">*</span>
                                </label>
                                <input
                                    value={userName}
                                    onChange={nameHandleChange}
                                    type="text"
                                    id="name"
                                    placeholder="Choose a username"
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
                                        value={password}
                                        onChange={passHandleChange}
                                        type="password"
                                        id="password"
                                        placeholder="Choose a strong password"
                                        required
                                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 pr-20 text-white text-sm placeholder-white/20 outline-none focus:border-[rgba(0,200,117,0.6)] focus:bg-[rgba(0,200,117,0.05)] transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={showPass}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#00c875] font-medium hover:text-[#00e085] transition-colors duration-200 cursor-pointer px-2 py-1 rounded-md border border-[rgba(0,200,117,0.3)] hover:border-[rgba(0,200,117,0.6)]"
                                    >
                                        Show
                                    </button>
                                </div>
                            </div>

                            {/* Phone Number + Send OTP */}
                            <div>
                                <label htmlFor="phone" className="block text-xs text-white/50 font-medium tracking-wide mb-2">
                                    Phone Number <span className="text-[#00c875]">*</span>
                                </label>
                                <div className="flex gap-3">
                                    <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-xl px-3 text-white/50 text-sm font-medium select-none">
                                        +91
                                    </div>
                                    <input
                                        value={userpNo}
                                        onChange={pNoHandleChange}
                                        type="tel"
                                        id="phone"
                                        maxLength="10"
                                        minLength="10"
                                        pattern="[6-9][0-9]{9}"
                                        placeholder="10-digit mobile number"
                                        required
                                        className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-[rgba(0,200,117,0.6)] focus:bg-[rgba(0,200,117,0.05)] transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Send OTP button */}
                            <button
                                onClick={sendOTP}
                                className="w-full cursor-pointer bg-white/[0.05] border border-white/10 text-white font-medium py-3.5 rounded-xl text-sm hover:border-[rgba(0,200,117,0.5)] hover:bg-[rgba(0,200,117,0.06)] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4 text-[#00c875]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Send OTP
                            </button>

                            {/* OTP Input */}
                            <div>
                                <label className="block text-xs text-white/50 font-medium tracking-wide mb-2">
                                    Enter OTP <span className="text-[#00c875]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    maxLength="6"
                                    value={myOTP}
                                    onChange={otpHandle}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-[rgba(0,200,117,0.6)] focus:bg-[rgba(0,200,117,0.05)] transition-all duration-200 tracking-[0.3em]"
                                />
                            </div>

                        </div>

                        {/* Submit */}
                        <button
                            onClick={submit}
                            className="cursor-pointer mt-8 w-full bg-[#00c875] text-[#0a0f0d] font-bold py-4 rounded-xl text-base hover:bg-[#00e085] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,200,117,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Create Account</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                    </div>
                </main>
            </div>
        </>
    );
}