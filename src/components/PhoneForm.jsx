import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema } from "../lib/validation";
import CountrySelector from "./CountrySelector";

export default function PhoneForm({ onNext }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex rounded-full border mb-4">
        <CountrySelector
          value={watch("countryCode")}
          onChange={(val) => setValue("countryCode", val)}
        />
        <input
          {...register("phone")}
          className="p-2 w-full outline-none rounded-full !bg-transparent text-white"
          placeholder="1234567890"
        />
      </div>
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <div className="flex justify-center items-center mt-4">
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded box-border"
        >
          Send OTP
        </button>
      </div>
    </form>
  );
}
