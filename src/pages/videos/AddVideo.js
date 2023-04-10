import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet";
import { Form, Formik } from "formik";
import { Input, Select } from "../../components/inputs/Input";
import { ImagePreview } from "../../components/images/ImagePreview";
import * as Yup from "yup";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { storeImage } from "../../firebase_api/uploadImage";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import { DraftEditor } from "../../components/editor/DraftEditor";
import { add_video } from "../../firebase_api/videoApi";

const initialState = {
  title: "",
  category: "",
  videoId: "",
  images: [],
  description: "",
  author: "",
  country: "",
  language: "English",
};

export const AddVideo = () => {
  const [video, setVideo] = useState(initialState);
  const [images, setImages] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const { title, category, description, videoId, author, country, language } =
    video;
  let imageFiles = [];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };
  const handleImage = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((img) => {
      imageFiles.push(img);
      setFilesArray(imageFiles);
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (ev) => {
        setImages((imgs) => [...imgs, ev.target.result]);
      };
    });
  };
  const [editorState, SetEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    SetEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setVideo((prev) => ({ ...prev, description: currentContentAsHTML }));
  };
  const validate = Yup.object({
    title: Yup.string().required(),
    videoId: Yup.string().required(),
    author: Yup.string().required(),
    category: Yup.string().required(),
    country: Yup.string().required(),
  });
  const submitVideo = async () => {
    let imageUrls;
    const id = uuid();
    try {
      const slug = `${video.title
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replaceAll("(", "-")
        .replaceAll(")", "-")
        .replaceAll("&", "-")
        .replaceAll("?", "-")}-${Date.now()}`;
      if (filesArray.length > 0) {
        imageUrls = await Promise.all(
          [...filesArray].map((file) => {
            const path = `videos/images/${id}/${file?.name}`;
            return storeImage(file, path);
          })
        ).catch((err) => {
          console.log(err.message, "Could not upload images");
          return;
        });

        const vid = {
          ...video,
          slug,
          id,
          images: imageUrls,
          likes: [],
          comments: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        };
        await add_video(vid);
        // dispatch(createPost(vid));
      } else {
        const vid = {
          ...video,
          slug,
          id,
          likes: [],
          comments: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        };
        await add_video(vid);
        // dispatch(createPost(post));
      }
      toast.success("Post Created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Layout>
      <Helmet title="Add Video"></Helmet>
      <div className="w-[80%] pb-24 px-5 shadow-md bg-white mb-5 mx-auto rounded-md">
        <h1 className="text-center py-5 text-3xl font-bold text-teal-700">
          Add New Video
        </h1>
        <Formik
          enableReinitialize
          validationSchema={validate}
          initialValues={{
            title,
            description,
            author,
            category,
            videoId,
            country,
            language,
          }}
          onSubmit={submitVideo}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="w-full flex flex-col gap-4">
              <div className="md:flex gap-3">
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Story Title"
                  onChange={handleChange}
                  value={title}
                />
                <Select
                  onChange={handleChange}
                  name="category"
                  value={category}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.text} value={cat.link}>
                      {cat.text}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="md:flex gap-3">
                <Input
                  type="text"
                  name="videoId"
                  placeholder="Enter videoId"
                  onChange={handleChange}
                  value={videoId}
                />
                <Input
                  type="text"
                  name="author"
                  placeholder="Enter Video Author"
                  onChange={handleChange}
                  value={author}
                />
              </div>
              <div className="md:flex gap-3">
                <Select onChange={handleChange} name="country" value={country}>
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.value}>
                      {country.name}
                    </option>
                  ))}
                </Select>
                <Select
                  onChange={handleChange}
                  name="language"
                  value={language}
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                </Select>
              </div>
              <div>
                <DraftEditor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                />
              </div>
              <div>
                <ImagePreview
                  images={images}
                  setImages={setImages}
                  handleImage={handleImage}
                />
              </div>
              <button
                type="submit"
                className={`${
                  !isValid || isSubmitting
                    ? "bg-gray-400 text-black cursor-not-allowed"
                    : "bg-teal-800 text-white"
                } w-full text-center py-2 rounded-md mt-5`}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Creating post..." : "Create Post"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
