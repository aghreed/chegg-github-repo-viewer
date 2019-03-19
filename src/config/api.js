const api = {
    getRepos: ({ token }) => {
        return fetch(`https://api.github.com/user/repos`, {
            headers: {
                "Authorization": `token ${token}`
            }
        })
        .then(response => response.json());
    },
    getRepoIssues: ({ url, token }) => {
        return fetch(url, {
            headers: {
                "Authorization": `token ${token}`
            }
        })
        .then(response => response.json());
    }
};

export default api;