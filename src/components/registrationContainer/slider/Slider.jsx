import React from "react";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import landing1 from "../../../assets/images/landing2.png";
import landing2 from "../../../assets/images/landing1.webp";
import Image from "mui-image";

function Item(props) {
  return (
    <Box
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        height: "100vh",
      }}
    >
      <Image src={props.item.src} />
    </Box>
  );
}
const Slider = () => {
  var items = [
    {
      name: "Random Name #4",
      src: "https://content.jdmagicbox.com/comp/pune/u1/020pxx20.xx20.220228140026.p1u1/catalogue/yash-computer-training-institute-aundh-pune-computer-training-institutes-7fulrujwkg.jpg",
    },
    {
      name: "Random Name #4",
      src: "https://cdn.elearningindustry.com/wp-content/uploads/2018/01/5-tips-to-master-the-art-of-elearning-according-to-personality-type.jpg",
    },
    // {
    //   name: "Random Name #4",
    //   src: "https://media.istockphoto.com/id/469628658/photo/handicap-student-in-computer-lab.jpg?s=612x612&w=0&k=20&c=StaUKr2IGR7v5MZj4aNw_Gbtz-epXsCGMigcDrcKXqk=",
    // },
    {
      name: "Random Name #4",
      src: "https://www.theaccessgroup.com/media/iqslqxx1/elearning-by-experts-2x-1.jpg?anchor=center&mode=crop&width=820&height=460&rnd=132899481063800000",
    },
    {
      name: "Random Name #4",
      src: "https://aceit-training.com/ressources/images/89b42bdac3bf.jpg",
    },
  ];

  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        height: "100%",
      }}
    >
      <Carousel
        sx={{
          height: "100%",
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Grid>
  );
};

export default Slider;
