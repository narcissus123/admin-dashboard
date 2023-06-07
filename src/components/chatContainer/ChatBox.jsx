import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";

import { Input } from "../common/inputs/SignupInput";
import { tokens } from "../../global/theme/Theme";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../../utils/chatContext/ChatContext";
import { useAuth } from "../../utils/auth/Auth";
import { getItem } from "../../core/services/storage/Storage";

import {
  sendCommentVerification,
  SendUserComments,
} from "../../core/services/api/manage-comments.api";

const ChatBox = ({ id, allMessages }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //   chat context
  const chat = useChat();

  const [chats, setChats] = React.useState([]);
  const user = useAuth();

  // Getting messages for student with id "id".
  React.useEffect(() => {
    const userChat = chat.getChatsById(allMessages, id);

    setChats(userChat);
  }, [allMessages, id]);

  return (
    <Box
      sx={{
        border: "1px solid white",
        height: "100%",

        gap: "2px",
        overflow: "auto",
      }}
      backgroundColor={colors.primary[400]}
    >
      <Box sx={{ border: "1px solid blue", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              direction: "column",
              order: 1,
              gap: "12px",
              marginX: "8px",
              alignItems: "end",
              fontSize: "12px",
              lineHeight: "16px",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                borderRadius: "8px",
                borderBottomRightRadius: "0px",
                backgroundColor: "blue",
                paddingY: "8px",
                paddingX: "16px",
                text: "white",
              }}
            >
              Hi, We have 24 hour support! How can we help you today?
            </Typography>
            <IconButton
              sx={{
                border: "1px solid #ccc",
              }}
            >
              <AdminPanelSettingsIcon
                size="large"
                sx={{
                  order: 2,
                  height: "22px",
                  width: "22px",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        {chats.map((chat, index) => {
          return (
            <>
              {chat.username.split(" ")[0] === "userChat" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    paddingLeft: "12px",
                  }}
                >
                  <AccountCircleIcon
                    size="large"
                    sx={{
                      order: 1,
                      height: "38px",
                      width: "38px",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      direction: "column",
                      order: 2,
                      marginX: "8px",
                      display: "flex",
                      direction: "column",
                      maxWidth: "320px",
                      alignItems: "start",
                      marginY: "8px",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "inline-block",
                        borderRadius: "8px",
                        borderBottomLeftRadius: "0px",
                        paddingX: "16px",
                        paddingY: "8px",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {chat.comment}
                    </Typography>
                  </Box>
                </Box>
              )}

              {chat.username.split(" ")[0] === "adminChat" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "end",

                    paddingRight: "12px",
                  }}
                >
                  <Box
                    sx={{
                      order: 1,
                      marginX: "8px",
                      marginY: "8px",
                      maxWidth: "320px",
                      alignItems: "end",
                      fontSize: "12px",
                      lineHeight: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "block",
                        marginY: "8px",
                        borderRadius: "8px",
                        borderBottomRightRadius: "0px",
                        backgroundColor: "blue",
                        paddingY: "8px",
                        paddingX: "16px",
                        text: "white",
                      }}
                    >
                      {chat.comment}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      border: "1px solid #ccc",
                      order: 2,
                    }}
                  >
                    <AdminPanelSettingsIcon
                      size="large"
                      sx={{
                        height: "22px",
                        width: "22px",
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </>
          );
        })}
      </Box>
      <Box>
        {/* Texting Area */}
        <Box
          sx={{
            borderTop: "1px solid #ccc",
            display: "sticky",
            borderRadius: "3px",
          }}
        >
          <Formik
            initialValues={{
              answer: "",
            }}
            onSubmit={async (values) => {
              try {
                // Getting user message received from form and send it to server.
                let userMessage;

                if (user.isEmployee) {
                  const admin = JSON.parse(getItem("employee"));

                  userMessage = {
                    postId: id,
                    email: admin.email,
                    username: `adminChat ${admin.fullName}`,
                    comment: values.answer,
                  };
                }

                const response = await SendUserComments(userMessage);

                // updating chat.
                setChats((prev) => [...prev, JSON.parse(response.config.data)]);
                if (response.status === 200) {
                  const commentId = chats[chats.length - 1]._id;

                  // Messages will be validated immediately after we send user messsage to server successfully using "SendUserComments" API.
                  const response = await sendCommentVerification(commentId);
                }
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Input
                    key="1"
                    fullWidth={true}
                    variant="outlined"
                    type="string"
                    label=""
                    name="answer"
                    sx={{
                      width: "100%",
                    }}
                    required="true"
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: 1, marginX: "10px" }}
                    color="secondary"
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ChatBox);
