import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { links } from "./components/sidebar/data/Links";

const Main = () => {
  return (
    <Layout>
      <Routes>
        {links.map((link, index) => {
          const Comp = link.component;
          return <Route key={index} path={link.path} element={<Comp />} />;
        })}
        <Route path="*" element={() => <h1>Page Not Found</h1>} />
      </Routes>
    </Layout>
  );
};

export default Main;
