
const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // Fetch blog data from the backend
    const { data: blogs } = await axios.get('https://api.omsilver.in/blogs'); // Replace with your API endpoint

    // Generate dynamic blog URLs
    const blogUrls = blogs.map(blog => `
      <url>
        <loc>https://omsilver.in/blog/${blog.slug}</loc>
        <lastmod>${blog.updatedAt}</lastmod>
        <changefreq>never</changefreq>
        <priority>0.6</priority>
      </url>
    `).join('');

    // Construct the sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Main Pages -->
      <url>
        <loc>https://omsilver.in/</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>https://omsilver.in/testimonials</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://omsilver.in/contact</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://omsilver.in/blog</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      
      <!-- Product Categories -->
      <url>
        <loc>https://omsilver.in/products/category/murti</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products/category/payal</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products/category/rings</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products/category/bracelets</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products/category/chains</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>

      <!-- Individual Products -->
      <url>
        <loc>https://omsilver.in/products/1</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products/2</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://omsilver.in/products/3</loc>
        <lastmod>2025-05-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>

      <!-- Dynamic Blog Posts -->
      ${blogUrls}
    </urlset>`;

    // Return the sitemap as an XML response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/xml' },
      body: sitemap,
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return {
      statusCode: 500,
      body: 'Error generating sitemap',
    };
  }
};