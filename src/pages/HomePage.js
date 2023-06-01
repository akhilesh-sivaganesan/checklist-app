import { useState, useEffect } from 'react';

function HomePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {message}
    </div>
  );
}

export default HomePage;
