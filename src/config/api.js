
// const token = '311e6d5bc24e8083825328eecd836b380b94943e';
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