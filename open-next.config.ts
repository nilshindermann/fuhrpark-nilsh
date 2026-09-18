import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

/**
 * Prerendered pages (including the SSG vehicle pages from generateStaticParams)
 * are served from the incremental cache, not from the assets folder. Without
 * a cache override the worker has nowhere to read them from and answers 404.
 * The static-assets cache is read-only, which is all this site needs: no ISR,
 * no revalidation.
 */
export default defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
});
