export const saveToken = (token) => ({
    type: "UPDATE_TOKEN",
    payload: token
});

export const selectRepo = (repoName, repoIssuesUrl, token) => ({
    type: "SELECT_REPO",
    payload: { repoName, repoIssuesUrl, token }
});

export const fetchRepos = (token) => ({
    type: "FETCH_REPOS",
    payload: { token }
});

export const fetchReposSuccess = (data) => ({
    type: "FETCH_REPOS_SUCCESS",
    payload: data
});

export const fetchIssues = () => ({
    type: "FETCH_ISSUES"
});

export const fetchIssuesSuccess = (data) => ({
    type: "FETCH_ISSUES_SUCCESS",
    payload: data
});

export const sortIssues = (issues, repoName) => ({
    type: "SORT_ISSUES",
    payload: { issues, repoName }
});

export const startOver = () => ({
    type: "START_OVER"
});

export default {
    saveToken,
    selectRepo,
    fetchRepos,
    fetchReposSuccess,
    fetchIssues,
    fetchIssuesSuccess,
    sortIssues,
    startOver
};
