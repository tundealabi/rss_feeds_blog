import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FollowingPageMain } from '../../styles/Following.styled';
import { PageMainHeading } from '../../styles/Globals.styled';

const Manage: NextPage = () => {
  return (
    <FollowingPageMain>
      <PageMainHeading>
        manage
        <Link href="/following">
          <a>following</a>
        </Link>
      </PageMainHeading>
      <span>Hoola amigos</span>
    </FollowingPageMain>
  );
};

export default Manage;
