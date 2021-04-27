import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Timer } from './components/Timer';
import { Tracking } from './components/Tracking';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
const HEAD1 = styled.h1`
  {
  text-align: center;
  color: #009879;
  letter-spacing: 3px;
  font-size: 40px;
  }
`;
export const DashboardPage = () => {
    const [page, setPage] = useState(0);
    const [trackings, setTrackings] = useState<Tracking[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    useEffect(() => {
        fetchTracks();
    }, []);
    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

const fetchTracks = async () => {
    const trackrequest = await fetch('/trackings', {
      headers: { 'content-type': 'application/json' },
    });
    if (trackrequest.status === 200) {
      const trackJSON = await trackrequest.json();
      setTrackings(trackJSON.data);
      console.log(trackings)
    }
};
const classes = useStyles();
return ( 
    <div>
        
        <HEAD1>DASHBOARD </HEAD1>
        <Timer aftersubmit = {() => {
            fetchTracks();
        }}/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">startTime</TableCell>
            <TableCell align="right">endTime</TableCell>
            <TableCell align="right">createdAt</TableCell>
            <TableCell align="right">updatedAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trackings
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((tracking) => (
            <TableRow key={tracking.id}>
              <TableCell align="right">{tracking.description}</TableCell>
              <TableCell align="right">{tracking.startTime.substring(0,8)}</TableCell>
              <TableCell align="right">{tracking.endTime.substring(0,8)}</TableCell>
              <TableCell align="right">{tracking.createdAt}</TableCell>
              <TableCell align="right">{tracking.updatedAt}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={trackings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
    </div>
    
)

}
