import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";

import { Amplify, API, Storage} from 'aws-amplify';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);

import { useNavigation } from '@react-navigation/native';

const fetchPaymentIntentClient = async (amount) => {
            console.log("inside fetchPaymentIntentClient");

            try {
              const apiName = 'subscription'; // replace this with your api name.
              const path = '/intents'; //replace this with the path you have configured on your API
              const myInit = {
                body: {
                  amount: 100,
                }, // replace this with attributes you need
                headers: {} // OPTIONAL
              };

              const response=await API.post(apiName, path, myInit)
                


              // const response = await fetch("https://5hm1jef1qk.execute-api.us-east-1.amazonaws.com/dev/intents", {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //     'Accept': 'application/json'
              //   },
              //   body: JSON.stringify({
              //     amount: amount * 100,
              //   }),
              // });
              console.log("response fetchPaymentIntentClient", response)
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              const data = await response.json();
              console.log("response fetchPaymentIntentClient", data);

              return data.client_secret;
            } catch (error) {
              console.log(error);
              throw error;
            }
          };


export default fetchPaymentIntentClient;