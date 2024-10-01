import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../components/Header';
import { Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { participantsListData } from '../store/participantsSlice';


export default function ParticipantsList() {
  const participantsList = useSelector(participantsListData);

  return (
    <>
    <Header />
    <Container maxWidth="lg">
      {participantsList.length === 0 ?(
      <Stack sx={{justifyContent:"center", alignItems:"center", height:"50vh"}}>
        <h5>No data availanle</h5>
      </Stack>):(
    <TableContainer component={Paper} sx={{ mt: "100px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {/* <TableCell>ima</TableCell> */}
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Mo. No.</TableCell>
            <TableCell align="center">Attending</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participantsList.map((row) => (
            <TableRow
              key={row.firstName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell><img src={row.profileImage}/></TableCell> */}
              <TableCell align="left">{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="center">{row.attending}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    </Container>
    </>
  );
}
