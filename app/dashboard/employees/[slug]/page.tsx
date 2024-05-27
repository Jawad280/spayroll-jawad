import React from "react";

const EmployeePage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      Edit employees' info
      <div>{params.slug}</div>
    </div>
  );
};

export default EmployeePage;
