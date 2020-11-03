export type HubImage = {
  name: string;
  id: string;
  official: boolean;
  author: string;
  description: string;
  totalStars: number;
  totalRatings: number;
  numReviews: number;
  documentation: string;
  readme: string;
  readmeHTML: string;
  source: string;
  license: string;
  vendor: string;
  url: string;
  version: string;
  repoTags: string[];
};

export type Review = {
  content: string;
  username: string;
};
