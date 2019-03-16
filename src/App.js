import React, { Component } from 'react';
// eslint-disable-next-line
import styled from '@emotion/styled';
import api from './api';
import moment from 'moment';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const ListsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
`;

const RepoList = styled.div`
  overflow-y: scroll;
  max-height: 60vh;
  background: #f2f2f2;
  flex: ${props => props.selectedRepo ? 0.3 : 1};
  transition: all 400ms ease-in;
`;

const RepoListItem = styled.div`
  padding: 0.75em;
  background: ${props => props.selected ? '#ec38ff' : '#f2f2f2'};
  cursor: pointer;

  &:hover {
    background: #ec38ff;
  }
`;

const IssueList = styled.div`
  background: #f2f2f2;
  overflow-y: scroll;
  max-height: 60vh;
  flex: ${props => props.selectedRepo ? 0.6 : 0};
  transition: all 350ms ease-in;
`;

const IssueListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0;
`;

const IssueListItemImage = styled.div`
  width: 40px;
  height: 40px;
  background: #f2f2f2;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: ${props => props.avatar !== null ? `url(${props.avatar})` : null};
`;

const IssueListItemInfo = styled.div`
  width: 25%;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  h1 {
    font-size: 6em;
  }
`;

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      loadingRepos: true,
      selectedRepoId: null,
      repoIssues: [],
      loadingIssues: false
    };
  }

  componentDidMount() {
    api.getRepos().then(data => {
      this.setState({
        repos: data,
        loadingRepos: false
      });
    });
  }

  selectRepo = (repoId, repoIssuesUrl) => () => {
    this.setState({
      loadingIssues: true
    });

    api.getRepoIssues(repoIssuesUrl).then(data => {
      this.setState({
        selectedRepoId: repoId,
        repoIssues: data,
        loadingIssues: false
      });
    });
  }

  render() {
    const {
      repos,
      loadingRepos,
      selectedRepoId,
      repoIssues
    } = this.state;

    return (
      <AppContainer>
        {
          repos.length > 0 && <h1>{repos[0] && repos[0].owner.login}'s Repos</h1>
        }
        {
          loadingRepos ?
          <LoadingMessage><h1>Loading Repos...</h1></LoadingMessage>
          :
          <ListsContainer>
            <RepoList selectedRepo={selectedRepoId !== null}>
              {
                repos.length > 0 && repos.map(repo => (
                  <RepoListItem
                    key={repo.id}
                    selected={selectedRepoId === repo.id}
                    onClick={this.selectRepo(repo.id, repo.issues_url)}
                  >
                    {repo.name}
                  </RepoListItem>
                ))
              }
            </RepoList>
            <IssueList selectedRepo={selectedRepoId !== null}>
              {
                repoIssues.length > 0
                ?
                <div>
                  <IssueListItem style={{ borderBottom: `1px solid #000`, padding: `1em 0`}}>
                    <IssueListItemInfo>Assignee</IssueListItemInfo>
                    <IssueListItemInfo>Title</IssueListItemInfo>
                    <IssueListItemInfo>Created</IssueListItemInfo>
                    <IssueListItemInfo>Last Updated</IssueListItemInfo>
                  </IssueListItem>
                  {
                    repoIssues.map(issue => (
                      <IssueListItem key={issue.id}>
                        <IssueListItemInfo style={{ display: `flex`, justifyContent: `center` }}>
                          <IssueListItemImage avatar={issue.assignee && issue.assignee.avatar_url} />
                        </IssueListItemInfo>
                        <IssueListItemInfo title={issue.title}>
                          {issue.title}
                        </IssueListItemInfo>
                        <IssueListItemInfo>
                          {moment(issue.created_at).calendar()}
                        </IssueListItemInfo>
                        <IssueListItemInfo>
                          {moment(issue.updated_at).calendar()}
                        </IssueListItemInfo>
                      </IssueListItem>
                    ))
                  }
                </div>
                :
                <NoResultsMessage>No issues exist for the selected repo</NoResultsMessage>
              }
            </IssueList>
          </ListsContainer>
        }
      </AppContainer>
    );
  }
}

export default App;
