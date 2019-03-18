import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import appActions from "./config/actions";
import { cheggOrange } from "./config/colors";
import ReposContainer from "./repos";
import IssuesContainer from "./issues";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const KeyEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  input {
    padding: 0.75em 0.5em;
    min-width: 400px;
    margin: 1em 0 2em;
    font-size: 1.1em;
  }

  button {
    padding: 0.75em 1em;
    font-size: 1.2em;
    background: ${cheggOrange};
    cursor: pointer;
    letter-spacing: 3px;
    font-weight: 500;

    &:disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.repoSelected ? 'space-around' : 'center'};
  width: 100vw;
  margin-top: 4em;

  @media(max-width: 700px) {
    flex-direction: column;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h1 {
    font-size: 6em;
  }
`;

class App extends Component {
  saveToken = (e) =>
    this.props.saveToken(e.target.value);

  fetchRepos = () =>
    this.props.fetchRepos(this.props.token);

  selectRepo = (repoName, repoIssuesUrl) => () =>
    this.props.selectRepo(repoName, repoIssuesUrl, this.props.token);
    
  render() {
    const {
      repos,
      selectedRepoName,
      reposLoading,
      repoSelected,
      issues,
      issuesLoading,
      repoFetchMade,
      token
    } = this.props;

    return (
      <AppContainer>
        {
          repoFetchMade ?
          <div>
            {
              reposLoading ?
              <LoadingMessage><h1>Loading Repos...</h1></LoadingMessage>
              :
              <ListsContainer repoSelected={repoSelected}>
                <ReposContainer
                  repoSelected={repoSelected}
                  repos={repos}
                  selectedRepoName={selectedRepoName}
                  selectRepo={this.selectRepo}
                />
                <IssuesContainer
                  repoSelected={repoSelected}
                  issuesLoading={issuesLoading}
                  issues={issues}
                />
              </ListsContainer>
            }
          </div>
          :
          <KeyEntryContainer>
            <h2>Provide a Github API key to continue:</h2>
            <input type="text" onChange={this.saveToken} />
            <button disabled={token === null || token === ""} onClick={this.fetchRepos}>Proceed</button>
          </KeyEntryContainer>
        }
      </AppContainer>
    );
  }
}

const mapState = (state) => {
  console.log("map state: ", state);
  return {
    ...state,
    repoSelected: state.selectedRepoName !== null
  };
};

const mapDispatch = {
  ...appActions
};

export default connect(mapState, mapDispatch)(App);
