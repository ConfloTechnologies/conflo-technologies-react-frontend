import { useLayoutEffect } from 'react';

export const useDynamicContentHeight = (
    headerRef: React.RefObject<HTMLDivElement>,
    setMainContentHeight: (height: string) => void,
    // paginationHeight: number = 116 // Default pagination height in case you can't get it dynamically
) => {
    const updateContentHeight = () => {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

        // Use window.innerHeight instead of 100vh to get the actual viewport height
        // Using the provided paginationHeight instead of a ref for now
        // const paginationHeight = paginationRef.current ? paginationRef.current.offsetHeight : 0; // cant get this working for some reason

        const paginationHeight = 116+48;
        const viewportHeight = window.innerHeight;
        const totalOtherHeights = headerHeight + paginationHeight;

        // console.log('Viewport Height:', viewportHeight);
        // console.log('Header Height:', headerHeight);
        // console.log('Pagination Height:', paginationHeight);

        // console.log('Total Heights:', totalOtherHeights);

        // Subtract header and pagination heights from actual viewport height
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
        // paginationHeight
    ]); // Depend on headerRef and paginationHeight
};
