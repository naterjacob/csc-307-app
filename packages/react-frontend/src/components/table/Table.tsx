import type { Character } from '../../types/character';

type TableProps = {
  characters: Character[];
  removeCharacter: (index: number) => void;
};

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

function TableBody({ characters, removeCharacter }: TableProps) {
  return (
    <tbody>
      {characters.map((character, index) => (
        <tr key={index}>
          <td>{character.name}</td>
          <td>{character.job}</td>
          <td>
            <button type="button" onClick={() => removeCharacter(index)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export function Table({ characters, removeCharacter }: TableProps) {
  return (
    <table>
      <TableHeader />
      <TableBody characters={characters} removeCharacter={removeCharacter} />
    </table>
  );
}
