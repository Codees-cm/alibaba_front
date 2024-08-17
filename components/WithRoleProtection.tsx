// components/withRoleProtection.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withRoleProtection = (Component:any, allowedRoles = []) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading

      // If not authenticated or the user's role is not allowed, redirect to a different page
      if (!session || !allowedRoles.includes(session.user.role)) {
        router.push('/access-denied'); // Redirect to an access denied page
      }
    }, [session, status]);

    if (status === 'loading' || !session || !allowedRoles.includes(session.user.role)) {
      return null; // Optionally render a loading state or null while redirecting
    }

    return <Component {...props} />;
  };
};

export default withRoleProtection;
