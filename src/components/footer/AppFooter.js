import { Copyright } from "./Copyright";
import { Links } from "./Links";
import { Newsletter } from "./Newsletter";
import { Socials } from "./Socials";

export const AppFooter = ({ country }) => {
  return (
    <footer className="bg-gradient-to-b from-teal-600 to-teal-600 via-teal-800 w-full lg:px-80">
      <div className="relative w-full gap-3 p-2 md:flex md:flex-wrap justify-between">
        <div>
          <Links />
        </div>
        <div>
          <Socials />
          <Newsletter />
        </div>
      </div>
      <div className="flex justify-center text-center font-bold text-white text-lg">
        <Copyright country={country} />
      </div>
    </footer>
  );
};
