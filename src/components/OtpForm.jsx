import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../lib/validation";
import { v4 as uuidv4 } from "uuid";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OtpForm({ phoneData }) {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(otpSchema) });

  // Send OTP simulation
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      console.log("Simulated OTP: 123456");
    }, 1500);
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Handle OTP input change
  const handleOtpChange = (value) => {
    setOtpValue(value);

    if (value.length === 6) {
      onSubmit({ otp: value });
    }
  };

  const onSubmit = (data) => {
    if (data.otp === "123456") {
      toast.success("Login success!");
      localStorage.setItem("token", uuidv4());
      router.push("/");
    } else {
      toast.error("Invalid OTP");
      setOtpValue("");
    }
  };

  return (
    <div className="text-white space-y-4">
      <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-center text-gray-400">
        {timer > 0 ? `Resend OTP in ${timer}s` : "You can resend OTP now"}
      </p>
    </div>
  );
}
