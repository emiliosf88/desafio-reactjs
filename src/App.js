import React from "react";

import "./styles.css";
import { useState ,useEffect } from "react";
import api from "./services/api";

function App() {

  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepo(response.data);
    })
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title" : "Aplicativo Node",
      "techs": ["Node", "ReactJS"],
      "url" : "http://qualquer.com"
    });

    const repository = response.data
    setRepo([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepo(repositories.filter(
      repository => repository.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">        
          {repositories.map(repository => (
            <li key={repository.id}> {repository.title}          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
