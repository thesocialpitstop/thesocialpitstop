import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = () =>  {
  // Add check for existing profile -> if not, display/redirect to create profile page
  return (
      <>
        <Image src="/../public/beach-cleanup.webp" alt="asd" width={64} height={64}/>
        <h2>asdasd</h2>
        <p>asdasd</p>
      </>
  );
}

export default ProfilePage;
