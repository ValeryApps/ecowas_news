import { Link } from "react-router-dom";

export const Links = () => {
  return (
    <div className="">
      {links.map((link, index) => (
        <ul key={index}>
          {index === 0 ? (
            <img src="/180.png" alt="" className="w-12" />
          ) : (
            <b>{link.heading}</b>
          )}

          {link.links.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white font-bold hover:text-teal-200 "
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
const links = [
  {
    heading: "SHOPPAY",
    links: [
      { name: "About us", link: "" },
      { name: "Contact us", link: "" },
      { name: "politics", link: "" },
      { name: "economy", link: "" },
      { name: "sports", link: "" },
      { name: "health", link: "" },
      { name: "politics", link: "" },
      { name: " ", link: "" },
    ],
  },
];
