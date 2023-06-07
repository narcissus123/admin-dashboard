import React from "react";

const PreProcessEditCellProps = (params) => {
  const [validationObj] = UseValidation(params.props.value);
  let validationMessage = validationObj
    .dateType("Please enter a valid date.")
    .getErrorMessage();

  return {
    ...params.props,
    error: !!validationMessage,
    errorMessage: validationMessage,
  };
};

export default React.memo(PreProcessEditCellProps);
