import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { IoHomeOutline } from "react-icons/io5";
import useAuth from "../../Utility/Hooks/UseAuth/useAuth";

const SignIn = () => {
  // Navigate the Use To Relevant Page
  const navigate = useNavigate();
  const location = useLocation();

  //   Get Relevant Function From React Hook From
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   Sign In User Function
  const { signInUser } = useAuth();
  // Handle On Submit If Your Submit The From With Email And Password
  const onSubmit = (data) => {
    const toastId = toast.loading("Sign In Processing");
    // Call The SignInUser Function With Email And Password
    signInUser(data.email, data.password)
      .then((res) => {
        toast.success("Sign In SuccessFull", { id: toastId });
        navigate(location.state ? location.state : "/");
        console.log(res);
      })
      //   If Internal error show Them To The User
      .catch((error) => {
        if (error.message) {
          toast.error("Invalid Email And Password", { id: toastId });
        }
      });
  };

  return (
    <div className="bg-cover relative bg-none lg:bg-[url('https://i.ibb.co/7NJZ15z/13900642-5387142.jpg')]">
        {/* Helmet For Changing Document Name Based On The Page */}
      <Helmet>
        <title>Task Pulse || Sign In</title>
      </Helmet>
      {/* navigate The User To Home Button */}
      <Link to={"/"}>
        <button className="hover:text-main text-black text-xl transition-all duration-300 items-center font-semibold flex justify-center gap-2  absolute lg:left-96 lg:top-10">
          <span className="text-3xl">
          <IoHomeOutline size={26} />
          </span>
          Go Home
        </button>
      </Link>

      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
        <div className="lg:w-1/2 w-[90vw] mx-auto ">
          <div className="card  lg:w-3/4  mx-auto shadow-[0_0_20px_] lg:backdrop-blur-sm lg:p-10 lg:my-10">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                  })}
                />
                <div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Password Is required
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-100 hover:bg-gray-100 border-dashed border-main hover:border-main"
                  type="submit"
                  value="Sign In"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Do not have a account.?
                <Link className=" font-bold text-main ml-1" to={"/signUp"}>
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
