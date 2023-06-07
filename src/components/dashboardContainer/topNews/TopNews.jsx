import React from "react";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { Box, Link, Typography, useTheme } from "@mui/material";

import { useFetch } from "../../../hooks/useFetch";
import { getTopNews } from "../../../core/services/api/manage-news.api";
import { tokens } from "../../../global/theme/Theme";

import bg1 from "../../../assets/images/img-1.jpg";
import bg2 from "../../../assets/images/img-2.jpg";
import bg3 from "../../../assets/images/img-3.jpg";

function Item(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${props.item.img})`,
        backgroundSize: "cover",
        height: "320px",
      }}
    >
      <Box
        position="absolute"
        bottom={16}
        ml={6}
        py={2.5}
        textAlign="left"
        width="80%"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="32px"
          height="32px"
          bgColor="white"
          borderRadius="md"
          textAlign="center"
          mb={2}
        >
          <Typography variant="caption" color="dark" lineHeight={0}>
            <Box component="i" color="dark" className="ni ni-camera-compact" />
          </Typography>
        </Box>
        <Typography variant="h5" color="white" mb={0.5}>
          {props.item.title}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          multiline
          rows={1}
          sx={{
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: "54px",
          }}
        >
          {props.item.news}
        </Typography>
        <Link
          variant="body2"
          color={colors.greenAccent[500]}
          sx={{ cursor: "pointer", fontSize: "13px" }}
          href="/news"
        >
          Read more
        </Link>
      </Box>
    </Box>
  );
}

const TopNews = () => {
  const [rows, setRows] = React.useState([]);
  const { isLoading, data } = useFetch(getTopNews);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      const updatedData = data.map((news) => {
        news = { ...news, id: news._id };
        return news;
      });

      var items = [
        {
          name: "Random Name #1",
          img: bg1,
          title: updatedData[0].title,
          news: updatedData[0].text,
        },
        {
          img: bg2,
          title: updatedData[1].title,
          news: updatedData[1].text,
          name: "Random Name #2",
        },
        {
          img: bg3,
          title: updatedData[2].title,
          news: updatedData[2].text,
          name: "Random Name #2",
        },
      ];
      setRows(items);
    }
  }, [isLoading]);

  return (
    <Grid
      item
      xs={12}
      lg={5}
      sx={{
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Carousel
        sx={{
          height: "100%",
          borderRadius: "1%",
        }}
      >
        {rows.map((item, i) => (
          <Item item={item} key={i}></Item>
        ))}
      </Carousel>
    </Grid>
  );
};

export default React.memo(TopNews);
