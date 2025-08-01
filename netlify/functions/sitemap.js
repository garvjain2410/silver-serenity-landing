const admin = require('firebase-admin');

// Add Firebase configuration directly in the function to avoid path issues
const firebaseConfig = {
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  clientEmail: process.env.VITE_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

const db = admin.firestore();

// Utility function to escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (char) {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

exports.handler = async (event, context) => {
  try {
    // Fetch blog data from Firestore
    const blogsSnapshot = await db.collection('blogPosts').get();
    const blogs = blogsSnapshot.docs.map(doc => ({
      slug: doc.data().slug,
      updatedAt: doc.data().metadata.datePublished, 
      title: doc.data().metadata.title, 
      description: doc.data().metadata.description, 
    }));

    // Fetch product data from Firestore
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.data().id, // Use the `id` field from the document data
      updatedAt: doc.data().metadata?.lastUpdated || new Date().toISOString(), 
      category: doc.data().category, 
    }));

    const categories = [...new Set(products.map(product => product.category))];

    const categoryUrls = categories.map(category => `
      <url>
        <loc>${escapeXml(`https://omsilver.in/products/category/${category}`)}</loc>
        <lastmod>${escapeXml(new Date().toISOString())}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('');

    const blogUrls = blogs.map(blog => `
      <url>
        <loc>${escapeXml(`https://omsilver.in/blog/${blog.slug}`)}</loc>
        <lastmod>${escapeXml(blog.updatedAt)}</lastmod>
        <changefreq>never</changefreq>
        <priority>0.6</priority>
      </url>
    `).join('');

    const productUrls = products.map(product => `
      <url>
        <loc>${escapeXml(`https://omsilver.in/products/${product.id}`)}</loc>
        <lastmod>${escapeXml(product.updatedAt)}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('');

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
      
      <!-- Dynamic Product Categories -->
      ${categoryUrls}

      <!-- Individual Products -->
      ${productUrls}

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