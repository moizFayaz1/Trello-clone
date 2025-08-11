import { useEffect, useRef } from "react";

// Simple intersection observer hook
export default function useInfiniteScroll(callback, canLoadMore, loading) {
  const observerRef = useRef();

  useEffect(() => {
    const currentRef = observerRef.current;
    if (loading) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && canLoadMore) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [callback, canLoadMore, loading]);

  return observerRef;
}
