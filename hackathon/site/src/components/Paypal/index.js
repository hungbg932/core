import React, { useState } from "react";
import { connect } from 'react-redux';
import * as PaymentActions from '../../actions/PaymentActions';
import { TextField } from '@material-ui/core';
import { useForm, Controller  } from "react-hook-form";
import { useSnackbar } from 'notistack';

function Paypal(props) {
  // const user = JSON.parse(window.sessionStorage.getItem('user')); 
  const { register, handleSubmit, watch, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  
  React.useEffect(() => {
    props.getPaypalConfig();
  }, []);
  
  React.useEffect(() => {
    if(props.payment_config.status) {
      //setup paypal
      props.resetStatusPaypalConfig();
      const configData = props.payment_config.data;
      window.paypal.Button.render({
        // Configure environment
        env: configData.paypalEnv,
        client: {
            sandbox: configData.paypalClientID,
            production: configData.paypalClientID
        },
        // Customize button (optional)
        locale: 'en_US',
        style: {
            size: 'large',
            shape: 'pill',
        },
        // Set up a payment
        payment: (data, actions) => {
            return actions.payment.create({
                transactions: [{
                    amount: {
                        total: getPaypalAmount(),
                        currency: 'USD'
                    }
                }]
            });
        },
        // Execute the payment
        onAuthorize:  (data, actions) => {
            return actions.payment.execute()
            .then(() => {
                processPaymentData(data);
            });
        }
      }, '#paypal-button');
    }
  }, [props.payment_config.status]);
  
  React.useEffect(() => {
    if(props.payment_info.status) {
      //process paypal success
      const paymentInfo = props.payment_info.data;
      enqueueSnackbar(paymentInfo.message, { 
        variant: paymentInfo.status,
      });
      props.resetProcessPaypalStatus();
    }
  }, [props.payment_info.status]);
  
  const getPaypalAmount = () => {
    const amount = watch("amount");
    console.log("getPaypalAmount", amount)
    return amount;
  };
  
  const processPaymentData = (data) => {
    var params = {
      paymentID: data.paymentID,
      token: data.paymentToken,
      payerID: data.payerID,
    };
    props.processPayment(params);
    reset()
  }
  
  const onSubmit = async(data) => {
    console.log(data)
  };
  
  return (
    <div style={{ height: 600, width: '100%' }}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      id="filled-number"
      label="Number"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="filled"
      {...register("amount", { required: true })}
    />
    </form>
    <div id="paypal-button"></div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    payment_config: state.payment.config,
    payment_info: state.payment.info,
  };
};

const mapDispatchToProps = (dispatch) =>  {
  return {
    getPaypalConfig: () => {
      dispatch(PaymentActions.getPaypalConfig());
    },
    resetStatusPaypalConfig: () => {
      dispatch(PaymentActions.resetStatusPaypalConfig());
    },
    processPayment: (params) => {
      dispatch(PaymentActions.processPayment(params));
    },
    resetProcessPaypalStatus: () => {
      dispatch(PaymentActions.resetProcessPaypalStatus());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paypal);