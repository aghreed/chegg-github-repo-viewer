
export const loadState = () => {
    try {
        const serialized = sessionStorage.getItem('chegg-gh-app');
        return JSON.parse(serialized);
    } catch (err) {
        console.error("Unable to load state from session storage: ", err);
    }
}

export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state);
        sessionStorage.setItem('chegg-gh-app', serialized);
    } catch (err) {
        console.error("Unable to save state to session storage: ", err)
    }
}