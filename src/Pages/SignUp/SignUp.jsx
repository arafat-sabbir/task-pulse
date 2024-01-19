import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { IoHomeOutline} from "react-icons/io5";
import axios from "axios";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  Get SignUp And UpdateProfile From AuthProvider
  const { signUpUser, updateUserProfile } = useAuth();

  //   ImageBB hosting Key For Hosting User Image To DataBase
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
  const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  //   Get The Photo Name For Showing On the Ui
  const [photoName, setPhotoName] = useState("");

  //   Get The Photo Data For Sending To ImageBB
  const [photo, setPhoto] = useState("");

  //   Create A New FormData With The Photo Data
  const formData = new FormData();
  formData.append("image", photo);
  const handlePhotoUpload = (e) => {
    e.preventDefault();
    setPhotoName(e.target.files[0].name);
    setPhoto(e.target.files[0]);
  };

  // Get The Relevant Function From React Hook From
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle On Submit The From With User Given Data
  const onSubmit = async (data) => {
    const toastId = toast.loading("Sign Up Processing");
    const res = await axios.post(imageHostingAPi, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    signUpUser(data.email, data.password)
      .then(() => {
        // update the user profile on firebase with Name And Url
        console.log(res.data.data.display_url);
        updateUserProfile(data.name, res.data.data.display_url)
          .then(() => {
            navigate(location.state ? location.state : "/");
            toast.success("Sign Up SuccessFull", { id: toastId });
          })
          //   If any error happen show it to the user
          .catch((error) => {
            toast.error(error);
            reset();
          });
        console.log(data);
      })

      // If Email is already registered Send A toast to the user

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already Registered", { id: toastId });
        }
      });
  };

  return (
    <div className="bg-cover relative bg-none lg:bg-[url('https://i.ibb.co/7NJZ15z/13900642-5387142.jpg')]">
      {/* Helmet For Changing Document Name Based On The Page */}
      <Helmet>
        <title>Task Pulse || Sign Up</title>
      </Helmet>

      {/* Link To Navigate the User To Home */}
      <Link to={"/"}>
        <button className="hover:text-main text-black text-xl transition-all duration-300 items-center font-semibold flex justify-center gap-2  absolute lg:left-96 lg:top-10">
          <span className="text-3xl">
          <IoHomeOutline size={26} />
          </span>
          Go Home
        </button>
      </Link>
      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
        <div className="lg:w-1/2 w-[97vw]">
          <div className="card  lg:w-3/4 p-4  mx-auto shadow-[0_0_20px_] lg:backdrop-blur-sm lg:p-10 my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  name="name"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="text-main mt-2" role="alert">
                    Please Type A Name
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-main mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>

                <div className="relative w-full">
                  <label className="label absolute -z-50 input pt-2  input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main w-full ">
                    <span className="label-text ">
                      {photoName || "Choose Profile Picture"}
                    </span>
                  </label>
                  <input
                    onChange={handlePhotoUpload}
                    accept="images/*"
                    type="file"
                    placeholder="upload your Photo"
                    name="email"
                    className="input pt-2 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  })}
                />
                <div>
                  {errors.password?.type === "minLength" && (
                    <p className="text-main" role="alert">
                      Password Should AtLeast 6 Character
                    </p>
                  )}
                  {errors.password?.type === "required" && (
                    <p className="text-main" role="alert">
                      Please Type An Password
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-main" role="alert">
                      Password Should Contain AtLeast one Uppercase And One
                      Special Character
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-100 hover:bg-gray-100 border-dashed border-main hover:border-main"
                  type="submit"
                  value="Sign UP"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Already Have an Account.?
                <Link className=" font-bold text-main ml-1" to={"/signIn"}>
                  SignIn
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
