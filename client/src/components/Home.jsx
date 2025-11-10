import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
  const [jokes, SetJokes] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jokes`)
      .then((response) => {
        console.log(response.data);
        SetJokes(response.data.jokes || response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h2>Welcome Fellows!</h2>
        <p>Jokes: {jokes.length}</p>
        {
          jokes.map((joke, index) => (
            <div key={joke.id || index}>
              <h2>{joke.Name}</h2>
              <p>{joke.Age}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Home;
