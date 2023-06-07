import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

import ChatBox from "./ChatBox";
import { tokens } from "../../global/theme/Theme";
import { useFetch } from "../../hooks/useFetch";
import { getAllComments } from "../../core/services/api/manage-comments.api";
import { useChat } from "../../utils/chatContext/ChatContext";

const ChatContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  TimeAgo.addDefaultLocale(en);

  //   chat context
  const chat = useChat();

  // Getting students messages and save it in "messages".
  const { isLoading, data } = useFetch(getAllComments);

  const [lastMessages, setLastMessages] = React.useState([]);

  React.useEffect(() => {
    // Getting students messages.
    const userChat = chat.getStudentChat(data);

    // Getting id of posts.
    let postIds = userChat.map((chat) => chat.postId);
    const usersList = [...new Set(postIds)];

    // Getting last message that each student sent.
    let lastMsg = usersList.map((c) => {
      let last = postIds.lastIndexOf(c);
      return userChat[last];
    });

    setLastMessages(lastMsg);
  }, [data, isLoading]);

  // change active tab.
  const [active, setActive] = React.useState(0);
  const toggle = (target) => {
    active !== target && setActive(target);
  };

  return (
    <Box marginX="20px" sx={{ height: "92%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {/* Chat SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          sx={{
            maxWidth: "100%",
            minWidth: "20%",
            height: "100%",
          }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {lastMessages !== [] &&
              lastMessages.map((message, index) => {
                return (
                  <>
                    <ListItem
                      alignItems="flex-start"
                      key={index}
                      sx={{
                        backgroundColor: colors.greenAccent[500],
                        margin: "10px 0",
                        borderRadius: "2px",
                      }}
                      onClick={() => {
                        toggle(index);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        >
                          {" "}
                          {message.username.split(" ")[1] !== undefined
                            ? message.username
                                .split(" ")[1]
                                ?.charAt(0)
                                .toUpperCase()
                            : "S"}
                        </Avatar>
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
                            <div class="text-xs text-blue-600">
                              <ReactTimeAgo
                                date={message.createDate}
                                locale="en-US"
                              />
                            </div>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })}
          </List>
        </Box>

        {/* Chating area */}
        <Box flex="1 1 80%" ml="15px" sx={{ maxWidth: "80%", minWidth: "80%" }}>
          {lastMessages.map((content, index) => {
            return (
              active === index && (
                <ChatBox id={content.postId} allMessages={data} />
              )
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ChatContainer);
