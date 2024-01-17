import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useState } from "react";

function CardComponent({ cardData, isSelected, onClick }) {
  const { id, imageUrl, disabled } = cardData;
  const defaultImageUrl =
    "https://assets.mycast.io/posters/baldur-s-gate-3-fan-casting-poster-389892-large.jpg?1697159724";

  return (
    <Card
      sx={{
        minHeight: { xs: "210px", sm: "280px" },
        width: { xs: "150px", sm: "200px" },
        marginRight: "15px",
        cursor: "pointer",
      }}
      onClick={!disabled && onClick}
    >
      <CardCover>
        {isSelected ? (
          <img
            src={imageUrl}
            loading="lazy"
            alt={`Card ${id}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            src={defaultImageUrl}
            loading="lazy"
            alt={`Card ${id}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </CardCover>
    </Card>
  );
}

export default CardComponent;
