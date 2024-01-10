import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

function CardComponent({ cardData }) {
  const { id, imageUrl } = cardData;

  return (
    <Card sx={{ minHeight: "280px", width: 200, marginRight: "15px" }}>
      <CardCover>
        <img
          src={imageUrl}
          loading="lazy"
          alt={`Card ${id}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </CardCover>
      <CardContent>
        <Typography level="body-lg" fontWeight="lg" textColor="#fff">
          Card {id}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
