import React, { createContext, useState, useContext } from "react";

const TableContext = createContext(false);
export const TableProvider = ({ children }) => {
  const [userInput, setUserInput] = useState({});
  const [studentIsActive, setStudentIsActive] = useState(false);

  const setUpdatedValue = (cellValue) => {
    setUserInput({ ...userInput, ...cellValue });
  };
  const setStudentActiveValue = (cellValue) => {
    setStudentIsActive(cellValue);
  };

  return (
    <TableContext.Provider
      value={{
        setUpdatedValue,
        userInput,
        setStudentActiveValue,
        studentIsActive,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  return useContext(TableContext);
};
