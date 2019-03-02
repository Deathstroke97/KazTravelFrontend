module.exports = {
  apps : [{
    name      : "kaz_travel",
    script    : "./server/index.js",
    instances : 1,
    kill_timeout: 1600,
    exec_mode : "cluster_mode",
    max_memory_restart: "2G",
    env:                {
      "PM2_GRACEFUL_LISTEN_TIMEOUT": 1000,
      "PM2_GRACEFUL_TIMEOUT":        5000,
      "ASSET_VERSIONING":            "file",
      "NODE_ENV":                    "production"
    }
  }]
}
