interface Item {
  login?: string;
  id?: number;
  nodeId?: number;
  avatarUrl?: string;
  gravatarId?: string;
  url?: string;
  htmlUrl?: string;
  followersUrl?: string;
  followingUrl?: string;
  gistsUrl?: string;
  starredUrl?: string;
  subscriptionsUrl?: string;
  organizationsUrl?: string;
  reposUrl?: string;
  eventsUrl?: string;
  receivedEventsUrl?: string;
  type?: string;
  siteAdmin?: boolean;
  score?: number;
}

export default interface SearchResultType {
  totalCount?: number;
  incompleteResults?: boolean;
  items?: Item[];
}
