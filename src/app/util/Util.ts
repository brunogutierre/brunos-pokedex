export const Util = {
    getIdFromUrl(url: string): string | null {
        if (url) {
            let urlSplit = url.split('/');
            return urlSplit[urlSplit.length-2];
        }

        return null;
    }
};