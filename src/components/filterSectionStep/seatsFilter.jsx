import { getCars } from "@/api/apiCalling/listingApi";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const SeatsFilter = ({
  specification,
  setCarData,
  setFilters,
  setLoading,
  page,
  pageSize,
  filters,
}) => {
  const user = useSelector((state) => state.userInfo);
  const handleSeatsChange = (e, newValue) => {
    setLoading(true);
    setFilters({ ...filters, seats: newValue });
    let body = user
      ? {
          userId: user.id,
          seats: newValue,
        }
      : {
          seats: newValue,
        };
    getCars({ loading: setLoading, setCarData, page, pageSize, body });
  };
  return (
    <div>
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Seats"
            sx={{
              fontSize: 13,
              "& label": {
                fontSize: 13,
                top: 5,
              },
            }}
          />
        )}
        options={specification.seats}
        onChange={handleSeatsChange}
      />
    </div>
  );
};

export default SeatsFilter;
