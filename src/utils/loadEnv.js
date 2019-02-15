module.exports = (name, allowEmpty) => {
  if (!allowEmpty && !process.env[name]) {
    throw new Error(`Attempted to use undefined environment variable ${name}`);
  }

  return process.env[name] || "";
};
