import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { DraftEditor } from "../../components/editor/DraftEditor";
import { Input, Select } from "../../components/inputs/Input";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { fetch_post_by_id, update_post } from "../../firebase_api/postApi";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { ImagePreview } from "../../components/images/ImagePreview";
import { storeImage } from "../../firebase_api/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/reducers/post";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { createMarkup } from "../../helpers/parseHTML";

export const EditPost = () => {
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const { postId } = useParams();
  const data = posts.find((x) => x.id === postId);
  const [postData, setPostData] = useState(data ?? {});
  const [images, setImages] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const dispatch = useDispatch();
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
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
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    type: Yup.string().required(),
    author: Yup.string().required(),
    category: Yup.string().required(),
    country: Yup.string().required(),
  });
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

  const handleSubmit = async (e) => {
    let imageUrls;
    try {
      const slug = `${postData.title
        .replace(/[^a-zA-Z0-9À-ž\s]/gi, "")
        .replaceAll(" ", "-")}-${Date.now()}`;
      if (fileArray.length > 0) {
        imageUrls = await Promise.all(
          [...fileArray].map((file) => {
            const path = `Posts/images/${file?.name}`;
            return storeImage(file, path);
          })
        ).catch((err) => {
          toast.error("Could not upload image");
          return;
        });

        let post = {
          ...postData,
          slug,
          images: imageUrls,
          createdAt: Date.now().toString(),
        };
        await update_post(postId, post);
        dispatch(updatePost(post));
        toast.success("Post successfully updated");
      } else {
        let post = {
          ...postData,
          slug,
          createdAt: Date.now().toString(),
        };
        await update_post(postId, post);
        dispatch(updatePost(post));
        toast.success("Post successfully updated");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!data) {
      const getPostById = async () => {
        const api_data = await fetch_post_by_id(postId);
        // console.log(api_data);
        setPostData(api_data);
      };
      getPostById();
    }
  }, [postId, data]);

  return (
    <div className="w-[80%] pb-24 px-5 shadow-md bg-white mb-5 mx-auto rounded-md">
      <Helmet title="Create a new post"></Helmet>
      <h1 className="text-center mb-5 text-xl font-bold">Edit a new post</h1>
      <Formik
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
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, errors, touched }) => {
          console.log(touched);
          return (
            <Form className="w-full flex flex-col gap-4">
              <div className="md:flex gap-3">
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Story Title"
                  onChange={handleOnChange}
                  value={title}
                />
                <Select
                  onChange={handleOnChange}
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
                  placeholder="Enter Story externUrl"
                  onChange={handleOnChange}
                  value={externUrl}
                />
                <Input
                  type="text"
                  name="author"
                  placeholder="Enter Story Author"
                  onChange={handleOnChange}
                  value={author}
                />
              </div>
              <div className="md:flex gap-3">
                <Select
                  onChange={handleOnChange}
                  name="country"
                  value={country}
                >
                  <option value="">Select a country</option>
                  {countries.map((count) => (
                    <option key={count.name} value={count.value}>
                      {count.name}
                    </option>
                  ))}
                </Select>
                <Select onChange={handleOnChange} name="type" value={type}>
                  <option value="">Select a type</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                  <option value="images">Images</option>
                </Select>
                <Select
                  onChange={handleOnChange}
                  name="language"
                  value={language}
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                </Select>
              </div>
              <div dangerouslySetInnerHTML={createMarkup(description)}></div>
              <div>
                <DraftEditor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                />
                <img src={data?.images[0]} alt="" />
                <div className="preview">
                  <ImagePreview
                    images={images}
                    setImages={setImages}
                    handleImages={handleImages}
                  />
                </div>
              </div>
              <button
                className={`${
                  !isValid || isSubmitting
                    ? "bg-gray-400 text-black cursor-not-allowed"
                    : "bg-teal-800 text-white"
                } w-full  text-center py-2 rounded-md mt-5 `}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    Editing <BarLoader color="#36d7b7" width={50} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    submit
                  </div>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
