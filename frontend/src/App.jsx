
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./components/Shared/Login"
import Home from "./components/Home"
import SignUp from "./components/Shared/SignUp"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescriptionPage from "./components/JobDecriptionPage"
import Company from "./components/company/Company"
import CreateCompany from "./components/company/CreateCompany"
import ComapnySetup from "./components/company/ComapnySetup"
import CompanyJob from "./components/company/CompanyJob"
import PostJob from "./components/company/PostJob"
import Applicants from "./components/company/Applicants"
import ProtectedRoutes from "./components/company/ProtectedRoutes"


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },

  , {
    path: "/browse",
    element: <Browse />
  }, {
    path: "/profile",
    element: <Profile />
  }, {
    path: "/jobs/description/:id",
    element: <JobDescriptionPage />
  },
  {
    path: "/admin/company",
    element:
      <ProtectedRoutes>
        <Company />
      </ProtectedRoutes>
  },
  {
    path: "/admin/company/create",
    element:
      <ProtectedRoutes>
        <CreateCompany />
      </ProtectedRoutes>
  },
  {
    path: "/admin/company/:id",
    element: <ProtectedRoutes>
      <ComapnySetup />
    </ProtectedRoutes>
  },
  {
    path: "/admin/jobs",
    element:
      <ProtectedRoutes>
        <CompanyJob />
      </ProtectedRoutes>
  },
  {
    path: "/admin/create/jobs",
    element:
      <ProtectedRoutes>
        <PostJob />
      </ProtectedRoutes>


  }, {
    path: '/admin/company/applicants/:id',
    element:
      <ProtectedRoutes>
        <Applicants />
      </ProtectedRoutes>
  }
])


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
