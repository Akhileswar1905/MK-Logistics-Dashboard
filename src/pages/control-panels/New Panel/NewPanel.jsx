import React from "react";
import PanelForm from "../components/PanelForm";

const NewPanel = () => {
  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-grayish text-3xl">New Control Panel</h1>
      <div className="border-2 rounded-lg p-6">
        <PanelForm />
      </div>
    </div>
  );
};

export default NewPanel;
