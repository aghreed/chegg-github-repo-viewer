export const initialState = {
    repos: [],
    issues: [],
    selectedRepoName: null,
    repoFetchMade: false,
    reposLoading: false,
    issuesLoading: false,
    token: null
};

export default function reducer(state = initialState, { type, payload }) {
    switch(type) {
        case "UPDATE_TOKEN":
            return {
                ...state,
                token: payload
            };
        case "SELECT_REPO":
            return {
                ...state,
                selectedRepoName: payload.repoName
            };
        case "FETCH_REPOS":
            return {
                ...state,
                repoFetchMade: true,
                reposLoading: true
            };
        case "FETCH_REPOS_SUCCESS":
            return {
                ...state,
                reposLoading: false,
                repos: payload
            };
        case "FETCH_ISSUES":
            return {
                ...state,
                issuesLoading: true
            };
        case "FETCH_ISSUES_SUCCESS":
            return {
                ...state,
                issuesLoading: false,
                issues: payload
            };
        case "SORT_ISSUES":
            return {
                ...state,
                issues: payload.issues
            };
        case "START_OVER":
            return {
                ...initialState
            };
        default:
            return state;
    }
}