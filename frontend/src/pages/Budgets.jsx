import React from "react";

const Budgets = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen space-y-5 pt-20">
      <h1>Coming on next updates!</h1>
      <div className="flex w-2/6 flex-col gap-5">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-72"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-48"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default Budgets;
