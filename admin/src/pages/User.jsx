import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { allusersforadmin } from "../context/features/userSlice"
import URLBASE from '../constant/urlbase';
import moment from "moment"; 
import UsersActions from "../component/UserActions";

const User = () => {
const dispatch = useDispatch();
const { allusers } = useSelector((state) => ({
    ...state.user,
  }));

const memoizedUsers = useMemo(() => allusers, [allusers]);

const [pageSize, setPageSize] = useState(10);
const [rowId, setRowId] = useState(null);

useEffect(() => {
    dispatch(allusersforadmin());
  }, [dispatch]);



  const columns = useMemo(
    () => [
      {
        field: 'profilePic',
        headerName: 'Avatar',
        width: 60,
        renderCell: (params) => <Avatar src={`${URLBASE.imageBaseUrl}${params.row.profilePic}`} />,
        sortable: false,
        filterable: false,
      },
      { field: 'fullname', headerName: 'Name', width: 150 },
      { field: 'username', headerName: 'Username', width: 120 },
      { field: 'phone_no', headerName: 'Phone No.', width: 150 },
      {
        field: 'verified',
        headerName: 'Verified',
        width: 100,
        type: 'boolean',
        editable: true,
      },
      {
        field: 'date_joined',
        headerName: 'Created At',
        width: 200,
        renderCell: (params) =>
          moment(params.row.date_joined).format('YYYY-MM-DD HH:MM:SS'),
      },
      { field: 'id', headerName: 'Id', width: 50 },
      { field: 'city', headerName: 'Location', width: 150,  editable: true, },
      { field: 'gender', headerName: 'Gender', width: 80 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
        <UsersActions {...{ params, rowId, setRowId }} />
        
        ),
      },
    ],
    [rowId]
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyItems: "center",
      }}
    >
      <Typography
        component="h4"
        color="secondary.dark"
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Manage Users
      </Typography>

    {memoizedUsers ? (
      <DataGrid
        columns={columns}
        rows={memoizedUsers}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[10, 20, 30]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: "white",
          },
          marginTop:5
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
        onCellClick={(params) => setRowId(params.id)}
        
      />
): null }
    </Box>
  );
};

export default User;
