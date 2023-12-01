import { Card } from "@mui/material";
const Brands = (props) => {
  return (
    <div>
      <Card
        sx={{
          width: "95px",
          height: "80px",
          display: "grid",
          placeContent: "center",
        }}
        className="brands"
      >
        <div className="text-center">
          <img src={props.img} width={50} className="mb-1"/>
          <p className="text-uppercase f-12 mb-0">{props.brands}</p>
        </div>
      </Card>
    </div>
  );
};

export default Brands;
