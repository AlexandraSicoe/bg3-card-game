import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import BackgroundImage from "../images/wallpaper.jpg";
import CardComponent from "../components/CardComponent";
import ChooseDifficulty from "../components/ChooseDifficulty";
import GrayLogo from "../images/logo2.png";
import Logo from "../images/logo.png";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import imageData from "../helpers/cards.json";
import imageData2 from "../helpers/incubusDifficulty.json";
import imageData3 from "../helpers/abyssDifficulty.json";

function CardGame() {
  const [shuffledData, setShuffledData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [enableCardClick, setEnableCardClick] = useState(true);
  const [loginInput, setLoginInput] = useState("");
  const [gameState, setGameState] = useState(0);
  const [historyCardClick, setHistoryCardClick] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimer = () => {
    setStartTime(Date.now()); // Set startTime to the current timestamp
    setIsRunning(true); // Start the timer
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsRunning(false); // Pause the timer
  };

  // Update elapsedTime based on current time and startTime
  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      // Start the timer interval
      timerInterval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000); // Convert to seconds
        setElapsedTime(elapsed);
      }, 1000); // Update every second
    } else {
      clearInterval(timerInterval); // Clear the interval if timer is not running
    }

    return () => clearInterval(timerInterval); // Clean up the interval on component unmount or effect cleanup
  }, [isRunning, startTime]);
  useEffect(() => {
    if (gameState === 1) {
      startTimer(); // Start the timer when gameState changes to 1
    } else {
      setElapsedTime(0);
      stopTimer(); // Stop the timer when gameState changes to a value other than 1
    }
  }, [gameState]);

  const calculateScore = (elapsedTime) => {
    // Example formula: score = 1000 - (elapsedTime * 10)
    return 1000 - elapsedTime * 10;
  };

  // Usage:
  // Calculate the score based on elapsedTime

  const handleCardClick = (index, id) => {
    if (selectedCards[index] == true) {
      return;
    }
    if (enableCardClick == false) {
      return;
    }
    const clonedHistoryCardClick = _.cloneDeep(historyCardClick);
    clonedHistoryCardClick.push({ index, id });
    setHistoryCardClick(clonedHistoryCardClick);

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
      sum = element + sum;
    });
    if (sum == selectedCards.length && selectedCards.length > 0) {
      setTimeout(() => {
        const updatedScore = calculateScore(elapsedTime);

        // Update the score state with the calculated score
        setScore(updatedScore);

        setGameState(2);
      }, 1000);
    }
    if (historyCardClick.length >= 2) {
      setEnableCardClick(false);
      if (
        historyCardClick[historyCardClick.length - 1].id ===
        historyCardClick[historyCardClick.length - 2].id
      ) {
        setScore(score + 1);
        setHistoryCardClick([]);
        setEnableCardClick(true);
      } else {
        setTimeout(() => {
          setScore(score - 1);
          const clonedSelectedCards = _.cloneDeep(selectedCards);
          clonedSelectedCards[
            historyCardClick[historyCardClick.length - 1].index
          ] = false;
          clonedSelectedCards[
            historyCardClick[historyCardClick.length - 2].index
          ] = false;
          setSelectedCards(clonedSelectedCards);

          setHistoryCardClick([]);
          setEnableCardClick(true);
        }, 500);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    const lsUserName = localStorage.getItem("username");
    setLoginInput(lsUserName ? lsUserName : "");
    if (lsUserName) {
      setGameState(3);
    }

    let pairedCards = imageData.cards.concat(imageData.cards);
    shuffleArray(pairedCards);
    setShuffledData(pairedCards);

    const clonedSelectedCards = [];
    pairedCards.forEach(() => {
      clonedSelectedCards.push(false);
    });
    setSelectedCards(clonedSelectedCards);
  }, []);
  const setDifficulty = (difficulty) => {
    // let pairedCards = imageData.cards.concat(imageData.cards);
    let pairedCards;
    if (difficulty == 1) {
      pairedCards = imageData.cards.concat(imageData.cards);
    }
    if (difficulty == 2) {
      pairedCards = imageData2.cards.concat(imageData2.cards);
    }
    if (difficulty == 3) {
      pairedCards = imageData3.cards.concat(imageData3.cards);
    }
    shuffleArray(pairedCards);
    setShuffledData(pairedCards);

    const clonedSelectedCards = [];
    pairedCards.forEach(() => {
      clonedSelectedCards.push(false);
    });
    setSelectedCards(clonedSelectedCards);
  };
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
                    }}
                  />
                </Box>

                <Typography
                  level="h1"
                  textAlign="center"
                  sx={{
                    color: "white",
                    fontSize: "28px",
                    display: "inline-block",
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
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        if (loginInput.length > 0) {
                          setGameState(1);
                        }
                      }
                    }}
                  ></TextField>
                  <div>
                    {console.log(loginInput)}
                    <Button
                      sx={{
                        color: "white",
                        fontFamily: "Quadrat",
                        fontSize: "20px",
                        "& .MuiInput-underline": {
                          fontFamily: "Quadrat",
                        },
                        transition: "transform 0.4s ease, color 0.3s ease",
                        "&:hover": {
                          transform:
                            loginInput?.length == 0 ? "scale(1)" : "scale(1.3)",
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
          <>
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

                  <Typography level="h4" sx={{ color: "white" }}>
                    Ready to test your memory?
                  </Typography>

                  <Typography
                    level="h3"
                    sx={{ color: "white", paddingTop: "20px" }}
                  >
                    Elapsed Time: {elapsedTime} seconds
                  </Typography>
                  <Typography level="h4" sx={{ color: "white" }}>
                    Note: The time in which you complete the level will affect
                    your score. Good luck!
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Typography level="h4" sx={{ color: "white", mr: "5px" }}>
                      Not you?
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "white",
                        fontFamily: "Quadrat",
                        fontSize: "15px",
                        overflow: "hidden",
                        boxSizing: "border-box",
                        "& .MuiInput-underline": {
                          fontFamily: "Quadrat",
                        },
                        transition: "transform 0.4s ease, color 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.2)",
                          backgroundColor: "transparent",
                        },
                      }}
                      size="md"
                      onClick={() => {
                        setLoginInput("");
                        localStorage.clear();
                        setGameState(0);
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  marginTop: "20px",
                  cursor: "pointer",
                  color: "white",
                  fontFamily: "Quadrat",
                  fontSize: "20px",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  "& .MuiInput-underline": {
                    fontFamily: "Quadrat",
                  },
                  transition: "transform 0.4s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.3)",
                  },
                }}
                size="md"
                onClick={() => {
                  setGameState(3);
                  stopTimer();
                }}
              >
                Change difficulty
              </Button>
            </Box>
          </>
        )}
        {gameState == 2 && (
          <Box
            id="gameOverComponent"
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Grid
              py={2}
              px={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                level="h3"
                sx={{ color: "white", textAlign: "center" }}
              >
                Congratulations on completing the game!
              </Typography>
              <Typography
                level="h4"
                sx={{ color: "white", textAlign: "center" }}
              >
                Your score is: {score} !
              </Typography>
              <Button
                onClick={() => {
                  let resetArray = _.cloneDeep(shuffledData);
                  shuffleArray(resetArray);
                  setShuffledData(resetArray);

                  const clonedSelectedCards = [];
                  resetArray.forEach(() => {
                    clonedSelectedCards.push(false);
                  });
                  setSelectedCards(clonedSelectedCards);
                  setGameState(1);
                }}
                sx={{
                  marginTop: "20px",
                  cursor: "pointer",
                  color: "white",
                  fontFamily: "Quadrat",
                  fontSize: "20px",
                  "& .MuiInput-underline": {
                    fontFamily: "Quadrat",
                  },
                  transition: "transform 0.4s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.3)",
                  },
                }}
                size="md"
              >
                Replay level
              </Button>
              <Button
                onClick={() => {
                  setGameState(3);
                }}
                sx={{
                  marginTop: "20px",
                  cursor: "pointer",
                  color: "white",
                  fontFamily: "Quadrat",
                  fontSize: "20px",
                  "& .MuiInput-underline": {
                    fontFamily: "Quadrat",
                  },
                  transition: "transform 0.4s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.3)",
                  },
                }}
                size="md"
              >
                Start new game{" "}
              </Button>
            </Grid>
          </Box>
        )}
        {gameState == 3 && (
          <ChooseDifficulty
            setDifficulty={setDifficulty}
            setGameState={setGameState}
          />
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
