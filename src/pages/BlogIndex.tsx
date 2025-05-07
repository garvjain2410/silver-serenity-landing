
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import blogData from "@/data/blogs.json";

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter blogs based on search query
  const filteredBlogs = blogData.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Sort blogs by date (newest first)
  const sortedBlogs = [...filteredBlogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-primary-dark text-white py-16">
          <Container>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-center">Blog</h1>
            <p className="text-center text-silver max-w-2xl mx-auto">
              Discover the latest articles, care tips, and insights about silver jewelry from our experts.
            </p>
            
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-16">
          {searchQuery && (
            <div className="mb-8">
              <p className="text-gray-600">
                {sortedBlogs.length} {sortedBlogs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </p>
            </div>
          )}

          {sortedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBlogs.map((blog) => (
                <Link to={`/blog/${blog.slug}`} key={blog.id}>
                  <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary-dark opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="text-sm text-gray-500 mb-2 flex items-center justify-between">
                        <span>{new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long', 
                          day: 'numeric'
                        })}</span>
                      </div>
                      <h3 className="text-xl font-playfair font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {blog.excerpt}
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-playfair font-bold mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search. Try different keywords or browse all our articles.
              </p>
              <Button 
                variant="outline"
                onClick={() => setSearchQuery("")}
              >
                View All Articles
              </Button>
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogIndex;
