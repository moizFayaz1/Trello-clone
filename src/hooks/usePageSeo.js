import { useEffect } from 'react';

export default function usePageSeo(title) {
  useEffect(() => {
    const siteTitle = 'Trello';
    document.title = title ? `${title} | ${siteTitle}` : siteTitle;
  }, [title]);
}