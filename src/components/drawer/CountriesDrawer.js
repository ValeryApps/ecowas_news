import React from "react";
import { Link, useLocation } from "react-router-dom";
import { countries } from "../../data/countries";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const itemVariants = {
  closed: { x: -300 },
  open: { x: 0, transition: { duration: 1 } },
  exit: { x: -300, transition: { duration: 1 } },
};
export const CountriesDrawer = ({ visible, setVisible }) => {
  const { pathname } = useLocation();

  return (
    <main>
      <div className="absolute top-4 px-2">
        <div onClick={setVisible}>
          {visible ? (
            <AiOutlineClose className="text-white cursor-pointer" size={25} />
          ) : (
            <FiMenu className="text-white cursor-pointer" size={25} />
          )}
        </div>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="bg-white w-[300px] absolute pb-14 mt-2 mb-5 shadow-lg h-[100vh] overflow-scroll custom-scroll"
          >
            <div>
              <img src="/512.png" alt="" className="h-40 w-full" />
            </div>
            <div>
              {countries.map(({ name, value, flag }) => (
                <div
                  key={name}
                  className={`${
                    pathname === `/countries/${value}` ? "bg-slate-300" : ""
                  } flex justify-between items-center py-3 px-2 border-b-2 border-blue-200`}
                >
                  <Link to={`/countries/${value}`}> {name}</Link>
                  <img src={flag} alt="" className="w-7" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
