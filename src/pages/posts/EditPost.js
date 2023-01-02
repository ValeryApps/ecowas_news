import { useEffect, useState } from "react";
import { convertToHTML } from "draft-convert";
import { createMarkup } from "../../helpers/parseHTML";
import { EditorState } from "draft-js";
import { Helmet } from "react-helmet";
import { PulseLoader } from "react-spinners";
import DraftEditor from "../../components/editor/DraftEditor";
import ImagePreview from "../../components/inputs/ImagePreview";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import "../../components/postpopup/postpopup.css";
import "./post.css";
import { storeImage } from "../../firebase_api/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetch_post_by_id, update_post } from "../../firebase_api/postApi";
import { updatePost } from "../../store/reducers/post";

export const EditPost = () => {
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = posts?.find((x) => x.id === id);
  const [formData, setFormData] = useState(story);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileArray, setFileArray] = useState([]);

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

  const resetForm = () => {
    setFormData({});
    setEditorState("");
  };

  const handleSubmit = async (e) => {
    let imageUrls;
    e.preventDefault();
    try {
      setLoading(true);
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
        const post = {
          ...formData,
          images: imageUrls,
          slug: formData.title.replaceAll(" ", "-"),
        };
        await update_post(story, post);
        dispatch(updatePost(post));
      } else {
        const post = {
          ...formData,
          slug: formData.title.replaceAll(" ", "-"),
        };
        await update_post(story, post);
        dispatch(updatePost(post));
      }
      setLoading(false);
      resetForm();
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setFormData((prev) => ({ ...prev, description: currentContentAsHTML }));
  };
  useEffect(() => {
    const fetchPost = async () => {
      if (!formData) {
        const data = await fetch_post_by_id(id);
        setFormData(data);
      }
    };
    fetchPost();
  }, [formData, setFormData, id]);

  return (
    <div className="form">
      <Helmet>
        <title>Edit Post</title>
      </Helmet>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Post </h1>
      {/* <Formik
        enableReinitialize
        initialValues={initialPostValue}
        validationSchema={validationSchema}
        onSubmit={handlePostSubmit}
      > */}
      {/* {(formik) => ( */}
      {story ? (
        <form onSubmit={handleSubmit}>
          <div className="md:flex gap-3">
            <div className="w-full">
              <input
                className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
                value={formData ? formData?.title : ""}
                name="title"
                onChange={handleOnchange}
                placeholder="Post Title"
              />
            </div>

            <div className="w-full">
              <select
                className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
                name="type"
                value={formData?.type}
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
                value={formData ? formData?.externUrl : ""}
                name="externUrl"
                onChange={handleOnchange}
                placeholder="Extern Url"
              />
            </div>
            <div className="w-full">
              <input
                className="w-full py-2 border-[0.5px] border-slate-200 rounded-md mb-2 px-3"
                value={formData ? formData?.author : ""}
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
                value={formData ? formData?.category : ""}
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
                value={formData?.country}
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
          <div className="story_text px-3">
            <div
              dangerouslySetInnerHTML={createMarkup(story.description)}
            ></div>
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
      ) : (
        <div className="top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <h1>Post not found</h1>
        </div>
      )}

      {/* )}
      </Formik> */}
    </div>
  );
};
