import { gql, useQuery } from "@apollo/client";
import { ICharacter } from "../types/types";

const GET_ALL_CHARACTERS_QUERY = gql`
    query getCharacters($page: Int) {
        characters(page: $page) {
            info {
                count,
                pages,
            }
            results {
                id
                name
            }
        }
    }
`;

interface CharactersListProps {
    page: number;
    handleChangePage: (page: number) => void;
    handleChangeCharacterId: (id: string) => void;
}

const styles = {
    list: {
        display: 'flex',
        flexDirection: 'column' as const
    },
    pagination: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        justifyContent: 'center',
        gap: 4,
        marginTop: 12
    }
};

const CharactersList = ({ page, handleChangePage, handleChangeCharacterId }: CharactersListProps) => {
    const { data, loading } = useQuery(GET_ALL_CHARACTERS_QUERY, {
        variables: {
            page
        }
    });

    if (loading)
        return <>Loading...</>;

    console.log('data', data);
    return (
        <div>
            <div style={styles.list}>
                {
                    data.characters.results.map((char: ICharacter) => (
                        <button
                            key={char.id}
                            onClick={() => handleChangeCharacterId(char.id)}
                        >
                            {char.name}
                        </button>
                    ))
                }
            </div>

            <div style={styles.pagination}>
                {Array.from({ length: data.characters.info.pages }).map((_, i) => (
                    <a key={i} href="#" onClick={() => handleChangePage(i + 1)}>{i + 1}</a>
                ))}
            </div>
        </div>
    );
};

export default CharactersList;