import type { Character } from '../../types/character';

type TableProps = {
  characters: Character[];
};

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody({ characters }: TableProps) {
  return (
    <tbody>
      {characters.map((character) => (
        <tr key={character.name}>
          <td>{character.name}</td>
          <td>{character.job}</td>
        </tr>
      ))}
    </tbody>
  );
}

export function Table({ characters }: TableProps) {
  return (
    <table>
      <TableHeader />
      <TableBody characters={characters} />
    </table>
  );
}
