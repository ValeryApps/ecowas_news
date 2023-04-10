import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Copyright = ({ country }) => {
  const getCurrentYear = ()=>{
    return new Date().getFullYear();
  }
  return (
    <div>
     <div className="">
        © {getCurrentYear()} -{" "}
        <span className="purpleColor font13">Ecowas24 News</span>{" "}
        <span className="font-normal">All Right Reserved</span>
        <p className="block">
          <span className="underline underline-offset-2">
            {" "}
            Development and designed by:
          </span>{" "}
          AVT (Africa Victory-Tech)
        </p>
      </div>
      <section className="flex gap-1 text-sm text-[#555] mb-3 items-center">
        <ul className="flex items-center flex-wrap gap-4">
          {data.map((d) => (
            <li className="relative flex underline text-gray-400" key={d?.name}>
              <Link to={d?.link}>{d?.name}</Link>
            </li>
          ))}
          <li>
            <IoLocationSharp size={20} className="text-gray-400" />{" "}
            <span> {country?.name}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
const data = [
  { name: "Privacy Center", link: "" },
  { name: "Privacy & Cookie Policy", link: "" },
  { name: "Manage Cookies", link: "" },
  { name: "Terms & Condition", link: "" },
  { name: "Copyright Note", link: "" },
];
