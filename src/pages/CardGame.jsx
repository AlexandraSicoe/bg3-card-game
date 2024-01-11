import { Grid, Typography } from "@mui/joy";
import BackgroundImage from "../images/wallpaper.jpg";
import CardComponent from "../components/CardComponent";
import imageData from "../helpers/cards.json";
import { useState, useEffect } from "react";

function CardGame() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const handleCardClick = (id) => {
    setSelectedCards((prevSelectedCards) => ({
      ...prevSelectedCards,
      [id]: !prevSelectedCards[id],
    }));
  };

  useEffect(() => {
    setShuffledData(imageData.cards.slice());
  }, []);
  return (
    <>
      <Grid
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          filter: "brightness(0.8)",
        }}
      >
        <Grid
          sx={{
            paddingTop: "20px",
          }}
        >
          <Typography level="h1" sx={{ color: "white" }}>
            Welcome to the Card-Matching Adventure in the Shadows of Baldur's
            Gate:
          </Typography>
          <Typography level="h3" sx={{ color: "white" }}>
            Embark on a journey through the arcane streets of this enigmatic
            city as you uncover pairs of symbols that hold the key to its
            magical mysteries.
          </Typography>
          <Typography level="body-md" sx={{ color: "white" }}>
            Created with love by Lex. - Inspired by classic memory games and a
            passion for Baldurs Gate 3, this project aims to provide a
            delightful gaming experience for all ages.
          </Typography>
          <Typography level="body-md" sx={{ color: "white" }}>
            Ready to test your memory?
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {shuffledData.map((cardData) => (
            <CardComponent
              key={cardData.id}
              cardData={cardData}
              isSelected={selectedCards[cardData.id]}
              onClick={() => handleCardClick(cardData.id)}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default CardGame;
