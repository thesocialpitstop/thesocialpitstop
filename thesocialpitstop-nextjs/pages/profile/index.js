import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';


const ProfilePage = () =>  {
  // Add check for existing profile -> if not, display/redirect to create profile page
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/profile/${user.sub.split('|')[1]}`);
    }
  
  }, [user])
  
  

  // return (

  // )
}

export default ProfilePage;

export const getServerSideProps = withPageAuthRequired();
