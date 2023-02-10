import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Copyright = ({ country }) => {
  return (
    <div>
      <section>Ecowas24 News 2023. All Rights Reserved</section>
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
