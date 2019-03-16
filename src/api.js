const baseUrl = `https://api.github.com`;
const token = '311e6d5bc24e8083825328eecd836b380b94943e';
const api = {
    getRepos: () => {
        return fetch(`${baseUrl}/user/repos`, {
            headers: {
                "Authorization": `token ${token}`
            }
        })
        .then(response => response.json());
    },
    getRepoIssues: (issuesUrl) => {
        const url = issuesUrl.replace("{/number}", "");
        return fetch(url, {
            headers: {
                "Authorization": `token ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("issues returned: ", data);
            return data;
        });
    }
};

export default api;