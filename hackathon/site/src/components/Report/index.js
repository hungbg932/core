import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import useAxios from "axios-hooks";
import Loading from "../Loading";
import APPCONFIG from '../../constant/appConfig';
import setAuthToken from '../../utils/setAuthToken';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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

export default function ({ navigate }) {
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [yesterday_summary, setYesterday_summary] = useState("");
    const [today_summary, setToday_summary] = useState("");
    const [blocking_summary, setBlocking_summary] = useState("");
    const [related_tasks, setRelated_tasks] = useState("");
    const [other, setOther] = useState("");
    const [listReport, setListReport] = useState([]);
    const [detail, setDetail] = useState({});
    
    React.useEffect(() => {
      getListData();
    }, []);
    
    const getListData=()=>{
      axios.post(`${APPCONFIG.apiUri}report/getByFilter`).then((response) => {
        setListReport(response.data);
      });
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
      
      axios.post(`${APPCONFIG.apiUri}report/${detail.id?('update/'+detail.id):'create'}`,params).then((response) => {
        alert("Submited!");
        setDataDetail({});
        getListData();
      });
    }
    
    const onSubmitClick = (event) => {
        event.preventDefault();
        doSubmit();
    }
    
    const onDelete = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you wish to delete this item?')){
          axios.post(`${APPCONFIG.apiUri}report/delete/${detail.id}`).then((response) => {
            setDataDetail({});
            getListData();
          });
        }
    }
    
    return (
        <div className={classes.pageWrapper}>
          <div style={{width: '100%'}}>
            <div style={{width: '30%', float: 'left'}}>
              <Paper elevation={3} style={{width: '100%'}}>
                <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">List Report</Typography>
                <List component="nav" aria-label="secondary mailbox folders">
                  {
                    listReport.map(item=>{
                      return  <ListItem button style={{backgroundColor: detail.id === item.id ? '#feefc3' : ''}}>
                                <ListItemText primary={moment(item.date).format('DD/MM/YYYY')} onClick={()=>getDetail(item.id)} />
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
                        disabled={(yesterday_summary === "" && today_summary === "" && blocking_summary === "" && related_tasks === "" && other === "") || date === null} >Save</Button>
                      <Button type="submit" size="large" onClick={() => onDelete()} variant="contained" startIcon={<DeleteIcon />}
                        disabled={!detail.id} style={{marginLeft: '5px'}}>Delete</Button>
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