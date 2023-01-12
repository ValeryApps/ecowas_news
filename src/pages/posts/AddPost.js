import { useState } from "react";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { Helmet } from "react-helmet";
import { PulseLoader } from "react-spinners";
import DraftEditor from "../../components/editor/DraftEditor";
import ImagePreview from "../../components/inputs/ImagePreview";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import { getAuth } from "firebase/auth";
import "../../components/postpopup/postpopup.css";
import "./post.css";
import { v4 as uuidv4 } from "uuid";
import { storeImage } from "../../firebase_api/uploadImage";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/reducers/post";
import { add_post } from "../../firebase_api/postApi";

const initialValues = {
  description: "",
  type: "",
  author: "",
  externUrl: "",
  category: "",
  country: "",
};
export const AddPost = () => {
  const [formData, setFormData] = useState(initialValues);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileArray, setFileArray] = useState([]);
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  let imageFiles = [];
  // const formValidation = Yup.object({
  //   title: Yup.string().required("The title is required"),
  //   description: Yup.string().required(),
  //   type: Yup.string().required(),
  //   author: Yup.string().required(),
  //   externUrl: Yup.string().required(),
  //   category: Yup.string().required(),
  //   country: Yup.string().required(),
  // });
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      imageFiles.push(img);
      setFileArray(imageFiles);
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (ev) => {
        setImages((imgs) => [...imgs, ev.target.result]);
      };
    });
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setFormData((prev) => ({ ...prev, description: currentContentAsHTML }));
  };
  const resetForm = () => {
    setEditorState(null);
    setFormData({});
    setImages([]);
  };
  const handleSubmit = async (e) => {
    let imageUrls;
    e.preventDefault();
    try {
      setLoading(true);
      const slug = `${formData.title
        .replaceAll("/", "")
        .replaceAll("?", "")
        .replaceAll(" ", "-")}-${Date.now()}`;
      if (fileArray.length > 0) {
        imageUrls = await Promise.all(
          [...fileArray].map((file) => {
            const path = `Posts/images/${file?.name}`;
            return storeImage(file, path);
          })
        ).catch((err) => {
          setLoading(false);
          console.log("Could not upload image");
          return;
        });

        let post = {
          ...formData,
          id: uuidv4(),
          images: imageUrls,
          slug,
          likes: [],
          likesCount: 0,
          commentsCount: 0,
          comments: [],
          userHasLiked: false,
          userId: auth.currentUser.uid,
          createdAt: Date.now().toString(),
        };

        await add_post(post, post.id);
        dispatch(createPost(post));
        setLoading(false);
        resetForm();
      } else {
        let post = {
          ...formData,
          id: uuidv4(),
          slug,
          likes: [],
          likesCount: 0,
          commentsCount: 0,
          comments: [],
          userId: auth.currentUser.uid,
          createdAt: Date.now().toString(),
        };
        await add_post(post, post.id);
        dispatch(createPost(post));
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="form">
      <Helmet>
        <title>Create New Post</title>
      </Helmet>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new Post{" "}
      </h1>
      {/* <Formik
        enableReinitialize
        initialValues={initialPostValue}
        validationSchema={validationSchema}
        onSubmit={handlePostSubmit}
      > */}
      {/* {(formik) => ( */}
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-3">
          <div className="w-full">
            <input
              className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
              name="title"
              onChange={handleOnchange}
              placeholder="Post Title"
            />
          </div>

          <div className="w-full">
            <select
              className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
              name="type"
              // value={type}
              onChange={handleOnchange}
            >
              <option value="">What type?</option>
              <option value="video">video</option>
              <option value="text">text</option>
              <option value="images">images</option>
            </select>
          </div>
        </div>
        <div className=" md:flex gap-3">
          <div className="w-full">
            <input
              className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
              // value={externUrl}
              name="externUrl"
              onChange={handleOnchange}
              placeholder="Extern Url"
            />
          </div>
          <div className="w-full">
            <input
              className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
              // value={author}
              name="author"
              onChange={handleOnchange}
              placeholder="Author"
            />
          </div>
        </div>
        <div className=" md:flex gap-3">
          <div className="w-full">
            <select
              className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
              name="category"
              // value={category}
              onChange={handleOnchange}
            >
              <option value="">Choose a category</option>
              {categories.map(({ text, link }) => (
                <option key={text} value={link}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
              name="country"
              // value={country}
              onChange={handleOnchange}
            >
              <option value="">Choose a Country</option>
              {countries.map(({ name, value }) => (
                <option key={name} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="editor">
          <DraftEditor
            editorState={editorState}
            handleEditorChange={handleEditorChange}
          />
        </div>
        {/* <input type="file" multiple name="imageList" /> */}
        <div className="preview">
          <ImagePreview
            images={images}
            setImages={setImages}
            handleImages={handleImages}
            //   setShowPrev={setShowPrev}
            //   setError={setError}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-center py-2 rounded-md mt-5 text-white uppercase"
        >
          {loading ? "Submitting post" : "Submit"}
          {loading && <PulseLoader color="white" />}
        </button>
      </form>
      {/* )}
      </Formik> */}
    </div>
  );
};
