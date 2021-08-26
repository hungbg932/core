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
import ChangeAlias from '../ChangeAlias';
import * as reportActions from '../../actions/reportActions';

const SU_DUNG = 0;

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
    const [yesterday_summary, setYesterday_summary] = useState("");
    const [today_summary, setToday_summary] = useState("");
    const [blocking_summary, setBlocking_summary] = useState("");
    const [related_tasks, setRelated_tasks] = useState("");
    const [other, setOther] = useState("");
    const [listReport, setListReport] = useState([]);
    const [detail, setDetail] = useState({});
    const [fromDate, setFromDate] = useState(moment().subtract(1, 'months'));
    const [toDate, setToDate] = useState(moment());
    const [keyword, setKeyword] = useState('');
    
    React.useEffect(() => {
      getListData();
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
        setYesterday_summary(data.yesterday_summary||'');
        setToday_summary(data.today_summary||'');
        setBlocking_summary(data.blocking_summary||'');
        setRelated_tasks(data.related_tasks||'');
        setOther(data.other||'');
    }
    
    const doSubmit = () =>{
      const user = JSON.parse(sessionStorage.getItem('user'));
      let params = {date: moment(date).format('YYYY-MM-DD'), yesterday_summary, today_summary, blocking_summary, related_tasks, other};
      if(detail.id) {
        params = {...params, verified_by: user.user_id};
      }
      else {
        params = {...params, created_by: user.user_id};
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
        props.deleteReport(detail.id);
    }
    
    React.useEffect(() => {
      filterData(keyword);
    }, [props.listByFilter]);
    
    React.useEffect(() => {
      if(props.createResult.data.id){
        alert("Created!");
        setDataDetail({});
        getListData();
      }
    }, [props.createResult]);
    
    React.useEffect(() => {
      if(props.updateResult.data.id){
        alert("Updated!");
        setDataDetail({});
        getListData();
      }
    }, [props.updateResult]);
    
    React.useEffect(() => {
      if(props.deleteResult.data.id){
        alert("Deleted!");
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
    
    return (
        <div className={classes.pageWrapper}>
          <div style={{width: '100%'}}>
            <div style={{width: '30%', float: 'left'}}>
              <Paper elevation={3} style={{width: '100%'}}>
                <div style = {{width: '100%', padding: '0 10px 0 10px'}}>
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
                                <ListItemText primary={<div><div style={{width: '100px', float: 'left'}}>{moment(item.date).format('DD/MM/YYYY')}</div><div>{item.created_by_name}</div></div>} 
                                onClick={()=>getDetail(item.id)} />
                              </ListItem>
                    })
                  }
                </List>
              </Paper>
            </div>
            <div style={{width: '70%', float: 'left', paddingLeft: '5px'}}>
              <Paper elevation={3} style={{width: '100%'}}>
                  <form className={classes.boxWrapper} onSubmit={onSubmitClick}>
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
                      <TextareaAutosize minRows={3} value={yesterday_summary} onChange={event => setYesterday_summary(event.target.value)} placeholder="yesterday summary" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Today summary</label>
                      <TextareaAutosize minRows={3} value={today_summary} onChange={event => setToday_summary(event.target.value)} placeholder="today summary" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Blocking summary</label>
                      <TextareaAutosize minRows={3} value={blocking_summary} onChange={event => setBlocking_summary(event.target.value)} placeholder="blocking summary" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Related tasks</label>
                      <TextareaAutosize minRows={3} value={related_tasks} onChange={event => setRelated_tasks(event.target.value)} placeholder="related tasks" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <label style={{alignSelf: 'flex-start'}}>Other</label>
                      <TextareaAutosize minRows={3} value={other} onChange={event => setOther(event.target.value)} placeholder="other" style={{width: '100%', marginBottom: '10px'}} />
                      
                      <div style={{width: '100%'}}>
                      <Button type="submit" size="large" onClick={(e) => onSubmitClick(e)} variant="contained" startIcon={<SaveIcon />}
                        disabled={(yesterday_summary === "" && today_summary === "" && blocking_summary === "" && related_tasks === "" && other === "") || date === null || detail.status !== SU_DUNG} >Save</Button>
                      <Button type="submit" size="large" onClick={(e) => onDelete(e)} variant="contained" startIcon={<DeleteIcon />}
                        disabled={!detail.id || detail.status !== SU_DUNG} style={{marginLeft: '5px'}}>Delete</Button>
                      <Button type="submit" size="large" onClick={() => setDataDetail({})} variant="contained" startIcon={<CancelIcon />}
                        disabled={yesterday_summary === "" && today_summary === "" && blocking_summary === "" && related_tasks === "" && other === ""} style={{marginLeft: '5px'}} >Cancel</Button>
                        
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