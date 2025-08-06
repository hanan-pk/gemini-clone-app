"use client";
import { useState } from "react";
import PhoneForm from "../../components/PhoneForm";
import OtpForm from "../../components/OtpForm";

export default function LoginPage() {
  const [step, setStep] = useState("phone");
  const [phoneData, setPhoneData] = useState(null);

  const handlePhoneSubmit = (data) => {
    setPhoneData(data);
    setStep("otp");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#323537] p-6 rounded-lg shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-white">
          {step === "phone" ? "Login with Phone" : "Enter OTP"}
        </h2>

        <div className="py-8">
          {step === "phone" ? (
            <PhoneForm onNext={handlePhoneSubmit} />
          ) : (
            <div className="flex justify-center ">
              <OtpForm phoneData={phoneData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
