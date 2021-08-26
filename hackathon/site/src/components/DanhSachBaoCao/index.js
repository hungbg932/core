import React, { useState } from "react";
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as reportActions from '../../actions/reportActions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  refreshBtn: {
    width: 150,
    marginLeft: '20px'
  },
  filterDiv: {
    marginBottom: '15px'
  }
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'date', headerName: 'Date', width: 160 ,
    valueGetter: (params) =>
      params.value ? moment(params.value).format('HH:mm DD/MM/YYYY') : ''
  },
  { field: 'blocking_summary', headerName: 'Blocking summary', width: 300 },
  { field: 'user_name', headerName: 'Created by', width: 250 },
  { field: 'created_at', headerName: 'Created at', width: 160 ,
    valueGetter: (params) =>
      params.value ? moment(params.value).format('HH:mm DD/MM/YYYY') : ''
  },
  { field: 'team_name', headerName: 'Team', width: 300 }
];

function DanhSachBaoCao(props) {
  const user = JSON.parse(window.sessionStorage.getItem('user')); 
  const [filters, setFilters] = useState({
    teamId: user.team_id,
    from: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD'),
    keywords: "",
    limit: 20,
    page: 1,
    totalRecord: 0
  });
  const [find, setFind] = useState(false);
  
  React.useEffect(() => {
    props.getPartial(filters);
  }, [find]);
  
  React.useEffect(() => {
    if(props.report_list.status) {
      setFilters({
        ...filters,
        totalRecord: props.report_list.conditions.totalRecord
      });
      props.resetStatusReportList();
    }
  }, [props.report_list.status]);
  
  const classes = useStyles();
  
  const onChangeDate = (value, key) => {
    if(key === 'from') {
      setFilters({...filters, from: value});
    }
    if(key === 'to') {
      setFilters({...filters, to: value});
    }
  };
  
  const onChangeKeywords = (event) => {
    setFilters({...filters, keywords: event.target.value});
  };
  
  const handlePageChange = (newPage) => {
    setFilters({...filters, page: newPage + 1});
  };
  
  const onSearch = () => {
    setFind(!find);
  };
  
  const onRefresh = () => {
    const params = {
      ...filters,
      from: moment().subtract(1, 'months').format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
      keywords: "",
      page: 1
    };
    setFilters(params);
    props.getPartial(params);
  };
  
  const listReport = props.report_list.data;
  return (
    <div style={{ height: 600, width: '100%' }}>
      <div className={classes.filterDiv}>
        <TextField value={filters.keywords} onChange={onChangeKeywords} style={{ width: '40%' }} size="small" id="filled-basic" label="Tìm kiếm" variant="filled" />
        <TextField
          id="from"
          onChange={(value)=> onChangeDate(value, 'from')}
          label="Từ ngày"
          type="date"
          value={filters.from}
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="to"
          onChange={(value)=> onChangeDate(value, 'to')}
          label="Đến ngày"
          type="date"
          value={filters.to}
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" size="large" className={classes.refreshBtn} onClick={() => onSearch()} variant="contained" startIcon={<SearchIcon />}>Tìm</Button>
        <Button type="submit" size="large" className={classes.refreshBtn} onClick={() => onRefresh()} variant="contained" startIcon={<RefreshIcon />}>Làm mới</Button>
      </div>
      <DataGrid
        rows={listReport}
        columns={columns}
        pageSize={filters.limit}
        rowsPerPageOptions={[filters.limit]}
        rowCount={filters.totalRecord}
        paginationMode="server"
        onPageChange={(newPage) => handlePageChange(newPage)}
        disableSelectionOnClick
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    report_list: state.report.list
  };
};

const mapDispatchToProps = (dispatch) =>  {
  return {
    getPartial: (params) => {
      dispatch(reportActions.getPartial(params));
    },
    resetStatusReportList: () => {
      dispatch(reportActions.resetStatusReportList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachBaoCao);