const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

export async function fetchfromCMS(endpoint: string) {
    if (!CMS_URL) {
        console.warn(`[CMS] NEXT_PUBLIC_CMS_URL is not defined. Skipping fetch for "${endpoint}".`);
        return null;
    }

    const fullURL = `${CMS_URL}/api/${endpoint}`;
    try {
        const response = await fetch(fullURL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${fullURL}.Status:${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }

}


