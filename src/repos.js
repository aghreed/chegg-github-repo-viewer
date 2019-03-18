import React from "react";
import styled from "@emotion/styled";
import { greyBackground, cheggOrange } from "./config/colors";

const RepoContainer = styled.div`
  flex: ${props => props.repoSelected ? 0.3 : 0.8};
  transition: flex 400ms ease-in;

  @media(max-width: 700px) {
    flex: 0.8;
  }
`;

const RepoList = styled.div`
  overflow-y: scroll;
  height: 70vh;
  background: ${greyBackground};

  @media(max-width: 700px) {
    height: 50vh;
  }
`;

const RepoListItem = styled.div`
  padding: 0.75em;
  background: ${props => props.selected ? cheggOrange : greyBackground};
  cursor: pointer;

  &:hover {
    background: ${cheggOrange};
  }
`;

const ReposContainer = ({
    repoSelected,
    repos,
    selectedRepoName,
    selectRepo
}) => (
    <RepoContainer repoSelected={repoSelected}>
    {
      repos.length > 0 && <div style={{ borderBottom: `1px solid #000`, marginTop: `1em` }}><h2>{repos[0] && repos[0].owner.login}'s Repos</h2></div>
    }
    <RepoList repoSelected={repoSelected}>
      {
        repos.length > 0 && repos.map(repo => (
          <RepoListItem
            key={repo.id}
            selected={selectedRepoName === repo.name}
            onClick={selectRepo(repo.name, repo.issues_url)}
          >
            {repo.name}
          </RepoListItem>
        ))
      }
    </RepoList>
  </RepoContainer>
);

export default ReposContainer;