import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import "@fontsource/roboto/500.css";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";
const WEB_URL = "https://jsonplaceholder.typicode.com/users";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function App() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(WEB_URL);
      const data = await rawData.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <TableContainer component={Paper} style={{ margin: "10px auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">PhoneNo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="center">{data.username}</TableCell>
                <TableCell align="center">{data.email.toLowerCase()}</TableCell>
                <TableCell align="center">{data.phone}</TableCell>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon style={{ color: "red" }} />
                </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography>
                    <strong>Address:</strong>
                  </Typography>
                  <Typography>{data.address.street}</Typography>
                  <Typography>{data.address.suite}</Typography>
                  <Typography>{data.address.city}</Typography>
                  <Typography>{data.address.zipcode}</Typography>
                  <br />
                  <Typography>
                    <strong>Website:</strong>
                  </Typography>
                  <Typography>{data.website}</Typography>
                  <br />
                  <Typography>
                    <strong>Company:</strong>
                  </Typography>
                  <Typography>{data.company.name.toUpperCase()}</Typography>
                  <Typography>{data.company.catchPhrase}</Typography>
                  <Typography>{data.company.bs}</Typography>
                </Collapse>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
