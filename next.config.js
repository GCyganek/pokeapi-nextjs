module.exports = {
  webpack(config, { dev, isServer }) {
    Object.assign(config.resolve.alias, {
      classnames: "clsx",
    });

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },

  pageExtensions: ["tsx"],
  fallback: true,
};
