import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logoPath from '@assets/ProfAI-Updated.svg';

export default function SiteLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/site-auth/status', { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (data?.enabled !== true) {
          setLocation('/');
          return;
        }

        if (data?.authenticated === true) {
          const redirectTo = sessionStorage.getItem('siteLoginRedirect') || '/';
          sessionStorage.removeItem('siteLoginRedirect');
          setLocation(redirectTo);
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setLocation]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/site-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError('Invalid username or password');
        return;
      }

      const redirectTo = sessionStorage.getItem('siteLoginRedirect') || '/';
      sessionStorage.removeItem('siteLoginRedirect');
      setLocation(redirectTo);
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-900 via-stone-950 to-stone-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="relative w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
              <img src="/gitam-logo.png" alt="GITAM" className="h-10 w-auto" />
              <div className="h-8 w-px bg-white/20"></div>
              <img src={logoPath} alt="ProfessorsAI Logo" className="h-10 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Restricted Access</CardTitle>
            <CardDescription className="text-white/70">
              Enter your access credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/90 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
