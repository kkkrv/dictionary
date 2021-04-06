module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};

process.env = Object.assign(process.env, {
  NODE_ENV: 'test',
});
