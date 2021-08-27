import React, { useState } from "react";
import { connect } from 'react-redux';
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import APPCONFIG from '../../constant/appConfig';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import ChangeAlias from '../ChangeAlias';
import * as reportActions from '../../actions/reportActions';

const SU_DUNG = 0;
const TRANG_THAI_DUYET = 2;
const ROLE_ID_ADMIN = 1;

const useStyles = makeStyles(theme => ({
    pageWrapper: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: '5px'
    },
    boxWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3)
    },
    textWelcome: {
        ...theme.custom.fontFamily.metropolis,
        textAlign: 'center'
    }
}));

function Report (props) {
    const classes = useStyles();
    const [date, setDate] = useState(moment());
    const [yesterdaySummary, setYesterdaySummary] = useState("");
    const [todaySummary, setTodaySummary] = useState("");
    const [blockingSummary, setBlockingSummary] = useState("");
    const [relatedTasks, setRelatedTasks] = useState("");
    const [other, setOther] = useState("");
    const [listReport, setListReport] = useState([]);
    const [detail, setDetail] = useState({});
    const [fromDate, setFromDate] = useState(moment().subtract(1, 'months'));
    const [toDate, setToDate] = useState(moment());
    const [keyword, setKeyword] = useState('');
    const [roleId, setRoleId] = useState(0);
    const [userId, setUserId] = useState(0);
    
    React.useEffect(() => {
      getListData();
      const user = JSON.parse(sessionStorage.getItem('user'));
      setRoleId(user.role_id);
      setUserId(user.user_id);
    }, []);
    
    const getListData=()=>{
      let params = {
        from_date: moment(fromDate).format('YYYY-MM-DD'),
        to_date: moment(toDate).format('YYYY-MM-DD')
      };
      
      props.getReportByFilter(params);
    }
    
    const getDetail = (id) =>{
      axios.post(`${APPCONFIG.apiUri}report/find/${id}`).then((response) => {
        setDataDetail(response.data);
      });
    }
    
    const setDataDetail=(data)=>{
        setDetail(data);
        setDate(data.date||new Date());
        setYesterdaySummary(data.yesterday_summary||'');
        setTodaySummary(data.today_summary||'');
        setBlockingSummary(data.blocking_summary||'');
        setRelatedTasks(data.related_tasks||'');
        setOther(data.other||'');
    }
    
    const doSubmit = () =>{
      let params = {
        date: moment(date).format('YYYY-MM-DD'), 
        yesterday_summary: yesterdaySummary, 
        today_summary: todaySummary, 
        blocking_summary: blockingSummary, 
        related_tasks: relatedTasks, 
        other};
      if(detail.id) {
        params = {...params, verified_by: userId};
      }
      else {
        params = {...params, created_by: userId};
      }
      
      if(detail.id){
        props.updateReport(detail.id, params);
      }
      else{
        props.createReport(params);
      }
      
    }
    
    const onSubmitClick = (event) => {
        event.preventDefault();
        doSubmit();
    }
    
    const onDelete = (event) => {
        event.preventDefault();
        if(window.confirm("Xác nhận xóa?")){//dung tam confirm
          props.deleteReport(detail.id);
        }
    }
    
    React.useEffect(() => {
      filterData(keyword);
    }, [props.listByFilter]);
    
    React.useEffect(() => {
      if(props.createResult.data.id){
        alert("Created!");//dung tam alert
        setDataDetail({});
        getListData();
      }
    }, [props.createResult]);
    
    React.useEffect(() => {
      if(props.updateResult.data.id){
        alert("Updated!");//dung tam alert
        setDataDetail({});
        getListData();
      }
    }, [props.updateResult]);
    
    React.useEffect(() => {
      if(props.deleteResult.data.id){
        alert("Deleted!");//dung tam alert
        setDataDetail({});
        getListData();
      }
    }, [props.deleteResult]);
    
    const filterData = (keyValue) =>{
      let dataFilter = props.listByFilter.data;
      if(keyValue){
        dataFilter = dataFilter.filter(f=>ChangeAlias(f.created_by_name).toLowerCase().indexOf(ChangeAlias(keyValue).toLowerCase())>=0);
      }
      setListReport(dataFilter);
    }
    
    const onChangeKeyword = (event) => {
      setKeyword(event.target.value);
      filterData(event.target.value);
    };
    
    const onApprove = (event) => {
        event.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const params = {
          verified_by: user.user_id,
          status: TRANG_THAI_DUYET};
        
        props.updateReport(detail.id, params);
    }
    
    return (
        <div className={classes.pageWrapper}>
          <div style={{width: '100%'}}>
            <div style={{width: '30%', float: 'left'}}>
              <Paper elevation={3} style={{width: '100%'}}>
                <div style = {{width: '100%', padding: '10px 10px 0 10px'}}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Từ ngày"
                      value={fromDate}
                      onChange={e=>setFromDate(e)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      style={{marginTop: '0px', width: '50%'}}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Đến ngày"
                      value={toDate}
                      onChange={e=>setToDate(e)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      style={{marginTop: '0px', width: '50%'}}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField placeholder="Tìm kiếm" style={{width: '70%'}} onChange={onChangeKeyword}/>
                  <Button type="submit" size="small" onClick={() => getListData()} variant="contained" startIcon={<SearchIcon />}
                        style={{width: '30%'}} >Tìm</Button>
                </div>
                
                <List component="nav" aria-label="secondary mailbox folders">
                  {
                    listReport.map(item=>{
                      return  <ListItem button style={{backgroundColor: detail.id === item.id ? '#feefc3' : ''}}>
                                <ListItemText primary={<div>
                                                          <div style={{width: '100px', float: 'left'}}>{moment(item.date).format('DD/MM/YYYY')}</div>
                                                          <div>{item.created_by_name}</div>
                                                          <div style={{position: 'absolute', right: '3px', top: '8px'}}>{item.status === TRANG_THAI_DUYET ? <DoneIcon /> : ""}</div>
                                                      </div>} 
                                onClick={()=>getDetail(item.id)} />
                              </ListItem>
                    })
                  }
                </List>
              </Paper>
            </div>
            <div style={{width: '70%', float: 'left', paddingLeft: '5px'}}>
              <Paper elevation={3} style={{width: '100%'}}>
                  <form className={classes.boxWrapper} onSubmit={onSubmitClick} style={{paddingTop: '10px'}}>
                      <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Daily Report</Typography>
                      <label style={{alignSelf: 'flex-start'}}>Date</label>
                      <div style={{width: '100%'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            // label="Date picker inline"
                            value={date}
                            onChange={e=>setDate(e)}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            style={{marginTop: '0px'}}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                      <label style={{alignSelf: 'flex-start'}}>Yesterday summary</label>
                      <TextareaAutosize minRows={3} value={yesterdaySummary} onChange={event => setYesterdaySummary(event.target.value)} placeholder="yesterday summary" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Today summary</label>
                      <TextareaAutosize minRows={3} value={todaySummary} onChange={event => setTodaySummary(event.target.value)} placeholder="today summary" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Blocking summary</label>
                      <TextareaAutosize minRows={3} value={blockingSummary} onChange={event => setBlockingSummary(event.target.value)} placeholder="blocking summary" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Related tasks</label>
                      <TextareaAutosize minRows={3} value={relatedTasks} onChange={event => setRelatedTasks(event.target.value)} placeholder="related tasks" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Other</label>
                      <TextareaAutosize minRows={3} value={other} onChange={event => setOther(event.target.value)} placeholder="other" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <div style={{width: '100%'}}>
                      <Button type="submit" size="large" onClick={(e) => onSubmitClick(e)} variant="contained" startIcon={<SaveIcon />}
                        disabled={(yesterdaySummary === "" && todaySummary === "" && blockingSummary === "" && relatedTasks === "" && other === "") || date === null 
                          || (detail.id && detail.status !== SU_DUNG) || (detail.created_by && detail.created_by !== userId)} >Save</Button>
                      <Button type="submit" size="large" onClick={(e) => onDelete(e)} variant="contained" startIcon={<DeleteIcon />}
                        disabled={!detail.id || detail.status !== SU_DUNG || (detail.created_by && detail.created_by !== userId)} style={{marginLeft: '5px'}}>Delete</Button>
                      <Button type="submit" size="large" onClick={() => setDataDetail({})} variant="contained" startIcon={<CancelIcon />}
                        disabled={yesterdaySummary === "" && todaySummary === "" && blockingSummary === "" && relatedTasks === "" && other === ""} style={{marginLeft: '5px'}} >Cancel</Button>
                      {roleId === ROLE_ID_ADMIN &&
                        <Button type="submit" size="large" onClick={(e) => onApprove(e)} variant="contained" startIcon={<DoneIcon />}
                          disabled={!detail.id || detail.status !== SU_DUNG} style={{marginLeft: '5px'}}>Approve</Button>
                      }
                      </div>
                  </form>
              </Paper>
            </div>
          </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    listByFilter: state.report.listByFilter,
    createResult: state.report.createResult,
    updateResult: state.report.updateResult,
    deleteResult: state.report.deleteResult
  };
};

const mapDispatchToProps = (dispatch) =>  {
  return {
    getReportByFilter: (params) => {
      dispatch(reportActions.getReportByFilter(params));
    },
    createReport: (params) => {
      dispatch(reportActions.createReport(params));
    },
    updateReport: (id, params) => {
      dispatch(reportActions.updateReport(id, params));
    },
    deleteReport: (params) => {
      dispatch(reportActions.deleteReport(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);