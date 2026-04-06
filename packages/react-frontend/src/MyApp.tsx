import { useState } from 'react';
import { Form, Table } from './components';
import type { Character } from './types/character';

function MyApp() {
  const [characters, setCharacters] = useState<Character[]>([]);

  function removeOneCharacter(index: number) {
    const updated = characters.filter((_character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person: Character) {
    setCharacters((previousCharacters) => [...previousCharacters, person]);
  }

  return (
    <div className="container">
      <Table characters={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
