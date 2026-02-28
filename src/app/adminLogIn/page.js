"use client"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter()
    const [userName, setUserName] = useState("");
    const [passKey, setPassKey] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    // ✏️ WIRE UP YOUR API HERE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Step 1: Verify OTP first
            const otpRes = await fetch("/api/verifyOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: "+91" + phoneNumber, otp }),
            });
            const otpResult = await otpRes.json();

            if (!otpResult.success) {
                toast.error(otpResult.message || "Invalid OTP", { position: "top-center", autoClose: 3000, theme: "dark" });
                setLoading(false);
                return;
            }

            // Step 2: Check admin credentials
            const adminRes = await fetch("/api/adminLogIn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, passKey }),
            });
            const adminResult = await adminRes.json();

            if (!adminResult.success) {
                toast.error("Incorrect Credentials", { position: "top-center", autoClose: 3000, theme: "dark" });
                setLoading(false);
                return;
            }

            // Step 3: All good → redirect
            toast.success("Access Granted! Redirecting...", { position: "top-center", autoClose: 2000, theme: "dark" });
            localStorage.setItem("adminUser", userName);
            localStorage.setItem("isAdmin", true);
            setTimeout(() => router.push("/adminDashBoard"), 2000);

        } catch (err) {
            console.error(err);
            // toast.error("Something went wrong", { position: "top-center", autoClose: 3000, theme: "dark" });
        } finally {
            setLoading(false);
        }
    };

    // ✏️ WIRE UP YOUR SEND OTP API HERE
    const handleSendOtp = async () => {
        if (!phoneNumber.trim() || phoneNumber.length < 10) {
            toast.error("Enter a valid phone number", { position: "top-center", theme: "dark" });

            return;
        }
        try {
            const indianUserpNo = "+91" + phoneNumber

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({ "phoneNumber": indianUserpNo });
            const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };
            fetch("/api/sendOTP", requestOptions)
                .then((response) => response.json())
                .then((result) => { toast.info('OTP send SucessFullyy', { position: "top-center", autoClose: 10000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" }) })
                .catch((error) => console.error(error));
            if (result.success) {
                toast.success("OTP sent!", { position: "top-center", theme: "dark" });
            } else {
                toast.error(result.message || "Failed to send OTP", { position: "top-center", theme: "dark" });
            }
        } catch (err) {
            toast.error("Something went wrong", { position: "top-center", theme: "dark" });
        }
    };

    const access = async () => {
        try {
            // Step 1: Verify OTP
            const otpRes = await fetch("/api/verifyOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: "+91" + userpNo, otp: myOTP }),
            });
            const otpResult = await otpRes.json();

            if (!otpResult.success) {
                toast.error("Invalid OTP", { position: "top-center", autoClose: 3000, theme: "dark" });
                return;
            }

            // Step 2: Add User
            const userRes = await fetch("/api/userAdd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, pass: password, pNo: userpNo }),
            });
            const userResult = await userRes.json();

            if (!userResult.success) {
                toast.error(userResult.message || "Registration failed", { position: "top-center", autoClose: 3000, theme: "dark" });
                return;
            }

            // Step 3: Success
            toast.success("Success, Redirecting..", { position: "top-center", autoClose: 2000, theme: "dark" });
            localStorage.setItem("userData", JSON.stringify({ userName, pNo: userpNo }));
            setUserName(""); setMyOTP(""); setUserpNo("");

            setTimeout(() => router.push("/dashBoard"), 2000);

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { position: "top-center", autoClose: 3000, theme: "dark" });
        }
    };


    const isFormValid = userName.trim() && passKey.trim() && phoneNumber.trim() && otp.trim();

    return (
        <>
            <ToastContainer position="top-right" autoClose={false} newestOnTop closeOnClick={false} rtl={false} pauseOnFocusLoss draggable theme="dark" />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4">
                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <a href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center font-bold text-white text-sm">C</div>
                            <span className="font-bold text-white text-lg tracking-tight">CityFix</span>
                        </a>
                    </div>

                    {/* Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

                        {/* Header */}
                        <div className="text-center mb-7">
                            <div className="flex justify-center mb-4">
                                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-red-400 bg-red-500/10 border border-red-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                    RESTRICTED ACCESS
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
                            <p className="text-sm text-slate-500">Authorized personnel only</p>
                        </div>

                        <div className="border-t border-white/5 mb-6" />

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Username */}
                            <div>
                                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest text-slate-400">Username</label>
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
                                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest text-slate-400">PassKey</label>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        placeholder="Enter secret passkey"
                                        value={passKey}
                                        onChange={(e) => setPassKey(e.target.value)}
                                        required
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-all duration-200"
                                    />
                                    <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-base p-1">
                                        {showPass ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Phone Number + Send OTP */}
                            <div>
                                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest text-slate-400">Phone Number</label>
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                                        maxLength={15}
                                        required
                                        className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={!phoneNumber.trim()}
                                        className={`px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap
                                            ${phoneNumber.trim()
                                                ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                                                : "bg-white/5 text-slate-600 cursor-not-allowed"
                                            }`}
                                    >
                                        Send OTP
                                    </button>
                                </div>
                            </div>

                            {/* OTP */}
                            <div>
                                <label className="block text-xs font-semibold mb-2 uppercase tracking-widest text-slate-400">OTP</label>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    maxLength={6}
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-all duration-200 tracking-widest"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                onClick={() => { handleSubmit }}
                                type="submit"
                                disabled={!isFormValid || loading}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2
                                    ${isFormValid && !loading
                                        ? "bg-red-500 hover:bg-red-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
                                        : "bg-white/5 text-slate-600 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? (<><span className="animate-spin inline-block">◌</span>Verifying…</>) : ("Access Admin Panel →")}
                            </button>
                        </form>

                        <div className="border-t border-white/5 mt-6 mb-5" />
                        <p className="text-center text-xs text-slate-700">🔒 All access attempts are logged and monitored</p>
                    </div>

                    <p className="text-center mt-6 text-sm text-slate-500">
                        Not an admin?{" "}
                        <a href="/" className="text-red-400 font-semibold hover:text-red-300 transition-colors">Go back home</a>
                    </p>
                </div>
            </div>
        </>
    );
}