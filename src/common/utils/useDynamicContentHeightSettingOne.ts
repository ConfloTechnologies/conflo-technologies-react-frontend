import { useLayoutEffect } from 'react';

export const useDynamicContentHeight = (
    headerRef: React.RefObject<HTMLDivElement>,
    // paginationRef: React.RefObject<HTMLDivElement>,
    setMainContentHeight: (height: string) => void, // Default pagination height in case you can't get it dynamically
) => {
    const updateContentHeight = () => {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
        // Using the provided paginationHeight instead of a ref for now
        // const paginationHeight = paginationRef.current ? paginationRef.current.offsetHeight : 0; // cant get this working for some reason
        const paginationHeight = 118;
        const totalOtherHeights = headerHeight + paginationHeight;

        console.log('Header Height:', headerHeight);
        console.log('Pagination Height:', paginationHeight);
        console.log('Total Heights:', totalOtherHeights);

        setMainContentHeight(`calc(100vh - ${totalOtherHeights}px)`);
    };

    useLayoutEffect(() => {
        const resizeListener = () => updateContentHeight();
        const orientationChangeListener = () => updateContentHeight();

        window.addEventListener('resize', resizeListener);
        window.addEventListener('orientationchange', orientationChangeListener); // Listen for orientation changes

        // Initial run after mounting
        setTimeout(updateContentHeight, 100);

        return () => {
            window.removeEventListener('resize', resizeListener);
            window.removeEventListener('orientationchange', orientationChangeListener);
        };
    }, [
        headerRef,
        // paginationHeight
        ]
    );

};
