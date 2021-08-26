import React, { useState, useEffect } from 'react';
import userApi from '../../../api/userApi';

import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'image_url',
    headerName: 'Hình đại diện',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Họ tên',
    width: 300,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 150,
  },
];

function UserList() {
  const [users, setUserList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
    totalRecord: 10,
  });
  
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
  });
  
  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      page: newPage + 1,
    });
  }
  
  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await userApi.getAll(filters);
        const { data, pagination } = response;
        setUserList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }

    fetchUserList();
  }, [filters]);
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={pagination.limit}
        rowsPerPageOptions={[pagination.limit]}
        rowCount={pagination.totalRecord}
        paginationMode="server"
        onPageChange={(newPage) => handlePageChange(newPage)}
      />
    </div>
  );
}

export default UserList;