import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
};

export default nextConfig;

// Enables the Cloudflare bindings/dev-server integration when running `next dev`.
// noinspection JSIgnoredPromiseFromCall
initOpenNextCloudflareForDev();
