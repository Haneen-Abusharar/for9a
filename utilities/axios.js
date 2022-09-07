import axios from "axios";
export default axios.create({
  baseURL: `${process.env.api}`,
  headers: {
    'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
  }
});