const url = process.env.SYNC_URL;
const token = process.env.API_TOKEN;

const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
});

console.log("Status:", res.status);
console.log(await res.text());
if (!res.ok) process.exit(1);
