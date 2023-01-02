import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { BsSearch } from "react-icons/bs";

export const SearchComponent = () => {
  const [searchTherm, setSearchTherm] = useState("");
  const [results, setResults] = useState([]);

  const searData = async () => {
    const searchQuery = query(
      collection(db, "posts"),
      where("title", ">=", searchTherm)
    );
    const searchResultSnapshot = await getDocs(searchQuery);
    searchResultSnapshot.docs.map((doc) => {
      setResults([...results, doc.data()]);
    });
    console.log(results);
  };
  return (
    <>
      <div className="flex gap-1 items-center mx-2">
        <input
          type="text"
          value={searchTherm}
          className="w-full px-2  rounded-full"
          onChange={(e) => setSearchTherm(e.target.value)}
        />
        <button onClick={searData}>
          <BsSearch color="white" className="text-xl" />
        </button>
      </div>
      {setSearchTherm.length > 0 && (
        <div className="absolute bg-white min-w-[300px] mt-3 min-h-0 z-[100]">
          {results?.map((result, index) => (
            <div key={index}>
              <Link to={`/post/${result?.slug}`}>{result?.title}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
