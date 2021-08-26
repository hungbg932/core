import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";
import teamApi from '../../api/teamApi';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  boxWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  textWelcome: {
    ...theme.custom.fontFamily.metropolis
  },
  textRegister: {
    textDecoration: "none",
    color: theme.palette.secondary.dark
  },
  textRegisterText: {
    ...theme.custom.fontFamily.metropolis,
    paddingTop: theme.spacing(3)
  },
  textNotice: {
    ...theme.custom.fontFamily.roboto,
    lineHeight: "unset",
    textAlign: "center",
    paddingTop: theme.spacing(2)
  },
  textAttribution: {
    padding: theme.spacing(0, 2, 2, 0),
    textAlign: "right"
  },
  textCreator: {
    textDecoration: "none",
    color: theme.palette.secondary.dark
  },
  loginButtonRoot: {
    marginTop: theme.spacing(3)
  },
  loginButtonText: {
    ...theme.custom.fontFamily.metropolis,
    color: theme.palette.secondary.contrastText,
    textTransform: "capitalize"
  },
  logo: {
    height: theme.spacing(7),
    padding: theme.spacing(0, 0, 1, 0)
  },
  inputRoot: {
    '&$inputFocused $inputNotchedOutline': {
        borderColor: theme.palette.secondary.main
    },
  },
  inputNotchedOutline: {},
  inputFocused: {},
  inputLabelRoot: {
    '&$inputFocused': {
        color: theme.palette.secondary.main
    },
  }
}));

export default function (props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const inputProps = {
    classes: {
      root: classes.inputRoot,
      notchedOutline: classes.inputNotchedOutline,
      focused: classes.inputFocused
    }
  }
  const inputLabelProps = {
    classes: {
      root: classes.inputLabelRoot,
      focused: classes.inputFocused
    }
  }
  
  const onSubmit = async(data) => {
    const user = JSON.parse(window.sessionStorage.getItem('userInfor'));
    data['id'] = user.id;
    const result = await teamApi.create(data);
    if(result.error) {//have error
      enqueueSnackbar(result.error, { 
          variant: 'error',
      });
    } else {//create success
      props.onRefresh && props.onRefresh();
      enqueueSnackbar('Thêm mới thành công', { 
          variant: 'success',
      });
    }
  };
  
  return (
    <form className={classes.boxWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Thêm mới </Typography>
      <TextField 
        InputLabelProps={inputLabelProps} 
        InputProps={inputProps} 
        name="name" 
        label="name" 
        type="name" 
        variant="outlined" 
        fullWidth margin="normal" 
        {...register("name", { required: true })}
      />
      <TextField 
        InputLabelProps={inputLabelProps} 
        InputProps={inputProps} 
        name="description" 
        label="description" 
        type="description" 
        variant="outlined" 
        fullWidth margin="normal" 
        {...register("description", { required: true })}
      />
      <Button 
        classes={{ root: classes.loginButtonRoot, label: classes.loginButtonText }}
        type="submit"
        variant="contained"
        color="secondary"
        disableElevation
        fullWidth
        size="large"
      >
        Thêm mới
      </Button>
    </form>
  );
}