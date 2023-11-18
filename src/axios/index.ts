import axios from 'axios'

export default axios.create({
  baseURL: "https://api.modrinth.com/v2",
  headers: {
    "Content-type": "application/json",
    "User-Agent": "Modrinth-Dashboard-Android"
  }
});