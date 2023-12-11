import { Card } from "@mui/material";
const Brands = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center" onClick={props.onClick}>
      <Card
        sx={{
          width: props.width,
          height: props.height,
          display: "grid",
          placeContent: "center",
        }}
        className={`brands ${props.className} `}
      >
        <div className="text-center">
          <img src={props.img} width={50} className="mb-1" />
          <p className="text-uppercase f-10 mb-0">{props.brands}</p>
        </div>
      </Card>
    </div>
  );
};

export default Brands;
