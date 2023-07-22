import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";




const StripeCreatePaymentIntentAPI = () => {

  const fetchPaymentIntentClientSecret = async ({ amount }) => {
      const res =  await fetch("http://localhost:8000/payments/intents", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          amount: (amount * 100),
        }),
      }).then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
       console.log(error)
      });
      return res?.client_secret;
    };
    }


export default StripeCreatePaymentIntentAPI;