import React, { useState, useEffect } from 'react';
import userApi from '../../../api/userApi';
import teamApi from '../../../api/teamApi';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Button, TextField, ButtonGroup } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import { Modal } from '@material-ui/core';
import Create from './Create';
import Update from './Update';

const useStyles = makeStyles((theme) => ({
  refreshBtn: {
    width: 150,
    marginLeft: '20px'
  },
  filterDiv: {
    marginBottom: '15px'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function UserList() {
  
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
    {
      field: 'function',
      headerName: 'Chức năng',
      description: 'Chức năng',
      sortable: false,
      width: 200,
      renderCell: (params) => <Button color="secondary" onClick={() => HandleEdit(params.row)}>Sửa</Button>
    },
  ];

  const HandleEdit = async(row) => {
    const response = await userApi.detail(row.id);
    setDetail(response);
    setVisibleUpdateModal(true);
  }

  const [users, setUserList] = useState([]);
  const [teams, setTeams] = useState([]);
  const [detail, setDetail] = useState([]);
  const [keywords, setKeywords] = useState("");
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
  
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
  
  const onChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };
  
  const onSearch = () => {
    setFilters({
      ...filters,
      keywords: keywords,
    });
  };
  
  const onRefresh = () => {
    setFilters({
      ...filters,
      keywords: keywords,
    });
  }
  
  const showCreateModal = () => {
    setVisibleCreateModal(true);
  };

  const closeCreateModal = () => {
    setVisibleCreateModal(false);
  };
  
  const closeUpdateModal = () => {
    setVisibleUpdateModal(false);
  };
  
  const [modalStyle] = React.useState(getModalStyle);
  
  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      page: newPage + 1,
    });
  }
  
  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await userApi.getPartial(filters);
        const { data, pagination } = response;
        setUserList(data);
        setPagination(pagination);
        
        const listTeam = await teamApi.getAll();
        setTeams(listTeam);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }

    fetchUserList();
  }, [filters]);
  
  const classes = useStyles();
  
  return (
    <div style={{ height: 600, width: '100%' }}>
      <div className={classes.filterDiv}>
        <TextField value={keywords} onChange={onChangeKeywords} style={{ width: '40%' }} size="small" id="filled-basic" label="Tìm kiếm" variant="filled" />
        <Button type="submit" size="large" className={classes.refreshBtn} onClick={() => onSearch()} variant="contained" startIcon={<SearchIcon />}>Tìm</Button>
        <Button type="submit" size="large" className={classes.refreshBtn} onClick={() => showCreateModal()} variant="contained" startIcon={<AddIcon />}>Thêm mới</Button>
        <Button type="submit" size="large" className={classes.refreshBtn} onClick={() => onRefresh()} variant="contained" startIcon={<RefreshIcon />}>Làm mới</Button>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={pagination.limit}
        rowsPerPageOptions={[pagination.limit]}
        rowCount={pagination.totalRecord}
        paginationMode="server"
        onPageChange={(newPage) => handlePageChange(newPage)}
      />
      
      <Modal
        open={visibleCreateModal}
        onClose={closeCreateModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Create onRefresh={onRefresh} teams={teams}/>
        </div>
      </Modal>
      <Modal
        open={visibleUpdateModal}
        onClose={closeUpdateModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Update onRefresh={onRefresh} detail={detail} teams={teams}/>
        </div>
      </Modal>
    </div>
  );
}

export default UserList;