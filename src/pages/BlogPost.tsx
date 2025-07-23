import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the blog post based on slug
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, "blogPosts"), where("slug", "==", slug)); // Updated field path
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const blogData = querySnapshot.docs[0].data();
          setBlog(blogData);
          document.title = blogData.metadata.title;
        } else {
          console.error("Blog not found");
          setError("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("An error occurred while fetching the blog.");
      }
    };

    fetchBlog();
  }, [slug]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as { slug: string; metadata: any }) }));
        setRecentPosts(blogsData.filter(post => post.slug !== slug).slice(0, 3));
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, [slug]);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative h-96 bg-primary-darker bg-opacity-50">
          <Container className="relative h-full flex flex-col justify-end pb-12">
            <div className="text-white max-w-3xl">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{blog.metadata.title}</h1>
              <div className="flex items-center text-silver">
                <span>{new Date(blog.metadata.datePublished).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span className="mx-2">•</span>
                <span>
                  By {typeof blog.metadata.author === "object" && blog.metadata.author.name ? blog.metadata.author.name : blog.metadata.author}
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* Blog content */}
        <Container className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {blog.body?.sections?.length > 0 ? (
                blog.body.sections.map((section, index) => (
                  <section key={index} className="mb-8">
                    <h2 className="font-playfair text-2xl font-bold mb-4">{section.heading}</h2>
                    <div className="text-gray-700 mb-4">
                      <ReactMarkdown>
                        {typeof section.content === "string" ? section.content : ""}
                      </ReactMarkdown>
                    </div>
                    {section.subsections?.map((subsection, subIndex) => (
                      <div key={subIndex} className="mb-6">
                        <h3 className="font-playfair text-xl font-semibold mb-2">{subsection.subheading}</h3>
                        <ReactMarkdown>
                          {typeof subsection.content === "string" ? subsection.content : ""}
                        </ReactMarkdown>
                      </div>
                    ))}
                  </section>
                ))
              ) : (
                <p className="text-gray-600">No content available for this blog post.</p>
              )}

              {/* Lists */}
              {blog.body?.lists?.length > 0 && (
                <div className="mt-12">
                  {blog.body.lists.map((list, index) => (
                    <div key={index} className="mb-8">
                      <h4 className="font-playfair text-xl font-bold mb-4">{list.title}</h4>
                      <ul className={`list-${list.listType === "ordered" ? "decimal" : "disc"} pl-6`}>
                        {list.items.map((item, i) => (
                          <li key={i} className="mb-2">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQs */}
              {blog.body?.faqs?.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-playfair text-2xl font-bold mb-6">FAQs</h3>
                  {blog.body.faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* External Links */}
              {blog.externalLinks?.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-playfair text-2xl font-bold mb-6">External Links</h3>
                  <ul>
                    {blog.externalLinks.map((link, index) => (
                      <li key={index} className="mb-2">
                        <a href={link.url} target="_blank" rel={link.rel} className="text-blue-600 hover:underline">
                          {link.title}
                        </a>
                        <p className="text-sm text-gray-500">{link.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Internal Links */}
              {blog.internalLinks?.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-playfair text-2xl font-bold mb-6">Internal Links</h3>
                  <ul>
                    {blog.internalLinks.map((link, index) => (
                      <li key={index} className="mb-2">
                        <Link to={link.url} className="text-blue-600 hover:underline">
                          {link.title}
                        </Link>
                        <p className="text-sm text-gray-500">{link.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call to Action */}
              {blog.callToAction && (
                <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg shadow-md">
                  <p className="text-lg font-semibold text-blue-800 mb-4">{blog.callToAction.text}</p>
                  <a 
                    href={blog.callToAction.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {blog.callToAction.buttonText}
                  </a>
                </div>
              )}

              {/* Metadata Schema Markup */}
              {blog.metadata?.schemaMarkup && (
                <script type="application/ld+json">
                  {JSON.stringify(blog.metadata.schemaMarkup)}
                </script>
              )}

              {/* Feedback Prompt */}
              {blog.feedbackPrompt && (
                <div className="mt-12 text-center bg-gray-100 p-6 rounded-lg">
                  <p className="text-lg font-semibold mb-4">{blog.feedbackPrompt.text}</p>
                  {blog.feedbackPrompt.type === "rating" && (
                    <div className="flex justify-center gap-4">
                      {blog.feedbackPrompt.options.map((option, index) => (
                        <button
                          key={index}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => window.open(blog.feedbackPrompt.actionUrl, "_blank")}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Recent posts */}
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-playfair text-lg font-bold mb-4">Recent Posts</h4>
                  <div className="space-y-4">
                    {recentPosts.map(post => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="flex items-start gap-3 hover:bg-silver-light p-2 rounded-md transition-colors"
                      >
                        <div>
                          <h5 className="font-medium text-sm line-clamp-2">{post.metadata.title}</h5>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.metadata.datePublished).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
