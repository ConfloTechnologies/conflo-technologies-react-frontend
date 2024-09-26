class ServiceUtil {
    /**
     * Extracts the final part of the current URL, typically an ID.
     * @returns {string} The final part of the URL.
     */
    extrapolateFinalIdFromUrl(): string {
        try {
            const url = window.location.href; 
            const parts = url.split('/'); 
            const id = parts[parts.length - 1];
            if (!id) {
                throw new Error('No ID found in the URL');
            }
            return id;
        } catch (error) {
            console.error('Error extracting ID from URL:', error);
            throw error;
        }
    }
}

const serviceUtil = new ServiceUtil();
export default serviceUtil;
