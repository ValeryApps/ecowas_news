import {
  BsInstagram,
  BsPinterest,
  BsSnapchat,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { FaFacebook, FaTiktok } from "react-icons/fa";

export const Socials = () => {
  return (
    <div className="mb-10">
      <section>
        <h1 className="text-[18px] text-white font-[700] mb-3">
          STAY CONNECTED
        </h1>
        <ul className="flex gap-4 text-white">
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={32} />
            </a>
          </li>
          <li>
            {" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <BsInstagram size={32} />
            </a>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <BsTwitter size={32} />
            </a>
          </li>
          <li>
            {" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <BsYoutube size={32} />
            </a>
          </li>
          <li>
            {" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <BsPinterest size={32} />
            </a>
          </li>
          <li>
            {" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <BsSnapchat size={32} />
            </a>
          </li>
          <li>
            {" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaTiktok size={32} />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
