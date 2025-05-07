
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import Header from "@/components/Header";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import blogData from "@/data/blogs.json";

// Define the comment form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  comment: z.string().min(5, { message: "Comment must be at least 5 characters" })
});

type FormValues = z.infer<typeof formSchema>;

// Type for comment
interface Comment {
  id: number;
  name: string;
  date: string;
  comment: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: ""
    }
  });

  // Find the blog post based on slug
  useEffect(() => {
    const foundBlog = blogData.find(blog => blog.slug === slug);
    if (foundBlog) {
      setBlog(foundBlog);
      document.title = `${foundBlog.title} | Omsilver`;
      // Fetch comments for this blog post
      fetchComments(foundBlog.id);
    }
  }, [slug]);

  // Function to fetch comments from Google Sheets via App Script
  const fetchComments = async (blogId: number) => {
    setIsLoadingComments(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_GOOGLE_APPSCRIPT_API_URL}?action=getComments&blogId=${blogId}`);
      const data = await response.json();
      if (data.result === "success") {
        setComments(data.comments || []);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Function to handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!blog) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_APPSCRIPT_API_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "addComment",
          blogId: blog.id,
          name: values.name,
          email: values.email,
          comment: values.comment,
          date: new Date().toISOString()
        }),
      });
      
      const data = await response.json();
      
      if (data.result === "success") {
        toast.success("Comment submitted successfully!");
        form.reset();
        // Refresh comments
        fetchComments(blog.id);
      } else {
        toast.error("Failed to submit comment. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section for blog post */}
        <div 
          className="relative h-96 bg-cover bg-center" 
          style={{ backgroundImage: `url(${blog.image})` }}
        >
          <div className="absolute inset-0 bg-primary-darker bg-opacity-50"></div>
          <Container className="relative h-full flex flex-col justify-end pb-12">
            <div className="text-white max-w-3xl">
              <div className="mb-4 flex items-center">
                <Link to="/blog" className="text-silver hover:text-white transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
              <div className="flex items-center text-silver">
                <span>{new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}</span>
                <span className="mx-2">•</span>
                <span>By {blog.author}</span>
              </div>
            </div>
          </Container>
        </div>

        {/* Blog content */}
        <Container className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                {blog.content.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-6 text-gray-700 leading-relaxed">{paragraph}</p>
                ))}
              </article>
              
              {/* Tags */}
              <div className="mt-12 flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="bg-silver-light text-primary-dark px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments section */}
              <div className="mt-16">
                <h3 className="font-playfair text-2xl font-bold mb-8">Comments</h3>
                
                {/* Comment form */}
                <Card className="mb-12">
                  <CardContent className="pt-6">
                    <h4 className="text-xl font-bold mb-6">Leave a Comment</h4>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="comment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Comment</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Share your thoughts..." 
                                  className="min-h-32" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="bg-primary hover:bg-primary-dark text-white"
                          disabled={isLoading}
                        >
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isLoading ? "Submitting..." : "Post Comment"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                {/* Comments list */}
                <div className="space-y-6">
                  {isLoadingComments ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <Card key={comment.id} className="bg-silver-light border-none">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-bold">{comment.name}</h5>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-500">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* About author card */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h4 className="font-playfair text-lg font-bold mb-4">About the Author</h4>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light text-white flex items-center justify-center font-bold mr-4">
                      {blog.author.split(' ').map((part: string) => part[0]).join('')}
                    </div>
                    <div>
                      <h5 className="font-bold">{blog.author}</h5>
                      <p className="text-sm text-gray-500">Content Writer</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Our expert content writers have years of experience in the jewelry industry and are passionate about sharing knowledge about silver craftsmanship and care.
                  </p>
                </CardContent>
              </Card>
              
              {/* Recent posts */}
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-playfair text-lg font-bold mb-4">Recent Posts</h4>
                  <div className="space-y-4">
                    {blogData
                      .filter(post => post.id !== blog.id)
                      .slice(0, 3)
                      .map(post => (
                        <Link 
                          key={post.id} 
                          to={`/blog/${post.slug}`}
                          className="flex items-start gap-3 hover:bg-silver-light p-2 rounded-md transition-colors"
                        >
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <h5 className="font-medium text-sm line-clamp-2">{post.title}</h5>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(post.date).toLocaleDateString()}
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
