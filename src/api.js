// src/api.js

import mockData from './mock-data';

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
        const response = await fetch(
            "https://fg3bgc5r7h.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
        );
        const result = await response.json();
        const { authURL } = result;
        return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

/**
 * 
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations. 
 * It also removes duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};


/**
 * 
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
    return mockData;
};

export default getEvents;