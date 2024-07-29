// withAuth.tsx
import { useRouter } from 'next/router';
import { useMe } from '@/hooks/use-retiveme';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const { me, isLoading } = useMe();

    useEffect(() => {
      if (isLoading) return; // Don't proceed until loading is finished

      if (!me) {
        router.push('/en/auth/login');
      }
    }, [isLoading, me, router]);

    if (isLoading) {
      return <>...Loading</>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
