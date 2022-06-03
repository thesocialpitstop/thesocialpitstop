import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';

const Profile = () =>  {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <Link href="/api/auth/login"><a>Login</a></Link>;
  return (
    user && (
      <>
        <Image src="/../public/beach-cleanup.webp" alt={user.name} width={64} height={64}/>
          <h2>{user.name}</h2>
        <p>{user.email}</p>
      </>

    )
  );
}

export default Profile;
