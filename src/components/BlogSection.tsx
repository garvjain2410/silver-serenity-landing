import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData.slice(0, 3)); // Limit to 3 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-16 bg-white">
      <Container>
        <SectionTitle
          subtitle="Latest Articles"
          title="Our Blog"
          description="Discover expert insights, care tips, and fascinating stories about silver jewelry from our artisans and experts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogs.map((blog) => (
            <Link to={`/blog/${blog.slug}`} key={blog.id}>
              <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={blog.images[0]?.url}
                    alt={blog.images[0]?.altText}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-dark opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-gray-500 mb-2 flex items-center justify-between">
                    <span>{new Date(blog.metadata.datePublished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}</span>
                  </div>
                  <h3 className="text-xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {blog.metadata.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    <ReactMarkdown>{blog.metadata.description}</ReactMarkdown>
                  </p>
                  <div className="flex items-center text-primary font-medium mt-auto">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors duration-300 font-medium"
          >
            View All Articles
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;
