import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in the reading zone of the viewport,
 * or '' when none of them is (e.g. while the hero is in view).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // ids are in document order; pick the last one inside the zone
        setActive([...ids].reverse().find((id) => visible.has(id)) ?? '');
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
