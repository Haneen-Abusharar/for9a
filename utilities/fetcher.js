import axios from "axios";

const fetcher = async (...url) => {
    const data = await axios
      .get(...url, {
        headers: {
          'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
        }
      })
      .then((res) => {
        
        return res.data
      }
      );
    return data
  }
  export default fetcher;