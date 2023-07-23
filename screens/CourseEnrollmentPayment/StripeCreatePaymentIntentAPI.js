import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";




const fetchPaymentIntentClient = async (amount) => {
                      console.log("inside fetchPaymentIntentClient");

                      try {
                        const response = await fetch("http://10.0.2.2:3000/payments/intents", {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                          },
                          body: JSON.stringify({
                            amount: amount * 100,
                            payment_method_types: ["card"],
                          }),
                        });

                        if (!response.ok) {
                          throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        console.log("response fetchPaymentIntentClient", data);
                        console.log("response fetchPaymentIntentClient secret", data.paymentIntent);

                        return data.paymentIntent;

                      } catch (error) {
                        console.log(error);
                        throw error;
                      }
                    };

export default fetchPaymentIntentClient;