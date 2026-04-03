import { Table } from './components/table';
import { characters } from './data/characters';

function MyApp() {
  return (
    <div className="container">
      <Table characters={characters} />
    </div>
  );
}

export default MyApp;
