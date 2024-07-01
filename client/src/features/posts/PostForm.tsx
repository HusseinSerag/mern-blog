import { ChangeEvent, useState } from "react";
import { Post } from "../../types/Post";
import { useForm } from "react-hook-form";
import useGo from "../../hooks/useGo";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import { UseMutateFunction } from "@tanstack/react-query";

interface PostFormProps {
  post?: Post | undefined;
  isLoading: boolean;
  mutate: UseMutateFunction<
    string,
    Error,
    { formData: FormData; postID: string },
    unknown
  >;
}
export interface FormInputs {
  title: string;
  category:
    | "javascript"
    | "typescript"
    | "reactjs"
    | "nextjs"
    | "uncategorized";
}
export default function PostForm({ post, isLoading, mutate }: PostFormProps) {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(() => {
    return post ? post.photoURL : "";
  });
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: post ? post : {},
  });
  const [content, setContent] = useState(() => {
    return post ? post.content : "";
  });

  const go = useGo();

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files) {
      const file = files[0];

      const preview = URL.createObjectURL(file);
      setPreview(preview);
      setFile(file);
    }
  }

  function onSubmit(values: FormInputs) {
    const formData = new FormData();
    const { category, title } = values;
    formData.set("category", category);
    formData.set("title", title);
    if (file) formData.set("photo", file, file.name);
    formData.set("content", content);

    mutate({ formData: formData, postID: post ? post._id : "" });
  }

  return (
    <div className="mx-auto mb-12 w-full max-w-3xl p-4">
      <h1 className="my-7 text-center text-3xl font-semibold">
        {post ? "Update" : "Create"} a post
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-2 flex flex-col gap-4"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            {...register("title")}
          />
          <Select {...register("category")}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="file">
            <FileInput
              onChange={onFileChange}
              id="file"
              className="hidden"
              accept="image/*"
            />

            <span className="group relative flex cursor-pointer items-stretch justify-center rounded-lg border-0 bg-gradient-to-br from-purple-600 to-cyan-500 p-2 text-center font-medium text-white transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800">
              Add Photo
            </span>
          </label>
        </div>
        {preview && (
          <img
            src={preview}
            alt="post photo"
            className="h-72 w-full object-cover"
          />
        )}
        {preview && (
          <button
            className="underline"
            onClick={() => {
              setFile(undefined);
              setPreview("");
            }}
          >
            reset
          </button>
        )}
        <ReactQuill
          value={content}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              ["link", "image", "video", "formula"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"], // remove formatting button
            ],
          }}
          onChange={(e) => setContent(e)}
          theme="snow"
          className="mb-24 h-96"
        />
        <Button
          disabled={isLoading}
          type="submit"
          gradientDuoTone={"purpleToPink"}
        >
          {post ? "Update" : "Publish"}
        </Button>
      </form>
    </div>
  );
}
