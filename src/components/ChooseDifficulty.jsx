import { Grid, Typography, Box, Button } from "@mui/joy";
import Badge1 from "../images/badge1.png";
import Badge2 from "../images/badge2.png";
import Badge3 from "../images/badge3.png";
import BG1 from "../images/bg1.jpg";
import BG2 from "../images/bg2.jpg";
import BG3 from "../images/bg3.jpg";
import { useState } from "react";

function ChooseDifficulty({ setDifficulty, setGameState }) {
  const [difficultyState, setDifficultyState] = useState(0);
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid
        sx={{
          mt: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {difficultyState == 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${BG1})`,
              textAlign: "center",
              borderRadius: "25px",
              padding: "20px",
              height: "400px",
              mr: "100px",
            }}
          >
            <Typography
              level="h2"
              sx={{ color: "white", fontSize: "25px", mb: "10px" }}
            >
              The Fearful level
            </Typography>
            <Typography
              sx={{
                width: "350px",
                color: "white",
              }}
            >
              The Fearful level is the easiest difficulty setting, suitable for
              beginners. In this level, you'll encounter a small number of
              cards, making it easier to remember their positions and match
              them.
            </Typography>
          </Box>
        )}
        {difficultyState == 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${BG2})`,
              textAlign: "center",
              borderRadius: "25px",
              padding: "20px",
              height: "400px",
              mr: "100px",
            }}
          >
            <Typography
              level="h2"
              sx={{ color: "white", fontSize: "25px", mb: "10px" }}
            >
              The Incubus level
            </Typography>
            <Typography
              sx={{
                width: "350px",
                color: "white",
                textAlign: "center",
              }}
            >
              The Incubus level is of moderate difficulty, offering a challenge
              for players with some experience. This level features a medium
              number of cards, requiring more concentration and memory skills to
              match them efficiently
            </Typography>
          </Box>
        )}
        {difficultyState == 2 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${BG3})`,
              textAlign: "center",
              borderRadius: "25px",
              padding: "20px",
              height: "400px",
              mr: "100px",
            }}
          >
            <Typography
              level="h2"
              sx={{ color: "white", fontSize: "25px", mb: "10px" }}
            >
              The Abyss level
            </Typography>
            <Typography
              sx={{
                width: "350px",
                color: "white",
                textAlign: "center",
              }}
            >
              The Abyss level is the most challenging difficulty setting,
              designed for experienced players seeking a tough challenge. In
              this level, you'll face a large number of cards, testing your
              memory and concentration to the limit.
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "white",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <Box
              id="fearful-difficulty"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => {
                setDifficultyState(0);
                setDifficulty(1);
              }}
            >
              <img
                style={{ height: "350px", cursor: "pointer" }}
                src={Badge1}
                alt="Badge1"
              />
            </Box>
            <Box
              id="incubus-difficulty"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => {
                setDifficultyState(1);
                setDifficulty(2);
              }}
            >
              <img
                style={{ height: "350px", cursor: "pointer" }}
                src={Badge2}
                alt="Badge2"
              />
            </Box>
            <Box
              id="abyss-difficulty"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => {
                setDifficultyState(2);
                setDifficulty(3);
              }}
            >
              <img
                style={{ height: "350px", cursor: "pointer" }}
                src={Badge3}
                alt="Badge3"
              />
            </Box>
          </Box>

          <Button
            sx={{
              backgroundColor: "transparent",
              marginTop: "20px",
              cursor: "pointer",
              color: "white",
              fontFamily: "Quadrat",
              fontSize: "30px",
              overflow: "hidden",
              boxSizing: "border-box",
              "& .MuiInput-underline": {
                fontFamily: "Quadrat",
              },
              transition: "transform 0.4s ease, color 0.3s ease",
              "&:hover": {
                transform: "scale(1.3)",
                backgroundColor: "transparent",
              },
            }}
            size="md"
            onClick={() => {
              setGameState(1);
            }}
          >
            Start
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
export default ChooseDifficulty;
