import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';

const ProfilePage = () =>  {
  // Add check for existing profile -> if not, display/redirect to create profile page
  const { user, error, isLoading } = useUser();

  return (
      <>
        <Image src="/../public/beach-cleanup.webp" alt="asd" width={64} height={64}/>
        <h2>asdasd</h2>
        <p>asdasd</p>
      </>
  );
}

export default ProfilePage;
