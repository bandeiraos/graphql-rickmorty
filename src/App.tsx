import { useCallback, useState } from "react";
import CharacterDetail from "./components/CharacterDetail";
import CharactersList from "./components/CharactersList";

const App = () => {
    const [page, setPage] = useState<number>(0);
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

    const handleChangePage = useCallback((page: number) => {
        setPage(page);
    }, []);

    const handleChangeCharacterId = useCallback((id: string) => {
        setSelectedCharacter(id);
    }, []);

    return (
        <>
            <CharactersList
                page={page}
                handleChangePage={handleChangePage}
                handleChangeCharacterId={handleChangeCharacterId}
            />
            {selectedCharacter && <CharacterDetail characterId={selectedCharacter} />}
        </>
    );
};

export default App;