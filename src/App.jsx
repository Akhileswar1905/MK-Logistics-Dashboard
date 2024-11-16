// App.js
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { links } from "./components/sidebar/data/Links";
import Login from "./pages/auth/Login/Login";

function App() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      {/* Conditionally render Layout based on the route */}
      {location.pathname !== "/login" && (
        <Layout>
          <Routes>
            {links.map((link, index) => {
              const Comp = link.component;
              return <Route key={index} path={link.path} element={<Comp />} />;
            })}
          </Routes>
        </Layout>
      )}

      {/* Login route doesn't require the Layout */}
      <Routes>
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
