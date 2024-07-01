import { useThemeMode } from "flowbite-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FullPageLoader from "./components/FullPageLoader";
const LoadUser = lazy(() => import("./layout/LoadUser"));
const ProtectedLayout = lazy(() => import("./layout/ProtectedLayout"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const AdminOnlyLayout = lazy(() => import("./layout/AdminOnlyLayout"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const Post = lazy(() => import("./pages/Post"));
const Search = lazy(() => import("./pages/Search"));

const MainLayout = lazy(() => import("./layout/mainLayout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));

export default function App() {
  const { mode } = useThemeMode();
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route element={<LoadUser />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route element={<AdminOnlyLayout />}>
                  <Route path="/createPost" element={<CreatePost />} />
                  <Route path="/updatePost/:postID" element={<UpdatePost />} />
                </Route>
              </Route>
              <Route path="/projects" element={<Projects />} />
              <Route path="/post/:slug" element={<Post />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={mode === "light" ? "light" : "dark"}
      />
    </BrowserRouter>
  );
}
