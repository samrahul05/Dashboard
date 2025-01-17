import axios from 'axios';

const API_URL = 'http://localhost:3002/users';


export const getUsers= async () => {
    try {
      return await axios.get(API_URL);
    } catch (err) {
      console.log("Error getUsers Api", err.message);
    }
  };



  export const getdatathinkspeak = async () => {
    try {
      return await axios.get("https://api.thingspeak.com/channels/2518899/feeds.json?api_key=FZV2MNAKVC35C1YF&results");
    } catch (err) {
      console.log("Error getUsers Api", err.message);
    }
  };

export const getUser = async (data) => {
  try {
    return await axios.get(`${API_URL}/${data}`);
  } catch (err) {
    console.log("Error getUserdata Api", err.message);
  }
};





