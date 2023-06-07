import React from "react";
import { Avatar, Box, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { MutiLineInput } from "../../../common/inputs/SignupInput";
import { CustomModal } from "../../../common/modal/Modal";

import { tokens } from "../../../../global/theme/Theme";
import { ReplyCommentData } from "../../../../config/data/manageCommentData/ReplyCommentData";
import { sendCommentAnswer } from "../../../../core/services/api/manage-comments.api";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SendIcon from "@mui/icons-material/Send";

const AnswerCommentModal = ({ setOpen, open, selectedRow }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = Yup.object().shape({
    answer: Yup.string()
      .max(1000, "Must be 1000 characters or less.")
      .required("This is required."),
  });

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      modalHeader={true}
      modalFooter={false}
    >
      {/* Content */}
      <Box
        sx={{
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        {/* Content frame */}
        <Box
          sx={{
            alignItems: "center",
            gap: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {/* Content Header. Name and Avatar of users. */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar />
            <span style={{ color: colors.greenAccent[500], fontSize: "15px" }}>
              {" "}
              {selectedRow.username}
            </span>
          </Box>
          {/* User comment content. */}
          <TextField
            id="standard-multiline-static"
            multiline
            defaultValue={selectedRow.comment}
            variant="standard"
            InputProps={{ readOnly: true }}
            sx={{
              p: "6px",
            }}
            fullWidth
          />
          {/* Admin Commenting Area.*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
            }}
          >
            {/* Admin Avatar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                m: "15px",
                border: "1px solid #ccc",
                p: "10px",
                borderRadius: "100%",
              }}
            >
              <AdminPanelSettingsIcon />
            </Box>
            {/* Frame */}
            <Box
              sx={{
                alignItems: "center",
                gap: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",

                my: "30px",
                width: "85%",
                border: "1px solid #ccc",
                overflow: "hidden",
              }}
              fullWidth
            >
              {/* If there is a response from admin, We just show the response. If not We show form for admin to reply to user comment.*/}
              {selectedRow.answer ? (
                <TextField
                  id="standard-multiline-static"
                  multiline
                  defaultValue={selectedRow.answer}
                  variant="standard"
                  InputProps={{ readOnly: true }}
                  sx={{
                    px: "6px",
                    py: "15px",
                  }}
                  fullWidth
                />
              ) : (
                <Formik
                  initialValues={{
                    answer: selectedRow.answer,
                  }}
                  validationSchema={formSchema}
                  onSubmit={React.useCallback(async (values) => {
                    try {
                      const userInput = {
                        anser: values.answer,
                        id: selectedRow._id,
                      };

                      setIsLoading(true);
                      const response = await sendCommentAnswer(
                        selectedRow._id,
                        userInput
                      );

                      if (response.status === 200) {
                        toast.success("Comment sent successfully.");
                      } else {
                        toast.error(
                          "Sorry, something went wrong. Please try again."
                        );
                      }
                    } catch (error) {
                      console.error(error);
                    }
                    setIsLoading(false);
                  }, [])}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      {ReplyCommentData.map((data, index) => (
                        <>
                          <MutiLineInput
                            key={index}
                            fullWidth={data.fullWidth}
                            variant={data.variant}
                            type={data.type}
                            label={data.label}
                            name={data.name}
                            sx={data.sx}
                            required={data.required}
                            row={data.row}
                          />
                          <SendIcon />
                        </>
                      ))}
                    </form>
                  )}
                </Formik>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default React.memo(AnswerCommentModal);

{
  /* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "32px",
                      }}
                    >
                      <LoadingButton isLoading={isLoading} btnText="REPLY" />
                    </Box> */
}
