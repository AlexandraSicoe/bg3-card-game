import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import BackgroundImage from "../images/wallpaper.jpg";
import CardComponent from "../components/CardComponent";
import imageData from "../helpers/cards.json";
import GrayLogo from "../images/logo2.png";
import Logo from "../images/logo.png";

import _ from "lodash";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
        display="flex"
        flexDirection="column"
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {gameState == 0 && (
          <Box id="loginComponent">
            <Container maxWidth="md">
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "100vh",
                }}
              >
                <Box
                  sx={{
                    transition: "transform 0.4s ease, color 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <img
                    src={GrayLogo}
                    alt="Logo"
                    style={{
                      height: "300px",
                      // marginRight: { xs: "0px", md: "15px" },
                    }}
                  />
                </Box>

                <Typography
                  level="h1"
                  textAlign="center"
                  sx={{
                    // background:
                    //   "-webkit-linear-gradient( 67deg,rgba(253, 236, 219, 1), #FBCEA0)",
                    // // backgroundImage:
                    // //   "linear-gradient(67deg, rgba(2,0,36,1) 0%, rgba(255, 197, 71,1) 0%, rgba(90, 59, 0,1) 98%)",
                    color: "white",
                    fontSize: "28px",

                    // background: `linear-gradient(67deg,  rgba(255, 197, 71,1) 0%, rgba(90, 59, 0,1) 98%)`,
                    display: "inline-block",
                    // backgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    fontFamily: "BreatheFireFont",
                    letterSpacing: "2px",
                    mt: "20px",
                  }}
                >
                  Welcome to the Card-Matching Adventure in the Shadows of
                  Baldur's Gate
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    mt: "10px",
                  }}
                >
                  <Typography
                    level="h2"
                    sx={{ color: "white", fontFamily: "Quadrat" }}
                  >
                    Enter your name:
                  </Typography>
                  <TextField
                    sx={{
                      "& .MuiInput-underline": {
                        color: "white",
                        fontFamily: "Quadrat",
                        marginLeft: "20px",
                        marginRight: "20px",
                      },
                    }}
                    id="standard-basic"
                    variant="standard"
                    color="success"
                    focused
                    value={loginInput}
                    onChange={(e) => {
                      localStorage.setItem("username", e.target.value);
                      setLoginInput(e.target.value);
                    }}
                  ></TextField>
                  <div>
                    <Button
                      sx={{
                        color: "white",
                        fontFamily: "Quadrat",
                        fontSize: "20px",
                        "& .MuiInput-underline": {
                          color: "white",
                          fontFamily: "Quadrat",
                        },
                      }}
                      size="md"
                      onClick={() => {
                        if (loginInput.length > 0) {
                          setGameState(1);
                        }
                      }}
                    >
                      Start
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Container>
          </Box>
        )}

        {gameState == 1 && (
          <Box id="gameComponent">
            <Grid
              py={2}
              px={3}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  location.reload();
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={1}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    height: "200px",
                  }}
                />
              </Box>

              <Box sx={{ marginLeft: { xs: "0px", md: "40px" } }}>
                <Typography
                  level="h1"
                  sx={{
                    background:
                      "-webkit-linear-gradient( left,#FDECDB, #FBCEA0)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Welcome to the Card-Matching Adventure in the Shadows of
                  Baldur's Gate:
                </Typography>
                <Typography level="h4" sx={{ color: "white" }}>
                  Embark on a journey through the arcane streets of this
                  enigmatic city as you uncover pairs of symbols that hold the
                  key to its magical mysteries.
                </Typography>

                <Typography
                  level="h3"
                  sx={{ color: "white", paddingTop: "10px" }}
                >
                  Ready to test your memory?
                </Typography>
              </Box>
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
        <Grid
          container
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            justifyContent: "flex-end",
            position: "relative",
            mt: "auto",
            minHeight: "100px",
            p: 2,
          }}
        >
          <Typography
            level="body-md"
            sx={{
              color: "white",
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
          >
            © 2024 Inspired by classic memory games and a passion for Baldurs
            Gate 3, this project aims to provide a delightful gaming experience
            for all ages. - Created with love by Lex.
          </Typography>
        </Grid>
      </Box>
    </>
  );
}

export default CardGame;
