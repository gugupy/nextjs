/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nextjs',
  output: 'export',
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  env: {
    NEXT_VERBOSE: 'true',
  },
};

export default nextConfig;