import React, { useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiImages } from "react-icons/bi";

export const ImagePreview = ({ images, setImages, handleImage }) => {
  const imageRef = useRef(null);
  return (
    <div className="h-[200px] border-2 overflow-y-hidden border-gray-500 bg-slate-200 rounded-md relative">
      <div className="grid place-items-center h-full">
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/gif, image/png, image/webp"
          multiple
          hidden
          ref={imageRef}
          onChange={handleImage}
        />
        {images && images.length > 0 ? (
          <>
            <div
              className="absolute right-1 top-1 bg-gray-500 rounded-full px-0.5 py-0.5 shadow-2xl text-white cursor-pointer"
              onClick={() => setImages([])}
            >
              <AiOutlineCloseCircle size={34} />
            </div>
            <div className="h-[200px] overflow-y-scroll custom-scroll flex flex-wrap pl-3 pr-3 gap-3 py-2">
              {images.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  key={index}
                  className={`${
                    images.length > 1 ? "w-[47%] h-full" : "w-full h-full"
                  } object-cover`}
                />
              ))}
            </div>
          </>
        ) : (
          <div
            className="grid place-items-center cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <BiImages size={34} />
            <span>Add Photos/Videos</span>
            <span>Or drag and drop</span>
          </div>
        )}
      </div>
    </div>
  );
};
