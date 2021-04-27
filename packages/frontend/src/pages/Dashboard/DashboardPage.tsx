import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Timer } from './components/Timer';
import { Tracking } from './components/Tracking';
import {  withStyles, Theme, createStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { green } from '@material-ui/core/colors';
import { Modal } from '../../components/Modal';
import { AddtrackingManual } from './components/Addtrackmanual';
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);
const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
const SortButton = styled.button`
  font-size: 25px;
  display: block;
  width: 100%;
  border: none;
  background-color: #009879;
  color: #1c1818;
  padding: 14px 28px;
  cursor: pointer;
  text-align: center;
  :hover {
    background-color: #5e7391;
  }
`;
export const AddingButton = styled.button`
   {
    font-size: 20px;
    background-color: #009879;
    color: #1c1818;
    float: right;
    height: 40px;
    border-radius: 4px;
    width: 150px;
    margin-right: 5px;
    text-align: center;
    cursor: pointer;
    :hover {
      background-color: #03d3fc;
    }
  }
`;


export const DashboardPage = () => {
    const [page, setPage] = useState(0);
    const [trackings, setTrackings] = useState<Tracking[]>([]);
    const [addtrack, setAddtrack] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [sortConfig, setsortConfig] = useState({
        key: '',
        direction: '',
    });
    const sortedTracks = React.useMemo(() => {
        const sortedTracks = [...trackings];
        if (sortConfig !== null) {
            sortedTracks.sort((a: any, b: any): any => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortedTracks;
      }, [trackings, sortConfig]);
    
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setsortConfig({ key, direction });
    };
    
    const sorticon = (keye: string) => {
        if (sortConfig.key === keye && sortConfig.direction === 'ascending') {
          return (
            <span>
              <ArrowDownwardIcon style={{ color: green[500], fontSize: '30' }} />
            </span>
          );
        }
        if (sortConfig.key === keye && sortConfig.direction === 'descending') {
          return (
            <span>
              <ArrowUpwardIcon style={{ color: green[500], fontSize: '30' }} />
            </span>
          );
        }
      };
    
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
        <Timer aftersubmit = {() => {
            fetchTracks();
        }}/>
    <AddingButton
        data-testid="AddTaskButton"
        onClick={() => {
            setAddtrack(true);
        }}
    >
        AddingManual
    </AddingButton>
    {addtrack && (
        <Modal
          title="ADD TASK"
          onCancel={() => {
            setAddtrack(false);
          }}
        >
          <AddtrackingManual
            afterSubmit={() => {
            setAddtrack(false);
            fetchTracks();
            }}
          />
        </Modal>
      )}


    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell> 
            <SortButton type="button" onClick={() => requestSort('description')}>
                Description {sorticon('description')}
            </SortButton>
            </StyledTableCell>
            <StyledTableCell align="right">
            <SortButton type="button" onClick={() => requestSort('startTime')}>
                StartTime {sorticon('startTime')}
            </SortButton>
            </StyledTableCell>
            <StyledTableCell align="right">
            <SortButton type="button" onClick={() => requestSort('endTime')}>
                EndTime {sorticon('endTime')}
            </SortButton>
            </StyledTableCell>
            <StyledTableCell align="center"> 
            <SortButton type="button" onClick={() => requestSort('createdAt')}>
            TimestampCreated {sorticon('createdAt')}
            </SortButton>
            </StyledTableCell>
            <StyledTableCell align="right"><SortButton type="button" onClick={() => requestSort('updatedAt')}>
            TimestampUpdated {sorticon('updatedAt')}
            </SortButton></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {sortedTracks
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((tracking) => (
            <StyledTableRow key={tracking.id}>
              <StyledTableCell align="center">{tracking.description}</StyledTableCell>
              <StyledTableCell align="center">{tracking.startTime.substring(0,8)}</StyledTableCell>
              <StyledTableCell align="center">{tracking.endTime.substring(0,8)}</StyledTableCell>
              <StyledTableCell align="center">{tracking.createdAt}</StyledTableCell>
              <StyledTableCell align="center">{tracking.updatedAt}</StyledTableCell>
            </StyledTableRow>
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
