const nextConfig = {
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
