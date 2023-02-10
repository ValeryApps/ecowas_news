import { Link } from "react-router-dom";

export const Newsletter = () => {
  return (
    <div className="text-white">
      <h1>SIGN UP FOR OUR NEWSLETTER</h1>
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="YOUR EMAIL ADDRESS"
          className="w-full py-2 px-2 rounded-full"
        />
        <button className="border-0 outline-0 focus:outline-0 focus:border-0">
          SUBSCRIBE
        </button>
      </div>
      <p className="italic font-semibold text-gray-400">
        By clicking SUBSCRIBE you agree to{" "}
        <Link to="/">our Privacy & Cookies policy</Link>
      </p>
    </div>
  );
};
