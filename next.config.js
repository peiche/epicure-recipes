const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        localPatterns: [
            {
                pathname: '/public/processed/*',
            }
        ],
    },
};

module.exports = nextConfig;
