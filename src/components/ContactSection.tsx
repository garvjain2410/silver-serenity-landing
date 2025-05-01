import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    productInterest: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Here in a real application, you would connect to Google Sheets using Apps Script
      // The following is a mockup of that process
      await fetch("https://script.google.com/macros/s/AKfycbx8ua_SXfpJfWEnn53_JwsR3AYlwXJnrZMZ6Ah92xCaidSCXYLXlXA67BvYNCw5rW7tlg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      
      toast.success("Your inquiry has been submitted successfully! We'll contact you soon.", {
        position: "bottom-right",
      });

      setFormState({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        productInterest: "",
        message: "",
      });
      
    } catch (error) {
      toast.error(`There was an error submitting your form. Please try again. ${error}`, {
        position: "bottom-right",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".slide-in");
    elements?.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements?.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section
    id="contact"
    className="py-24 bg-white relative"
    ref={sectionRef}
  >
    {/* Decorative elements */}
    {/* <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div> */}
    
    <Container>
        <SectionTitle
          title="Contact Us"
          subtitle="Ready to elevate your collection with our premium silver jewelry? Reach out to us for inquiries and partnership opportunities."
          centered
        />
        
        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <div className="slide-in">
            <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col">
              <div className="h-56 bg-charcoal relative overflow-hidden">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.546149148594!2d72.82932367547846!3d18.951472682227692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf0b22d4b015%3A0x1a3eacc710ab50d9!2sOm%20silver!5e0!3m2!1sen!2sin!4v1745854987489!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen= {true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  ></iframe>
              </div>
              
              <CardContent className="px-6 py-4 flex-1 flex flex-col">
                <div className="space-y-1">
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="bg-silver-light p-3 rounded-full">
                      <Phone className="h-6 w-6 text-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-medium font-playfair mb-1">Contact</h3>
                      <p className="text-muted-foreground">+91 (22) 2351-7890</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="bg-silver-light p-3 rounded-full">
                      <Mail className="h-6 w-6 text-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-medium font-playfair mb-1">Email</h3>
                      <p className="text-muted-foreground">info@omsilver.in</p>
                      <p className="text-muted-foreground">wholesale@omsilver.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="bg-silver-light p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-medium font-playfair mb-1">Visit Us</h3>
                      <p className="text-muted-foreground">Dhanji Street, Mumbai</p>
                      <p className="text-muted-foreground">Maharashtra 400003, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-8 flex-wrap">
                    <a href="#" className="bg-silver-light p-3 rounded-full hover:bg-silver transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-silver-light p-3 rounded-full hover:bg-silver transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.014-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-silver-light p-3 rounded-full hover:bg-silver transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="slide-in" style={{ transitionDelay: "200ms" }}>
          <Card className="border-0 shadow-lg flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="font-playfair text-2xl font-bold mb-6">Wholesale Inquiry</h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="border-silver"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="border-silver"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="border-silver"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="businessType" className="block text-sm font-medium mb-1">
                          Business Type
                        </label>
                        <Select 
                          value={formState.businessType}
                          onValueChange={(value) => handleSelectChange("businessType", value)}
                        >
                          <SelectTrigger className="border-silver">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="online">Online Shop</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="designer">JewelleryDesigner</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="productInterest" className="block text-sm font-medium mb-1">
                          Product Interest
                        </label>
                        <Select 
                          value={formState.productInterest}
                          onValueChange={(value) => handleSelectChange("productInterest", value)}
                        >
                          <SelectTrigger className="border-silver">
                            <SelectValue placeholder="Select product interest" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="necklaces">Necklaces</SelectItem>
                            <SelectItem value="earrings">Earrings</SelectItem>
                            <SelectItem value="bracelets">Bracelets</SelectItem>
                            <SelectItem value="rings">Rings</SelectItem>
                            <SelectItem value="all">All Products</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your business and requirements"
                        className="border-silver"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gold hover:bg-gold/90 text-charcoal"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Send Inquiry"}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Your data is securely processed and we'll never share your information with third parties.
                    </p>
                  </div>
                </form>
                
                {/* Google Apps Script Note (hidden in comment) */}
                {/* 
                Google Apps Script Example to Collect Form Data into Google Sheets
                function doPost(e){
                  var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Sheet1");
                  var data = JSON.parse(e.postData.contents);
                  sheet.appendRow([
                    new Date(),
                    data.name,
                    data.email,
                    data.phone,
                    data.inquiryType,
                    data.message
                  ]);
                  return ContentService.createTextOutput(
                    JSON.stringify({result: "Success"})
                  ).setMimeType(ContentService.MimeType.JSON);
                }
                */}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
