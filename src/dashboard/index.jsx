import { Box, IconButton, Typography, useTheme,Container } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsers } from '../service/api';
import { tokens } from "../theme";
import Header from "../components/Header";
import LineChart from "../components/LineChart";

import Human from '../img/human.png'
import Reject from '../img/reject.png'


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [thingspeaks, setThingspeaks] = useState([]);

const current = thingspeaks.map((value)=>{return value.field1})
const voltage = thingspeaks.map((value)=>{return value.field2})
const power = thingspeaks.map((value)=>{return value.field3})
const unqiue = thingspeaks.map((value)=>{return value.field4})



  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData();
    },1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
   
  const fetchData = async () => {
    try {
      const [usersResponse, thingspeaksResponse] = await Promise.all([
        getUsers(),
        axios.get(" https://api.thingspeak.com/channels/2443244/feeds.json?results"),
      ]);

      setUsers(usersResponse.data);
      console.log(setUsers)
      setThingspeaks(thingspeaksResponse.data.feeds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const lastObject = thingspeaks[thingspeaks.length - 1];
  // console.log(lastObject);
 
  const lastField1Value = lastObject ? lastObject.field1 : null;
  const lastField2Value = lastObject ? lastObject.field2 : null;
  const lastField3Value = lastObject ? lastObject.field3 : null;
  const lastField4Value = lastObject ? lastObject.field4 : null;
  const lastField5Value = lastObject ? parseInt(lastObject.field5) || 0 : 0;
 
 

  console.log("lastField5Value",lastField5Value)


  return (
    <Container maxWidth='lg'>
          <Box m="20px">
      {/* HEADER */}
      <Box  textAlign="center" marginTop={10} marginBottom={10}>
        <Header title="Iot Based Energy Monitoring of Electronic Device"  />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent='space-around'
          flexDirection="column"
        >
         
         <h2  style={{color:"#38bcb2"}}>Current</h2>
         <h2 style={{color:"#ffff",fontSize:'30px'}}>{lastField1Value}</h2>


        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent='space-around'
          flexDirection="column"
        >
            <h2 style={{color:"#38bcb2"}}>voltage</h2>
         <h2 style={{color:"#ffff",fontSize:'30px'}}>{lastField2Value}</h2>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent='space-around'
          flexDirection="column"
        >
           <h2 style={{color:"#38bcb2"}}>power</h2>
         <h2 style={{color:"#ffff",fontSize:'30px'}}>{lastField3Value}</h2>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent='space-around'
          flexDirection="column"
        >
           <h2 style={{color:"#38bcb2"}}>unqiue</h2>
         <h2 style={{color:"#ffff",fontSize:'30px'}}>{lastField4Value}</h2>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
             
            </Box>
           
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} current={current} voltage={voltage} power={power} unqiue={unqiue}/>
          </Box>
        </Box>
       

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" style={{color:"#38bcb2"}}>
          Human Detection
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={8}
            // style={{backgroundColor:"red"}}

          >
            {
              lastField5Value == 1 ? <img src={Human} alt="human" /> : <img src={Reject} alt="reject" />
            }
            
           
          </Box>
        </Box>

       
      </Box>
    </Box>
    </Container>

  );
};

export default Dashboard;
