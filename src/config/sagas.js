import { takeEvery, call, put } from "redux-saga/effects";
import api from "./api";

function* fetchRepos({ payload }) {
    try {
        const data = yield call(api.getRepos, payload);
        yield put({ type: "FETCH_REPOS_SUCCESS", payload: data });
    } catch (err) {
        yield put({ type: "FETCH_REPOS_FAILURE" });
    }
};

function* selectRepo({ payload }) {
    const issuesUrl = payload.repoIssuesUrl.replace("{/number}", "");
    yield put({ type: "FETCH_ISSUES", payload: { url: issuesUrl, token: payload.token } });
};

function* fetchIssues({ payload }) {
    console.log("payload: ", payload);
    try {
        const data = yield call(api.getRepoIssues, payload);
        yield put({ type: "FETCH_ISSUES_SUCCESS", payload: data });
    } catch (err) {
        yield put({ type: "FETCH_ISSUES_FAILURE" });
    }
};

export default function* root() {
    yield(takeEvery("FETCH_REPOS", fetchRepos));
    yield(takeEvery("SELECT_REPO", selectRepo));
    yield(takeEvery("FETCH_ISSUES", fetchIssues));
}