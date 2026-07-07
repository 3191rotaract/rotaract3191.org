import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CUSTOM_LINKS } from '../data/links.js';
import NotFound from './NotFound.jsx';

export default function LinkRedirect() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+|\/+$/g, '');
  const target = CUSTOM_LINKS[slug];

  useEffect(() => {
    if (target) {
      window.location.replace(target);
    }
  }, [target]);

  if (!target) return <NotFound />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <p className="text-sm text-slate-500">Redirecting…</p>
    </div>
  );
}
