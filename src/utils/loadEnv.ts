export default function loadEnv(name: string, allowEmpty?: boolean) {
  if (!allowEmpty && !process.env[name]) {
    throw new Error(`Attempted to use undefined environment variable ${name}`);
  }

  return process.env[name] || "";
}