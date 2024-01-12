import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useState } from "react";

function CardComponent({ cardData, isSelected, onClick }) {
  const { id, imageUrl, disabled } = cardData;
  const defaultImageUrl =
    "https://m.media-amazon.com/images/M/MV5BMWVlMDdhNzYtNDY5ZS00YzdiLWI3NWEtMDUzMGQyMWQ2NDY3XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_FMjpg_UX1000_.jpg";

  return (
    <Card
      sx={{
        minHeight: "280px",
        width: 200,
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
