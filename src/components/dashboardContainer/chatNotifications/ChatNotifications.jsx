import React from "react";
import {
  Box,
  Link,
  Avatar,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  useTheme,
  Divider,
  Badge,
  Card,
} from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";
import { positions } from "@mui/system";

import { tokens } from "../../../global/theme/Theme";
import { getAllComments } from "../../../core/services/api/manage-comments.api";
import { useChat } from "../../../utils/chatContext/ChatContext";
import { useFetch } from "../../../hooks/useFetch";

import ChatIcon from "@mui/icons-material/Chat";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let backgroundColor = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    backgroundColor += `00${value.toString(16)}`.slice(-2);
  }

  /* eslint-enable no-bitwise */

  return backgroundColor;
}

function stringAvatar(name) {
  return {
    sx: {
      backgroundColor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ChatNotifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  TimeAgo.addDefaultLocale(en);

  //   chat context
  const chat = useChat();

  // Getting students messages and save it in "messages".
  const { data } = useFetch(getAllComments);
  const [messages, setMessages] = React.useState([]);

  // Only students' messages from today will be shown.
  React.useEffect(() => {
    // Getting students messages from today.
    const userChat = chat.getStudentChat(data);

    // Getting id of posts.
    let postIds = userChat.map((chat) => chat.postId);
    const usersList = [...new Set(postIds)];

    // Getting last message that each student sent.
    let lastMessages = usersList.map((c) => {
      let last = postIds.lastIndexOf(c);
      return userChat[last];
    });

    setMessages(lastMessages);
  }, [data]);

  return (
    <Card
      component="div"
      sx={{
        maxWidth: "384px",
        overflow: "hidden",
        backgroundColor: colors.primary[400],
        borderLeft: `1px solid ${colors.blueAccent[700]}`,
        borderRight: `1px solid ${colors.blueAccent[700]}`,
      }}
    >
      <Box
        component="div"
        sx={{
          display: "block",
          paddingX: "16px",
          paddingY: "6px",
          textAlign: "center",
          fontWeight: "500",
          fontSize: "16px",
          color: colors.grey[100],
          backgroundColor: colors.blueAccent[700],
        }}
      >
        Messages
      </Box>
      <Box sx={{ overflowY: "auto", height: "250px" }}>
        {messages === [] ? (
          <Box>
            {" "}
            <Link
              href="#"
              sx={{
                display: "flex",
                paddingX: "16px",
                paddingY: "12px",
              }}
            >
              No messages
            </Link>
          </Box>
        ) : (
          <List>
            {messages.map((message, index) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  key={index}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "4px 0",
                    borderRadius: "2px",
                  }}
                  onClick={() => {
                    toggle(index);
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      display: "flex",
                      justifyContent: "between",
                      gap: "8px",
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <ChatIcon
                          sx={{
                            fontSize: "15px",
                            display: "inline-block",
                          }}
                        />
                      }
                    >
                      <Avatar
                        src="/static/images/avatar/1.jpg"
                        {...stringAvatar(
                          message.username.split(" ")[1] !== undefined
                            ? message.username.split(" ")[1] +
                                " " +
                                message.username.split(" ")[2]
                            : "Student student"
                        )}
                      >
                        {" "}
                        {message.username.split(" ")[1] !== undefined
                          ? message.username
                              .split(" ")[1]
                              ?.charAt(0)
                              .toUpperCase()
                          : "S"}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`New message from ${
                      message.username.split(" ").length === 1
                        ? " user"
                        : message.username.split(" ").slice(1)
                    }`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {message.comment}
                        </Typography>
                        <Box class="text-xs text-blue-600">
                          <ReactTimeAgo
                            date={message.createDate}
                            locale="en-US"
                          />
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        )}
      </Box>
      <Link
        href="/chat"
        sx={{
          paddingY: "6px",
          display: "flex",
          positions: "sticky",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "20px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          backgroundColor: colors.blueAccent[700],
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "16px",
              height: "16px",
              color: colors.grey[100],
              marginTop: "5px",
            }}
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Box>
        <Typography
          sx={{
            display: "inline-block",
            color: colors.grey[100],
            fontSize: "14px",
          }}
        >
          View all
        </Typography>
      </Link>
    </Card>
  );
};

export default React.memo(ChatNotifications);
