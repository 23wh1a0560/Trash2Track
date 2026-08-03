import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, X, ArrowLeft, ShieldCheck, Zap, CheckCircle2, Save, Eye, EyeOff } from 'lucide-react';
import API from "../api/axios";
import { setAuthToken } from "../api/axios";
import { useNavigate } from "react-router-dom";
const EntryCard = ({ isOpen, onClose, onLogin }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const [signupEmail, setSignupEmail] = useState("");
  const [signupOtp, setSignupOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // LOGIN VIEWS: 'login', 'forgot', 'reset-password'
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [loginView, setLoginView] = useState('login');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // backend errors
  // SIGNUP STATES: 1 = Email/OTP, 2 = Details
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupNameError, setSignupNameError] = useState("");
  const [signupPhoneError, setSignupPhoneError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [signupConfirmPasswordError, setSignupConfirmPasswordError] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //handle login
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!loginEmail) {
      setEmailError("Email required");
      return;
    }

    if (!isValidEmail(loginEmail)) {
      setEmailError("Enter valid email");
      return;
    }

    if (!loginPassword) {
      setPasswordError("Password required");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
      });

      console.log("DATA:", res.data);
if (res.data?.token) {
  setAuthToken(res.data.token);

  if (onLogin) onLogin(res.data);

  navigate("/dashboard");
}
      else {
        setLoginError("Login failed");
      }


    } catch (err) {
      const message = err.response?.data;

      if (!message) {
        setLoginError("Server error");
      } else if (typeof message === "string") {
        setLoginError(message);
      } else {
        setLoginError(message.message || "Login failed");
      }


    }
  };
  const handleForgotVerifyOtp = async () => {
    setForgotError("");

    if (!forgotOtp) {
      setForgotError("Enter OTP");
      return;
    }

    try {
      await API.post("/auth/verify-otp", {
        email: forgotEmail.trim().toLowerCase(),
        otp: forgotOtp.trim(),
      });

      setLoginView("reset-password");

    } catch (err) {
      const message = err.response?.data;

      if (typeof message === "string") {
        setForgotError(message);
      } else {
        setForgotError(message?.message || "Invalid OTP");
      }
    }
  };
  const handleForgotSendOtp = async () => {
    setForgotError("");

    if (!forgotEmail) {
      setForgotError("Email required");
      return;
    }

    if (!isValidEmail(forgotEmail)) {
      setForgotError("Enter valid email");
      return;
    }

    try {
      const res = await API.post("/auth/forgot-password", {
        email: forgotEmail.trim().toLowerCase(),
      });

      // ✅ ONLY show OTP if backend SUCCESS
      setLoginOtpSent(true);

    } catch (err) {
      const message = err.response?.data;

      console.log("FORGOT ERROR:", message);

      // ❗ KEY LOGIC
      if (
        typeof message === "string" &&
        message.toLowerCase().includes("not found")
      ) {
        // 👉 redirect to signup
        setForgotError("Account not found. Redirecting to signup...");

        setTimeout(() => {
          setIsFlipped(true);     // go to signup side
          setSignupStep(1);
        }, 1500);

      } else {
        // normal error
        if (typeof message === "string") {
          setForgotError(message);
        } else {
          setForgotError(message?.message || "Failed to send OTP");
        }
      }
    }
  };
  const handleResetPassword = async () => {
    setForgotError("");

    if (!newPassword || !confirmPassword) {
      setForgotError("Fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/reset-password", {
        email: forgotEmail.trim().toLowerCase(),
        newPassword: newPassword,
      });

      setNewPassword("");
      setConfirmPassword("");
      setForgotOtp("");
      setLoginOtpSent(false);

      setLoginView("login");

    } catch (err) {
      const message = err.response?.data;

      if (typeof message === "string") {
        setForgotError(message);
      } else {
        setForgotError(message?.message || "Reset failed");
      }
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setIsFlipped(false);
      setLoginView('login');
      setLoginOtpSent(false);
      setSignupStep(1);
      setSignupOtpSent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goToSignup = () => {
    setIsFlipped(true);
    setSignupStep(1);
    setSignupOtpSent(false);
  };

  const goToSignin = () => {
    setIsFlipped(false);
    setLoginView('login');
    setLoginOtpSent(false);
  };
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    let otpArray = forgotOtp.split("");
    otpArray[index] = value;

    const newOtp = otpArray.join("");
    setForgotOtp(newOtp);

    // move to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
  const handleSignupOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    let otpArray = signupOtp.split("");
    otpArray[index] = value;

    const newOtp = otpArray.join("");
    setSignupOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`signup-otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#47510B]/60 backdrop-blur-md p-4 font-sans">
      <div className="flip-container w-full max-w-[400px] h-[600px] animate-slide-up">
        <div className={`flip-inner ${isFlipped ? 'is-flipped' : ''}`}>

          {/* --- FRONT SIDE: SIGN IN / FORGOT / RESET --- */}
          <div className="flip-front bg-[#FDFAD8] border-4 border-[#47510B] rounded-[40px] shadow-[0_20px_0_0_#47510B] p-8 pt-6 flex flex-col justify-between text-[#47510B]">
            <div className="flex justify-end items-center">
              <button onClick={onClose} className="hover:rotate-90 transition-transform"><X size={30} /></button>
            </div>

            <div className="mt-1">
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                {loginView === 'login' && <>welcome<br />Back!</>}
                {loginView === 'forgot' && <>Verify<br />Identity</>}
                {loginView === 'reset-password' && <>New<br />Credentials</>}
              </h2>
            </div>

            {/* 1. STANDARD LOGIN */}
            {loginView === 'login' && (
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-4 opacity-30" size={18} />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-white border-2 border-[#47510B] p-4 pl-12 rounded-2xl font-bold text-sm outline-none focus:ring-4 ring-[#CAD23C]/30"
                  />
                </div>
                {emailError && (
                  <p className="text-[#AB1717] text-xs font-bold ml-1">
                    {emailError}
                  </p>
                )}
                <div className="relative">
                  <Lock className="absolute left-4 top-4 opacity-30" size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border-2 border-[#47510B] p-4 pl-12 pr-12 rounded-2xl font-bold text-sm outline-none focus:ring-4 ring-[#CAD23C]/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-[#47510B] opacity-50 hover:opacity-100"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-[#AB1717] text-xs font-bold ml-1">
                    {passwordError}
                  </p>
                )}
                {loginError && (
                  <p className="text-[#AB1717] text-xs font-bold text-center">
                    {loginError}
                  </p>
                )}

                <button onClick={handleLogin} className="w-full bg-[#47510B] text-[#CAD23C] font-black p-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_6px_0_0_#2A3106] active:translate-y-1 uppercase text-xl italic">
                  Access <ArrowRight size={30} />
                </button>
                <button onClick={() => setLoginView('forgot')} className="text-[11px] font-black text-[#AB1717] uppercase tracking-widest ml-1">Forgot Password?</button>
              </div>
            )}

            {/* 2. FORGOT PASSWORD (OTP STEP) */}
            {loginView === 'forgot' && (
              <div className="space-y-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="REGISTERED_EMAIL"
                  className="w-full bg-white border-2 border-[#47510B] p-4 rounded-2xl font-bold text-sm outline-none focus:ring-4 ring-[#CAD23C]/30"
                />

                {loginOtpSent && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase opacity-60 ml-1 text-center block">
                      Enter OTP
                    </label>

                    <div className="flex gap-2 justify-between">
                      {[...Array(6)].map((_, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={forgotOtp[index] || ""}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          className="w-12 h-14 bg-white border-2 border-[#47510B] rounded-xl text-center font-black text-xl"
                        />
                      ))}
                    </div>


                  </div>
                )}

                <button
                  onClick={() => {
                    if (loginOtpSent) {
                      handleForgotVerifyOtp();
                    } else {
                      handleForgotSendOtp();
                    }
                  }}
                  className="w-full bg-[#AB1717] text-white font-black p-5 rounded-2xl shadow-[0_6px_0_0_#5E0E0E] active:translate-y-1 uppercase italic"
                >
                  {loginOtpSent ? 'Verify Code' : 'Request OTP'}
                </button>
                {forgotError && (
                  <p className="text-[#AB1717] text-xs text-center">
                    {forgotError}
                  </p>
                )}
                <button onClick={() => { setLoginView('login'); setLoginOtpSent(false); }} className="w-full text-center text-[10px] font-black uppercase opacity-60 tracking-widest">Return to Login</button>
              </div>
            )}

            {/* 3. NEW PASSWORD SETTING (FINAL STEP) */}
            {loginView === 'reset-password' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-60 ml-1">Secure New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border-2 border-[#47510B] p-4 pr-12 rounded-2xl font-bold text-sm outline-none focus:ring-4 ring-[#CAD23C]/30"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-4 text-[#47510B] opacity-50 hover:opacity-100"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-60 ml-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border-2 border-[#47510B] p-4 pr-12 rounded-2xl font-bold text-sm outline-none focus:ring-4 ring-[#CAD23C]/30"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-4 text-[#47510B] opacity-50 hover:opacity-100"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-[#47510B] text-[#CAD23C] font-black p-5 rounded-2xl shadow-[0_6px_0_0_#2A3106] active:translate-y-1 flex items-center justify-center gap-3 uppercase text-lg italic"
                >
                  Update & Login <Save size={20} />
                </button>
              </div>
            )}

            <div className="text-center pb-2">
              <button onClick={goToSignup} className="font-black text-[15px] tracking-widest uppercase opacity-60 hover:opacity-100">
                No account? <span className="underline decoration-2 underline-offset-4 text-[#AB1717]">Join Tribe</span>
              </button>
            </div>
          </div>

          {/* --- BACK SIDE: SIGN UP (REMAINS AS IS) --- */}
          <div className="flip-back bg-[#FFB6A9] border-4 border-[#AB1717] rounded-[40px] shadow-[0_20px_0_0_#47510B] p-7 flex flex-col h-full text-[#47510B]">
            <div className="flex justify-between items-center mb-4">
              <button onClick={goToSignin} className="flex items-center gap-2 font-black text-[16px] tracking-widest uppercase"><ArrowLeft size={24} /> Back</button>
              <button onClick={onClose} className="text-[#AB1717] hover:rotate-90 transition-transform"><X size={30} /></button>
            </div>

            <div className="mb-4">
              <h2 className="text-4xl font-black text-[#AB1717] uppercase tracking-tighter leading-none">New<br />Registry</h2>
              <div className="h-1 w-12 bg-[#AB1717] mt-2" />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar mb-4">
              {signupStep === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[12px] font-black text-[#AB1717] uppercase tracking-widest ml-1">Email Verification</label>
                    <div className="flex gap-2 w-full">
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => {
                          setSignupEmail(e.target.value);
                          setSignupEmailError("");
                        }}
                        placeholder="EMAIL_ENTRY"
                        className="flex-1 min-w-0 p-4 bg-[#FDFAD8] rounded-xl border-2 border-[#AB1717]/30 font-black uppercase text-[10px] text-[#AB1717] outline-none"
                      />

                      <button
                        onClick={async () => {
                          setSignupEmailError("");
                          setSignupNameError("");
                          setSignupPhoneError("");
                          setSignupPasswordError("");
                          setSignupConfirmPasswordError("");

                          //let hasError = false;
                          if (!signupEmail) {
                            setSignupEmailError("Email required");
                            return;
                          }

                          if (!isValidEmail(signupEmail)) {
                            setSignupEmailError("Enter valid email");
                            return;
                          }

                          try {
                            await API.post("/auth/send-otp", {
                              email: signupEmail.trim().toLowerCase(),
                            });

                            setSignupOtpSent(true);

                          } catch (err) {
                            console.log("SIGNUP OTP ERROR:", err.response?.data);
                          }
                        }}
                        className="bg-[#AB1717] text-white px-4 rounded-xl font-black text-[10px] uppercase shadow-[0_4px_0_0_#5E0E0E] active:translate-y-1"
                      >
                        OTP
                      </button>
                    </div>
                    {signupEmailError && (
                      <p className="text-[#AB1717] text-xs font-bold ml-1">
                        {signupEmailError}
                      </p>
                    )}
                  </div>
                  {signupOtpSent && (
                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] font-black uppercase opacity-60 ml-1 text-center block">
                        Enter OTP
                      </label>

                      <div className="flex gap-2 justify-between">
                        {[...Array(6)].map((_, index) => (
                          <input
                            key={index}
                            id={`signup-otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={signupOtp[index] || ""}
                            onChange={(e) => handleSignupOtpChange(e.target.value, index)}
                            className="w-12 h-14 bg-[#FDFAD8] border-2 border-[#AB1717] rounded-xl text-center font-black"
                          />
                        ))}
                      </div>
                      <button
                        onClick={async () => {
                          if (!signupOtp || signupOtp.length !== 6) return;

                          try {
                            await API.post("/auth/verify-otp", {
                              email: signupEmail.trim().toLowerCase(),
                              otp: signupOtp,
                            });

                            setSignupStep(2);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className="w-full bg-[#47510B] text-white py-4 rounded-xl font-black uppercase italic shadow-[0_4px_0_#2A3106] active:translate-y-1"
                      >
                        Verify Identity
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-black text-[10px] uppercase mb-2"><CheckCircle2 size={16} className="text-green-600" /> Email Verified</div>
                  {/* FULL NAME */}
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value);
                      setSignupNameError("");
                    }}
                    placeholder="FULL NAME"
                    className="w-full p-4 bg-[#FDFAD8] rounded-xl border-2 border-[#AB1717]/20 font-black text-xs"
                  />
                  {signupNameError && (
                    <p className="text-[#AB1717] text-xs font-bold ml-1">
                      {signupNameError}
                    </p>
                  )}

                  {/* PHONE */}
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => {
                      setSignupPhone(e.target.value);
                      setSignupPhoneError("");
                    }}
                    placeholder="PHONE NUMBER"
                    className="w-full p-4 bg-[#FDFAD8] rounded-xl border-2 border-[#AB1717]/20 font-black text-xs"
                  />
                  {signupPhoneError && (
                    <p className="text-[#AB1717] text-xs font-bold ml-1">
                      {signupPhoneError}
                    </p>
                  )}
                  {/* PASSWORD */}
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => {
                        setSignupPassword(e.target.value);
                        setSignupPasswordError("");
                      }}
                      placeholder="PASSWORD"
                      className="w-full p-4 pr-12 bg-[#FDFAD8] rounded-xl border-2 border-[#AB1717]/20 font-black text-xs"
                    />

                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-4 opacity-50"
                    >
                      {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {signupPasswordError && (
                    <p className="text-[#AB1717] text-xs font-bold ml-1">
                      {signupPasswordError}
                    </p>
                  )}

                  {/* CONFIRM PASSWORD */}
                  <div className="relative">
                    <input
                      type={showSignupConfirmPassword ? "text" : "password"}
                      value={signupConfirmPassword}
                      onChange={(e) => {
                        setSignupConfirmPassword(e.target.value);
                        setSignupConfirmPasswordError("");
                      }}
                      placeholder="CONFIRM PASSWORD"
                      className="w-full p-4 pr-12 bg-[#FDFAD8] rounded-xl border-2 border-[#AB1717]/20 font-black text-xs"
                    />

                    <button
                      type="button"
                      onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                      className="absolute right-4 top-4 opacity-50"
                    >
                      {showSignupConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {signupConfirmPasswordError && (
                    <p className="text-[#AB1717] text-xs font-bold ml-1">
                      {signupConfirmPasswordError}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                disabled={signupStep === 1}
                onClick={async () => {
                  setSignupNameError("");
                  setSignupPhoneError("");
                  setSignupPasswordError("");
                  setSignupConfirmPasswordError("");

                  let hasError = false;

                  if (!signupName) {
                    setSignupNameError("Full name required");
                    hasError = true;
                  }

                  if (!signupPhone) {
                    setSignupPhoneError("Phone required");
                    hasError = true;
                  } else if (!/^[0-9]{10}$/.test(signupPhone)) {
                    setSignupPhoneError("Enter valid 10-digit phone");
                    hasError = true;
                  }

                  if (!signupPassword) {
                    setSignupPasswordError("Password required");
                    hasError = true;
                  } else if (!/^(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(signupPassword)) {
                    setSignupPasswordError("Min 6 chars, 1 number & 1 special character required");
                    hasError = true;
                  }
                  if (!signupConfirmPassword) {
                    setSignupConfirmPasswordError("Confirm password required");
                    hasError = true;
                  }

                  if (signupPassword && signupConfirmPassword && signupPassword !== signupConfirmPassword) {
                    setSignupConfirmPasswordError("Passwords do not match");
                    hasError = true;
                  }

                  if (hasError) return;

                  try {
                    await API.post("/auth/register", {
                      fullName: signupName,
                      email: signupEmail,
                      password: signupPassword,
                      phone: signupPhone,
                      role: "CITIZEN",
                    });
                    setSignupName("");
                    setSignupPhone("");
                    setSignupPassword("");
                    setSignupConfirmPassword("");
                    setSignupOtp("");
                    setSignupEmail("");
                    setSignupOtpSent(false);   // ✅ ADD
                    setSignupStep(1);
                    setIsFlipped(false);
                    setLoginView("login");

                  } catch (err) {
                    const message = err.response?.data;

                    if (typeof message === "string" && message.toLowerCase().includes("exists")) {
                      setSignupEmailError("Account already exists");
                    } else {
                      console.log("SIGNUP ERROR:", message);
                    }
                  }
                }}
                className={`w-full py-4 rounded-2xl font-black uppercase italic text-xl transition-all shadow-[0_5px_0_#5E0E0E] active:translate-y-1 mb-4 
                  ${signupStep === 2 ? 'bg-[#AB1717] text-[#FFB6A9]' : 'bg-[#47510B]/20 text-[#47510B]/40 shadow-none'}`}
              >
                REGISTER CITIZEN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;