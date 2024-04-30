import { RefObject, useState, useEffect } from "react";

function useIntersectionObserver(
    elementRef: RefObject<Element>,
    { threshold = 0.1, root = null, rootMargin = "0%" }
) {
    // IntersectionObserver 결과 저장
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    console.log(entry);

    // 관찰 결과를 받아와서 entry 상태를 업데이트
    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        // 현재 관찰하는 DOM요소를 가져온다.
        const node = elementRef?.current;
        // window가 IntersectionObserver를 지원하는지 지원 여부 확인
        const hasIOSupport = !!window.IntersectionObserver;

        // 지원하지않으면 return
        if (!node || !hasIOSupport) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        // 관찰 시작
        observer.observe(node);

        // 언마운트 시 관찰을 중지
        return () => observer.disconnect();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

    return entry;
}

export default useIntersectionObserver;
