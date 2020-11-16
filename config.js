const proxy = [
  { path: ['/api'], target: 'http://localhost:5000'},  // 本地
];

module.exports = {
  ip: "localhost",
  // ip: "192.168.11.30",
  port: 3007,
  proxy
};
