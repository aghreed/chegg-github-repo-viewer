
export const loadState = () => {
    try {
        const serialized = sessionStorage.getItem('chegg-gh-issue-order');
        return JSON.parse(serialized);
    } catch (err) {
        console.error("Unable to load state from session storage", err);
    }
}

export const saveState = () => {

}