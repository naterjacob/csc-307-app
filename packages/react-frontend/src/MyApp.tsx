import { useState, useEffect } from 'react';
import { Form, Table } from './components';
import type { Character } from './types/character';

function MyApp() {
  const [characters, setCharacters] = useState<Character[]>([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person: Character) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function deleteUser(id: string) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(index: number) {
    const character = characters[index];
    if (character.id) {
      deleteUser(character.id)
        .then((res) => {
          if (res.status === 204) {
            const updated = characters.filter((_character, i) => i !== index);
            setCharacters(updated);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function updateList(person: Character) {
    postUser(person)
      .then((res) => res.json())
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characters={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
