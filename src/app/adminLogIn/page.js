"use client"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


import { useRouter } from "next/navigation";
export default function AdminLogin() {
    const router = useRouter()
    const [userName, setUserName] = useState("");
    const [passKey, setPassKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userName": userName,
            "passKey": passKey
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/adminLogIn", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    localStorage.setItem("adminUser", userName);  // store username to
                    localStorage.setItem("isAdmin", true);  // store username to
                    router.push("/adminDashBoard")
                } else {
                    toast.error('Incorrect Credentials', { position: "top-center", autoClose: 10000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" })
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                }
            })
            .catch((error) => console.error(error));

    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={false} newestOnTop closeOnClick={false} rtl={false} pauseOnFocusLoss draggable theme="dark" />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4">

                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <a href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center font-bold text-white text-sm">
                                C
                            </div>
                            <span className="font-bold text-white text-lg tracking-tight">CityFix</span>
                        </a>
                    </div>

                    {/* Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

                        {/* Header */}
                        <div className="text-center mb-7">

                            {/* Badge */}
                            <div className="flex justify-center mb-4">
                                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-red-400 bg-red-500/10 border border-red-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                    RESTRICTED ACCESS
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                Admin Portal
                            </h1>
                            <p className="text-sm text-slate-500">
                                Authorized personnel only
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 mb-6" />

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Username */}
                            <div>
                                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest text-slate-400">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter admin username"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    autoComplete="off"
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-all duration-200"
                                />
                            </div>

                            {/* PassKey */}
                            <div>
                                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest text-slate-400">
                                    PassKey
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        placeholder="Enter secret passkey"
                                        value={passKey}
                                        onChange={(e) => setPassKey(e.target.value)}
                                        required
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-base p-1"
                                    >
                                        {showPass ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                    <span>⚠</span>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!userName.trim() || !passKey.trim() || loading}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2
                ${userName.trim() && passKey.trim() && !loading
                                        ? "bg-red-500 hover:bg-red-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
                                        : "bg-white/5 text-slate-600 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin inline-block">◌</span>
                                        Verifying…
                                    </>
                                ) : (
                                    "Access Admin Panel →"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="border-t border-white/5 mt-6 mb-5" />

                        {/* Footer warning */}
                        <p className="text-center text-xs text-slate-700">
                            🔒 All access attempts are logged and monitored
                        </p>
                    </div>

                    {/* Back link */}
                    <p className="text-center mt-6 text-sm text-slate-500">
                        Not an admin?{" "}
                        <a href="/" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                            Go back home
                        </a>
                    </p>
                </div>
            </div>
        </>

    );
}