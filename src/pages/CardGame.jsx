import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Input, Typography } from "@mui/joy";
import BackgroundImage from "../images/wallpaper.jpg";
import CardComponent from "../components/CardComponent";
import imageData from "../helpers/cards.json";
import _ from "lodash";

function CardGame() {
  const [shuffledData, setShuffledData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [enableCardClick, setEnableCardClick] = useState(true);
  const [loginInput, setLoginInput] = useState("");
  const [gameState, setGameState] = useState(0);

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
    setLoginInput(localStorage.getItem("username"));

    let pairedCards = imageData.cards.concat(imageData.cards);
    shuffleArray(pairedCards);
    setShuffledData(pairedCards);
  }, []);

  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          filter: "brightness(0.8)",
          width: "100%",
        }}
      >
        {gameState == 0 && (
          <Box id="loginComponent">
            <Container maxWidth="md">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography level="h3" sx={{ color: "white" }}>
                  Welcome to the Card-Matching Adventure in the Shadows of
                  Baldur's Gate:
                </Typography>
                <Typography level="h2" sx={{ color: "white" }}>
                  Enter your name:
                </Typography>
                <Input
                  size="lg"
                  value={loginInput}
                  onChange={(e) => {
                    localStorage.setItem("username", e.target.value);
                    setLoginInput(e.target.value);
                  }}
                ></Input>
                <Button
                  color="success"
                  size="lg"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    if (loginInput.length > 0) {
                      setGameState(1);
                    }
                  }}
                >
                  Start
                </Button>
              </Grid>
            </Container>
          </Box>
        )}

        {gameState == 1 && (
          <Box id="gameComponent">
            <Grid p={3}>
              <Typography level="h1" sx={{ color: "white" }}>
                Welcome to the Card-Matching Adventure in the Shadows of
                Baldur's Gate:
              </Typography>
              <Typography level="h3" sx={{ color: "white" }}>
                Embark on a journey through the arcane streets of this enigmatic
                city as you uncover pairs of symbols that hold the key to its
                magical mysteries.
              </Typography>
              <Typography level="body-md" sx={{ color: "white" }}>
                Created with love by Lex. - Inspired by classic memory games and
                a passion for Baldurs Gate 3, this project aims to provide a
                delightful gaming experience for all ages.
              </Typography>
              <Typography level="body-md" sx={{ color: "white" }}>
                Ready to test your memory?
              </Typography>
            </Grid>
            <Grid p={3} container>
              {shuffledData.map((cardData, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  mt={2}
                  // sx={{ width: "100%" }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardComponent
                    cardData={cardData}
                    isSelected={selectedCards[index]}
                    onClick={() => handleCardClick(index, cardData.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CardGame;
