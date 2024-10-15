import { useLayoutEffect } from 'react';

export const useDynamicContentHeight = (
    headerRef: React.RefObject<HTMLDivElement>,
    setMainContentHeight: (height: string) => void,
    paginationHeight: number = 116 // Default pagination height
) => {
    const updateContentHeight = () => {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

        // Use window.innerHeight to get the actual viewport height
        const viewportHeight = window.innerHeight;
        const navHeight = 50;
        const totalOtherHeights = headerHeight + paginationHeight + navHeight  ;

        // Subtract header and pagination heights from viewport height
        setMainContentHeight(`${viewportHeight - totalOtherHeights}px`);
    };

    useLayoutEffect(() => {
        const resizeListener = () => updateContentHeight();
        window.addEventListener('resize', resizeListener);

        // Initial run after mounting
        setTimeout(updateContentHeight, 100);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, [
        headerRef,
        paginationHeight, // Include paginationHeight in dependencies
    ]); // Depend on headerRef and paginationHeight
};
