import { gql, useQuery } from "@apollo/client";

const GET_CHARACTER_BY_ID_QUERY = gql`
    query getCharacterById($id: ID!) {
        character(id: $id) {
            id,
            name,
            image,
            gender,
            location {
                name
            }
        }
    }
`;

interface CharacterDetailProps {
    characterId: string;
}

const CharacterDetail = ({ characterId }: CharacterDetailProps) => {
    const { data, loading } = useQuery(GET_CHARACTER_BY_ID_QUERY, { variables: { id: characterId } });
    if (loading) {
        return <>Loading character...</>;
    }

    const character = data.character;

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
};

export default CharacterDetail;