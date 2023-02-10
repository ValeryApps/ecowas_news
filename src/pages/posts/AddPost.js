import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Input, Select } from "../../components/inputs/Input";
import { Layout } from "../../components/layout/Layout";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import * as Yup from "yup";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { v4 as uuid } from "uuid";
import { DraftEditor } from "../../components/editor/DraftEditor";
import { add_post } from "../../firebase_api/postApi";
import { storeImage } from "../../firebase_api/uploadImage";
import { ImagePreview } from "../../components/images/ImagePreview";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/reducers/post";
import { toast } from "react-toast";

const initialValues = {
  title: "",
  description: "",
  type: "",
  author: "",
  externUrl: "",
  category: "",
  country: "",
  language: "English",
};
export const AddPost = () => {
  const [postData, setPostData] = useState(initialValues);
  const [images, setImages] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const {
    title,
    description,
    type,
    author,
    externUrl,
    category,
    country,
    language,
  } = postData;
  const dispatch = useDispatch();
  let imageFiles = [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImages = (e) => {
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
    setPostData((prev) => ({ ...prev, description: currentContentAsHTML }));
  };
  const validate = Yup.object({
    title: Yup.string().required(),
    type: Yup.string().required(),
    author: Yup.string().required(),
    category: Yup.string().required(),
    country: Yup.string().required(),
  });
  const submitPost = async () => {
    let imageUrls;
    const id = uuid();
    try {
      const slug = `${postData.title
        .replaceAll(" ", "-")
        .replaceAll("/", "")
        .replaceAll("?", "")}-${Date.now()}`;
      if (filesArray.length > 0) {
        imageUrls = await Promise.all(
          [...filesArray].map((file) => {
            const path = `Posts/images/${id}/${file?.name}`;
            return storeImage(file, path);
          })
        ).catch((err) => {
          console.log("Could not upload images");
          return;
        });
        const post = {
          ...postData,
          slug,
          id,
          images: imageUrls,
          likes: [],
          comments: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: Date.now().toString(),
        };
        await add_post(post);
        dispatch(createPost(post));
      } else {
        const post = {
          ...postData,
          slug,
          images: [],
          id,
          likes: [],
          comments: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: Date.now().toString(),
        };
        await add_post(post);
        dispatch(createPost(post));
      }
      toast.success("Post Created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Create Post - Glory Info</title>
      </Helmet>
      <div className="w-[80%] pb-24 px-5 shadow-md bg-white mb-5 mx-auto rounded-md">
        <h1 className="text-center py-5 text-3xl font-bold text-teal-700">
          Add New Post
        </h1>
        <Formik
          enableReinitialize
          validationSchema={validate}
          initialValues={{
            title,
            description,
            type,
            author,
            externUrl,
            category,
            country,
            language,
          }}
          onSubmit={submitPost}
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
                  name="externUrl"
                  placeholder="Enter Story Url"
                  onChange={handleChange}
                  value={externUrl}
                />
                <Input
                  type="text"
                  name="author"
                  placeholder="Enter Story Author"
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
                <Select onChange={handleChange} name="type" value={type}>
                  <option value="">Select a type</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                  <option value="images">Images</option>
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
                  handleImage={handleImages}
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
