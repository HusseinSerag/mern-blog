import { Alert, Button, TextInput } from "flowbite-react";
import useUser from "../auth/useUser";
import { HiInformationCircle } from "react-icons/hi";
import { ChangeEvent, useEffect, useState } from "react";
import { useEditUser } from "./useEditUser";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import { useDeleteUser } from "./useDeleteUser";
import { Link, useLocation } from "react-router-dom";

interface UpdateUser {
  username: string;
  email: string;
  password: string;
}
export default function DashboardProfile() {
  const { user } = useUser();
  const [file, setFile] = useState<File>();
  const [previewImg, setPreviewImg] = useState("");
  const { edit, isEditing } = useEditUser();
  const urlHash = useLocation().hash;

  useEffect(
    function () {
      if (urlHash === "#delete") {
        const doc = document.getElementById("delete_button")!;
        doc.scrollIntoView({ behavior: "smooth" });
      }
    },
    [urlHash],
  );

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const img = e.target.files[0];
      setFile(e.target.files[0]);
      const imgURL = URL.createObjectURL(img);
      setPreviewImg(imgURL);
    }
  }

  const { DeleteUserInformation, isDeleting } = useDeleteUser();

  function deleteUser() {
    if (!isDeleting) {
      DeleteUserInformation("" as unknown as void, {
        onSuccess: () => toast.success("User deleted successfully!"),
      });
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUser>({
    defaultValues: {
      email: user?.email,
      username: user?.username,
    },
  });

  function onSubmit(values: UpdateUser) {
    if (!isEditing) {
      const formData = new FormData();

      if (file) {
        formData.set("photo", file, file.name);
      }
      formData.set("username", values.username);
      formData.set("email", values.email);
      if (values.password) {
        formData.set("password", values.password);
      }
      edit(formData, {
        onSuccess: () => {
          toast.success("updated succesfully");
          setPreviewImg("");
          setFile(undefined);
        },
      });
    }
  }
  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col gap-8 px-4 py-12"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl">Profile</h1>
          <label className="relative cursor-pointer">
            <input
              onChange={handleFileChange}
              accept="image/*"
              type="file"
              className="hidden"
            />
            <img
              className="h-36 w-36 rounded-full border-8 border-gray-400 object-cover"
              src={
                previewImg ||
                user?.photoURL ||
                "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png"
              }
            />
            <div className="absolute -bottom-4 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-400 text-2xl font-semibold text-white">
              +
            </div>
          </label>
          {file && (
            <button
              type="button"
              onClick={() => {
                setPreviewImg("");
                setFile(undefined);
              }}
              className="text-sm underline"
            >
              reset
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="username"
            {...register("username", {
              required: "This field is required!",
            })}
            defaultValue={user?.username}
          />
          {errors.username && (
            <p className="my-2 text-sm font-semibold text-red-700 dark:text-red-400">
              {errors.username.message}
            </p>
          )}
          <TextInput
            type="email"
            placeholder="email"
            {...register("email", {
              required: "This field is required!",
            })}
            defaultValue={user?.email}
            disabled={user?.signedInWithGoogle}
          />
          {errors.email && (
            <p className="my-2 text-sm font-semibold text-red-700 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
          <TextInput
            type="password"
            placeholder="password"
            defaultValue={""}
            {...register("password", {
              minLength: {
                value: 6,
                message: "A minimum of 6 characters is required!",
              },
            })}
          />
          {errors.password && (
            <p className="my-2 text-sm font-semibold text-red-700 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isEditing}
            className="w-full"
            gradientDuoTone="purpleToBlue"
            outline
          >
            Update
          </Button>
          {user?.role === "admin" && (
            <Link to={"/createPost"}>
              <Button
                gradientDuoTone="purpleToPink"
                className="w-full"
                type="button"
              >
                Create a Post
              </Button>
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Danger Zone</span> Please proceed with
            caution!
          </Alert>
          <Modal.ModalTrigger
            name={`delete${user?._id}`}
            render={(click) => (
              <Button
                id="delete_button"
                onClick={click}
                type="button"
                color={"red"}
              >
                Delete Account
              </Button>
            )}
          />
        </div>
      </form>
      <Modal.ModalContent
        open={`delete${user?._id}`}
        render={(onClick) => (
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">
              Are you sure you want to delete this account?
            </h1>
            <div className="flex justify-between">
              <Button color="gray" onClick={onClick}>
                Cancel
              </Button>
              <Button disabled={isDeleting} onClick={deleteUser} color={"red"}>
                Delete
              </Button>
            </div>
          </div>
        )}
      />
    </Modal>
  );
}
