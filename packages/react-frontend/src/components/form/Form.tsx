import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Character } from '../../types/character';

type FormProps = {
  handleSubmit: (person: Character) => void;
};

export function Form({ handleSubmit }: FormProps) {
  const [person, setPerson] = useState<Character>({
    name: '',
    job: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPerson((previousPerson) => ({
      ...previousPerson,
      [name]: value,
    }));
  }

  function submitForm() {
    handleSubmit(person);
    setPerson({ name: '', job: '' });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}
export default Form;
