import { writeFile } from 'node:fs/promises';
import { blogPosts } from '../src/data/blogData.js';
const routes = ['/', '/about', '/menu', '/banquet', '/catering', '/gallery', '/visiting-hours', '/booking', '/blog', '/menu-kit', '/contact', ...blogPosts.map((post) => `/blog/${post.slug}`)];
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map((route) => `  <url><loc>https://bar.mspixelpulse.com${route}</loc></url>`).join('\n') + '\n</urlset>\n';
await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`Generated Aurelia sitemap with ${routes.length} bar destinations.`);
