import axios from 'axios';

// Bas-URL för ditt API
const API_URL = 'https://k4uqnvfm1j.execute-api.eu-north-1.amazonaws.com/dev';

// Hämta alla meddelanden
export const getMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Skicka ett nytt meddelande
export const postMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, message);
    return response.data;
  } catch (error) {
    console.error('Error posting message:', error);
    throw error;
  }
};


// Uppdatera ett meddelande
export const updateMessage = async (id, updatedMessage) => {
    try {
      const response = await axios.put(`${API_URL}/messages/${id}`, updatedMessage);
      return response.data;
    } catch (error) {
      console.error(`Error updating message with id ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  // export const getMessagesByUser = async (username) => {
  //   try {
  //     const response = await axios.get(`${API_URL}/messages`, {
  //       params: { username },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching messages for user:', error);
  //     throw error;
  //   }
  // };
  