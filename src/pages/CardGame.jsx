import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/joy";
import BackgroundImage from "../images/wallpaper.jpg";
import CardComponent from "../components/CardComponent";
import imageData from "../helpers/cards.json";
import _ from "lodash";

function CardGame() {
  const [shuffledData, setShuffledData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [enableCardClick, setEnableCardClick] = useState(true);

  const handleCardClick = (index, id) => {
    if (selectedCards[index] == true) {
      return;
    }
    if (enableCardClick == false) {
      return;
    }
    const clonedSelectedCards = _.cloneDeep(selectedCards);
    clonedSelectedCards[index] = !clonedSelectedCards[index];
    setSelectedCards(clonedSelectedCards);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  useEffect(() => {
    let sum = 0;
    selectedCards.forEach((element) => {
      console.log(element);
      sum = sum + Boolean(element);
    });
    console.log(sum);
    if (sum % 2 == 0 && sum != 0) {
      setEnableCardClick(false);
    }
  }, [selectedCards]);

  useEffect(() => {
    let pairedCards = imageData.cards.concat(imageData.cards);
    shuffleArray(pairedCards);
    setShuffledData(pairedCards);
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
          {shuffledData.map((cardData, index) => (
            <CardComponent
              key={index}
              cardData={cardData}
              isSelected={selectedCards[index]}
              onClick={() => handleCardClick(index, cardData.id)}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default CardGame;
