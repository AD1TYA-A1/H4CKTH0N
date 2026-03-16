"use client"
import React, { useState } from 'react'

const page = () => {
    const [userName, setUserName] = useState("")

    const handleSubmit = () => {
        console.log("Entered userName:", userName)
        const axios = require('axios');
        let data = JSON.stringify({
            "userName": userName
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/testingAxios',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Testing Axios
                </h1>

                <input
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    Send
                </button>
            </div>

        </div>
    )
}

export default page