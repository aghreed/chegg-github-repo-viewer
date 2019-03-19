import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { greyBackground, cheggOrange, darkGrey } from "./config/colors";

const IssueContainer = styled.div`
  flex: ${props => props.repoSelected ? 0.6 : 0};
  width: ${props => props.repoSelected ? 'auto' : '0px'};
  height: 100%;
  transition: flex 350ms ease-in;

  @media(max-width: 700px) {
    flex: ${props => props.repoSelected ? 0.8 : 0};
    margin: 3em 0;
  }
`;

const IssueList = styled.div`
  overflow-y: scroll;
  height: 70vh;
  background: ${greyBackground};
`;

const IssueListHeader = styled.div`
  opacity: ${props => props.repoSelected ? 1 : 0};
  border-bottom: 1px solid #000;
  marginTop: 1em;
`;

const IssueListItemHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0;
`;

const IssueListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0;

  &:hover {
    background: ${cheggOrange};
  }
`;

const IssueListItemImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: ${darkGrey};
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const UpArrow = styled.div`
  opacity: ${props => props.firstItem ? 0.4 : 1};
  pointer-events: ${props => props.firstItem ? `none` : `auto`};
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #000;
  margin-bottom: 0.4em;
  cursor: ${props => props.firstItem ? `not-allowed` : `pointer`};
`;

const DownArrow = styled.div`
  opacity: ${props => props.lastItem ? 0.4 : 1};
  pointer-events: ${props => props.firstItem ? `none` : `auto`};
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #000;
  margin-top: 0.4em;
  cursor: ${props => props.lastItem ? `not-allowed` : `pointer`};
`;

const IssuesContainer = ({
    repoSelected,
    issuesLoading,
    issues,
    moveIssue
}) => (
    <IssueContainer repoSelected={repoSelected}>
        <IssueListHeader repoSelected={repoSelected}>
            <h2>Repo Issues</h2>
        </IssueListHeader>
        <IssueList repoSelected={repoSelected}>
        {
            issuesLoading
            ?
            <LoadingMessage>Fetching associated issues...</LoadingMessage>
            :
            <div style={{ height: `100%` }}>
            {
            issues.length > 0 ?
            <div>
                <IssueListItemHeader style={{ borderBottom: `1px solid #000`, padding: `1em 0`}}>
                    <IssueListItemInfo>Assignee</IssueListItemInfo>
                    <IssueListItemInfo>Title</IssueListItemInfo>
                    <IssueListItemInfo>Created</IssueListItemInfo>
                    <IssueListItemInfo>Last Updated</IssueListItemInfo>
                </IssueListItemHeader>
                {
                issues.map((issue, index) => (
                    <IssueListItem key={issue.id}>
                    <div style={{ position: `relative`, left: `1.5em` }}>
                      <UpArrow firstItem={index === 0} onClick={moveIssue("up", index)} />
                      <DownArrow lastItem={index === issues.length - 1} onClick={moveIssue("down", index)} />
                    </div>
                    <IssueListItemInfo style={{ display: `flex`, justifyContent: `center` }} title={issue.assignee && issue.assignee.username}>
                        <IssueListItemImage avatar={issue.assignee && issue.assignee.avatar_url} />
                    </IssueListItemInfo>
                    <IssueListItemInfo title={issue.title}>
                        {issue.title}
                    </IssueListItemInfo>
                    <IssueListItemInfo>
                        {moment(issue.created_at).format("DD/MM/YYYY")}
                    </IssueListItemInfo>
                    <IssueListItemInfo>
                        {moment(issue.updated_at).calendar()}
                    </IssueListItemInfo>
                    </IssueListItem>
                ))
                }
            </div>
            :
            <NoResultsMessage>
                <h2>Wow!</h2>
                There are zero issues for this repo
            </NoResultsMessage>
            }
        </div>
        }
        </IssueList>
        </IssueContainer>
);

export default IssuesContainer;