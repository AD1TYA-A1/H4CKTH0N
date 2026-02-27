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

    const otpHandle = (e) => {
        setMyOTP(e.target.value)
    }
    const passHandleChange = (e) => {
        setPassword(e.target.value)
    }

    const nameHandleChange = (e) => {
        setUserName(e.target.value)
    }

    const pNoHandleChange = (e) => {
        const value = e.target.value;
        if (value === undefined || value === null) return;

        // Only allow digits
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

        const raw = JSON.stringify({
            "pNo": userpNo,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/checkIfUserExist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.success);
                if (result.success == true) {
                    toast.info('User Already Exists Redirecting.....', {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                    setTimeout(() => {
                        router.push("/userLogIn")
                    }, 3000);
                }
                else {
                    if (!userpNo.trim()) {
                        toast.error('Please enter your mobile Number', {
                            position: "top-center",
                            autoClose: 3000,
                            theme: "dark",
                        });
                        return;

                    } else {
                        const indianUserpNo = "+91" + userpNo
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        const raw = JSON.stringify({
                            "phoneNumber": indianUserpNo
                        });

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: raw,
                            redirect: "follow"
                        };

                        fetch("/api/sendOTP", requestOptions)
                            .then((response) => response.text())
                            .then((result) => {
                                toast.info('OTP send SucessFullyy', {
                                    position: "top-center",
                                    autoClose: 10000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                })
                            })
                            .catch((error) => console.error(error));
                    }
                }

            })
            .catch((error) => console.error(error));
    }

    const submit = async () => {
        // Validation check
        if (!userName.trim() || !userpNo.trim() || !myOTP.trim()) {
            toast.error('Please fill in all fields', {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "phoneNumber": "+91" + userpNo,
            "otp": myOTP
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/verifyOTP", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == true) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    const raw = JSON.stringify({
                        "userName": userName,
                        "pass": password,
                        "pNo": userpNo,
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch("/api/userAdd", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            toast.success('Success, Redirecting..', {
                                position: "top-center",
                                autoClose: 10000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            })

                            // Clear form AFTER successful submission
                            setUserName("");
                            setMyOTP("");
                            setUserpNo("");

                            setTimeout(() => {
                                localStorage.setItem('userData', JSON.stringify({
                                    userName: userName,
                                    pNo: userpNo
                                }));
                                router.push("/")   // Redirect to the main page
                            }, 2000);
                        })
                        .catch((error) => console.error(error));
                }
                else {
                    toast.error('Invalid OTP', {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            })
            .catch((error) => console.error(error));
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome User</h1>
                    <p className="text-gray-600 mb-8 text-center">Share your location to find nearby salons</p>

                    {/* Name Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            UserName <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={userName}
                            onChange={nameHandleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Choose UserName"
                            required
                            className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            PassWord <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={passToggle}
                            value={password}
                            onChange={passHandleChange}
                            type="password"
                            id="name"
                            name="name"
                            placeholder="Choose Password"
                            required
                            className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    <div
                        onClick={showPass}
                        className="mt-2 mx-auto px-4 py-1 sm:px-6 sm:py-1.5 w-16 sm:w-20 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-md cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md select-none flex items-center justify-center"
                    >
                        <span>Show</span>
                    </div>


                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={userpNo}
                            onChange={pNoHandleChange}
                            type="tel"
                            id="phone"
                            maxLength="10"
                            minLength="10"
                            pattern="[6-9][0-9]{9}"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Send OTP Button */}
                    <button
                        onClick={sendOTP}
                        className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition mb-5">
                        📱 Send OTP
                    </button>

                    {/* OTP Input Field */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Enter OTP <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            className="text-black w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                            value={myOTP}
                            onChange={otpHandle}
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={submit}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg border-2 border-amber-600"
                        >
                            ✉️ Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
