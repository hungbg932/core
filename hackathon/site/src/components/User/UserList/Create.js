import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";
import userApi from '../../../api/userApi';
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
    const result = await userApi.create(data);
    if(result.error) {//have error
      enqueueSnackbar(result.error, { 
          variant: 'error',
      });
    } else {//create success
      props.onRefresh && props.onRefresh();
      enqueueSnackbar('Thêm mới tài khoản thành công', { 
          variant: 'success',
      });
    }
  };
  
  return (
    <form className={classes.boxWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Thêm mới user</Typography>
      <TextField 
        InputLabelProps={inputLabelProps} 
        InputProps={inputProps} 
        name="name" 
        label="Tên" 
        type="name" 
        variant="outlined" 
        fullWidth margin="normal" 
        {...register("name", { required: true })}
      />
      <TextField 
        InputLabelProps={inputLabelProps} 
        InputProps={inputProps} 
        name="email" 
        label="Email" 
        type="email" 
        variant="outlined" 
        fullWidth margin="normal" 
        {...register("email", { required: true })}
      />
      <TextField
        InputLabelProps={inputLabelProps}
        InputProps={inputProps}
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth 
        margin="normal"
        {...register("password", { required: true })}
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