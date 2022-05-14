import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import RssFeeds from '../../components/rss-feeds/RssFeeds';
import { FollowingPageMain } from '../../styles/Following.styled';
import { PageMainHeading } from '../../styles/Globals.styled';

const Following: NextPage = () => {
  return (
    <FollowingPageMain>
      <PageMainHeading>
        rss feeds
        <Link href="/following/manage">
          <a>manage</a>
        </Link>
      </PageMainHeading>
      <RssFeeds type="following" />
    </FollowingPageMain>
  );
};

export default Following;
