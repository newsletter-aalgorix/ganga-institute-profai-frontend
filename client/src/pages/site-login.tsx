import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function SiteLogin() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation('/signin/student');
  }, [setLocation]);

  return null;
}
