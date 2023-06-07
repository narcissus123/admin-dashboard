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
      name: "Random Name #1",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMogjRLpwsVIRtPy7jobSXb-rBLnanihziGQ&usqp=CAU",
    },
    {
      name: "Random Name #2",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOhU2H0NJqEgOeD7asUToPCKVYVT6ai_geIrEJX5izDuEzd6AXuRijEQ16t7mQsFjv3H0&usqp=CAU",
    },
    {
      name: "Random Name #2",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV95naETG06q_qE0o-PooFVb9uPq5V6hkArQSOr_Fz2OhaYr9xQZHzDbwDTOEHzQ5MH_w&usqp=CAU",
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
