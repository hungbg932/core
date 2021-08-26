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
  { field: 'date', headerName: 'Date', width: 160 },
  { field: 'blocking_summary', headerName: 'Blocking summary', width: 300 },
  { field: 'user_name', headerName: 'Created by', width: 250 },
  { field: 'created_at', headerName: 'Created at', width: 160 },
  { field: 'team_name', headerName: 'Team', width: 300 }
];

function DanhSachBaoCao(props) {
  const [from, setFrom] = useState(moment().format('YYYY-MM-DD'));
  const [to, setTo] = useState(moment().format('YYYY-MM-DD'));
  const [keywords, setKeywords] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [find, setFind] = useState(false);
  
  React.useEffect(() => {
    onRefresh();
  }, []);
  
  const classes = useStyles();
  
  const onChangeFrom = (event) => {
    setFrom(event.target.value);
  };
  
  const onChangeTo = (event) => {
    setTo(event.target.value);
  };
  
  const onChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };
  
  const onSearch = () => {
    !find && setFind(true);
    let data = [...props.report_list.data];
    if(data.length > 0) {
      let _from = moment(from);
      let _to = moment(to);
      if(_from > _to) {
        _from = moment(to);
        _to = moment(from);
      }
      const search = data.filter(item => {
        return (item.date &&  moment(item.date) >= _from.startOf('day') && moment(item.date) <= _to.endOf('day')) || (keywords && item.blocking_summary && (item.blocking_summary.indexOf(keywords) > -1 || keywords.indexOf(item.blocking_summary) > -1));
      });
      setDataSource(search);
    }
  };
  
  const onRefresh = () => {
    setFrom(moment().format('YYYY-MM-DD'));
    setTo(moment().format('YYYY-MM-DD'));
    setKeywords("");
    setDataSource([]);
    setFind(false);
    const userInfor = JSON.parse(window.sessionStorage.getItem('userInfor'));
    props.getPartial(userInfor.team_id);
  };
  
  const listReport = find? dataSource : props.report_list.data;
  return (
    <div style={{ height: 600, width: '100%' }}>
      <div className={classes.filterDiv}>
        <TextField value={keywords} onChange={onChangeKeywords} style={{ width: '40%' }} size="small" id="filled-basic" label="Tìm kiếm" variant="filled" />
        <TextField
          id="from"
          onChange={onChangeFrom}
          label="Từ ngày"
          type="date"
          value={from}
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="to"
          onChange={onChangeTo}
          label="Đến ngày"
          type="date"
          value={to}
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
        pageSize={20}
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
    getPartial: (teamId) => {
      dispatch(reportActions.getPartial(teamId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachBaoCao);