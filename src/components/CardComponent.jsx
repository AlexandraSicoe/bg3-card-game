import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useState } from "react";
import "../CardGame.css";

function CardComponent({ cardData, isSelected, onClick }) {
  const { id, imageUrl } = cardData;

  const defaultImageUrl =
    "https://assets.mycast.io/posters/baldur-s-gate-3-fan-casting-poster-389892-large.jpg?1697159724";

  const handleDragStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Card
      className={`card ${isSelected ? "flipped" : ""}`}
      sx={{
        minHeight: { xs: "210px", sm: "280px" },
        width: { xs: "150px", sm: "200px" },
        backgroundColor: "transparent",
        marginRight: "15px",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={onClick}
      handleDragStart={handleDragStart}
      mouseDown={handleDragStart}
    >
      <CardCover>
        <div className={`card-inner ${isSelected ? "flipped" : ""}`}>
          <div className="card-front">
            <img
              src={defaultImageUrl}
              loading="lazy"
              alt={`Card ${id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "15px",
                userSelect: "none",
              }}
              handleDragStart={handleDragStart}
              draggable="false"
              mouseDown={handleDragStart}
            />
          </div>
          <div className="card-back">
            <img
              src={imageUrl}
              loading="lazy"
              alt={`Card ${id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "15px",
                userSelect: "none",
              }}
              handleDragStart={handleDragStart}
              draggable="false"
              mouseDown={handleDragStart}
            />
          </div>
        </div>
      </CardCover>
    </Card>
  );
}

export default CardComponent;
