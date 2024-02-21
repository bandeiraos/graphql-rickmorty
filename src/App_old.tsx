import { gql, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";

interface ICharacter {
  id: string,
  name: string,
}

const CHARACTER_ATTR = `
  id,
  name,
  image,
  location {
    name
  },
  gender
`;

const GET_ALL_CHARACTERS_QUERY = gql`
  query getCharacters {
    characters {
      results {
        ${CHARACTER_ATTR}
      }
    }
  }
`;

const GET_CHARACTERS_QUERY = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      ${CHARACTER_ATTR}
    }
  }
`;

function App() {
  const { data, loading } = useQuery(GET_ALL_CHARACTERS_QUERY);
  const characters = data?.characters.results;
  const [selectedChar, setSelectedChar] = useState<string>("0");

  const handleChangeChar = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChar(e.target.value);
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <label htmlFor="characters"></label>
      <select name="characters" id="characters" onChange={handleChangeChar} value={selectedChar}>
        <option value="0">Choose</option>
        {characters.map((char: ICharacter) => (
          <option key={char.id} value={char.id}>{char.name}</option>
        ))}
      </select>

      {selectedChar !== "0" && <CharacterInfo id={selectedChar} />}
    </>
  );
}

function CharacterInfo({ id }: { id: string; }) {

  const { data, loading } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { id }
  });

  if (loading) {
    return <>Loading character...</>;
  }

  const { character } = data;

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
      <div>
        <img src={character.image} alt={character.name} width={100} />
      </div>

      <div style={{ marginLeft: 20 }}>
        <div>
          <strong>Name:</strong>{' ' + character.name}
        </div>
        <div>
          <strong>Gender:</strong>{' ' + character.gender}
        </div>
        <div>
          <strong>Location:</strong>{' ' + character.location.name}
        </div>
      </div>
    </div>
  );
}

export default App;
