import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import AddRss from '../../components/add-rss/AddRss';
import PreviewLength from '../../components/preview-length/PreviewLength';
import PollingFrequency from '../../components/polling-frequency/PollingFrequency';
import { FollowingPageMain } from '../../styles/Following.styled';
import {
  ManageContentContainer,
  FeedsContainer,
  FeedsHeading,
} from '../../styles/Manage.styled';
import { PageMainHeading } from '../../styles/Globals.styled';
import { useRssFeeds } from '../../hooks';
import RssFeed from '../../components/rss-feed/RssFeed';

const Manage: NextPage = () => {
  const { feeds, isLoading, isError } = useRssFeeds();
  return (
    <FollowingPageMain>
      <PageMainHeading>
        manage
        <Link href="/following">
          <a>following</a>
        </Link>
      </PageMainHeading>
      <ManageContentContainer>
        <AddRss />
        <br />
        <PreviewLength />
        <br />
        <PollingFrequency />
        <FeedsContainer>
          <FeedsHeading>Feeds</FeedsHeading>
          {isLoading ? (
            <div>Loading Feeds...</div>
          ) : isError ? (
            <div>Error fetching feeds...try again by reloading</div>
          ) : (
            feeds.map((feed) => {
              return (
                <RssFeed
                  key={feed._id}
                  id={feed._id}
                  image={feed.image}
                  title={feed.title}
                  link={feed.link}
                  type="manage"
                />
              );
            })
          )}
        </FeedsContainer>
      </ManageContentContainer>
    </FollowingPageMain>
  );
};

export default Manage;
