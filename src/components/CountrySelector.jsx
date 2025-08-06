import { useEffect, useState } from "react";

export default function CountrySelector({ value, onChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/independent")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((country) => ({
            name: country.name.common,
            code: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
          }))
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      });
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 outline-none text-gray-400"
    >
      <option value="">Select</option>
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          ({c.code})
        </option>
      ))}
    </select>
  );
}
