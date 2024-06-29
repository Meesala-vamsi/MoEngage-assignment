import axios from 'axios';

const url = 'https://api.openbrewerydb.org/breweries';

export const searchByCity = async (city) => {
  const response = await axios.get(`${url}?by_city=${city}`);
  return response.data;
};

export const searchByName = async (name) => {
  const response = await axios.get(`${url}?by_name=${name}`);
  return response.data;
};

export const searchByType = async (type) => {
  const response = await axios.get(`${url}?by_type=${type}`);
  return response.data;
};
