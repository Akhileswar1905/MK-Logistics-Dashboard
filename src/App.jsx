import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { links } from "./components/sidebar/data/Links";
import Login from "./pages/auth/Login/Login";
import NotFound from "./404/page";
import DriverDetailsPage from "./pages/drivers/detailedPage";
import ContractDetailsPage from "./pages/contracts/detailedPage";
import NewDriverDetailsPage from "./pages/new-drivers/detailedPage";
import UpdateRequestDetailsPage from "./pages/update-requests/detailedPage";
import TransactionReportDetailsPage from "./pages/reports/detailedPage";
import Trips from "./pages/drivers/subpages/Trips";
import Earnings from "./pages/drivers/subpages/Earnings";
import BioData from "./pages/drivers/subpages/BioData";
import NewDriverBioData from "./pages/new-drivers/subpages/NewDriver-BioData";
import NewContract from "./pages/contracts/New Contract/NewContract";

function App() {
  const location = useLocation();

  // Check if the current route is valid for Layout
  const isValidRoute = links.some((link) => {
    const isDynamicRoute = link.detailsPath
      ? location.pathname.startsWith(link.path) ||
        location.pathname.startsWith(link.detailsPath.split("/:")[0])
      : location.pathname === link.path;
    return isDynamicRoute;
  });

  return (
    <div>
      {/* Conditionally render Layout */}
      {location.pathname !== "/login" && isValidRoute && (
        <Layout>
          <Routes>
            {links.map((link, index) => {
              const Comp = link.component;
              return <Route key={index} path={link.path} element={<Comp />} />;
            })}
            <Route path="/drivers/:id" element={<DriverDetailsPage />}>
              <Route index element={<Navigate to="bio-data" replace />} />
              <Route path="bio-data" element={<BioData />} />
              <Route path="trips" element={<Trips />} />
              <Route path="earnings" element={<Earnings />} />
            </Route>
            <Route path="/contracts/:id" element={<ContractDetailsPage />} />
            <Route path="/contracts/new-contract" element={<NewContract />} />
            <Route path="/new-driver/:id" element={<NewDriverDetailsPage />}>
              <Route index element={<Navigate to="bio-data" replace />} />
              <Route path="bio-data" element={<NewDriverBioData />} />
            </Route>
            <Route
              path="/trip-update/:id"
              element={<UpdateRequestDetailsPage />}
            />
            <Route
              path="/transaction-reports/:id"
              element={<TransactionReportDetailsPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      )}

      {/* Routes for login and page not found */}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
