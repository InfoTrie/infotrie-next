// ============================================================
// InfoTrie Site Configuration
// All content, navigation, and metadata in one place.
// Edit this file to update site content without touching components.
// ============================================================

export const siteConfig = {
  name: "InfoTrie",
  tagline: "Alternative Data Specialist, AI & Financial IT Consulting",
  description:
    "InfoTrie, founded in 2012, is a leading AI and consulting company. We specialize in alternative data, sentiment analysis, financial engineering, and quantitative modelling.",
  url: "https://infotrie.com",
  contact: {
    email: "contact@infotrie.com",
    headquarters: "Singapore",
    offices: ["Singapore", "India", "Europe"],
  },
  social: {
    linkedin: "https://www.linkedin.com/company/infotrie",
    // Add more social links here
  },
  founded: 2012,
  copyright: `© ${new Date().getFullYear()} InfoTrie. All rights reserved.`,
};

// ============================================================
// Navigation
// ============================================================

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "FinSentS", href: "/products/finsents" },
      { label: "DocuTrie", href: "/products/docutrie" },
      { label: "iFeed API", href: "/products/ifeed-api" },
    ],
  },
  {
    label: "Data",
    href: "/data",
    children: [
      { label: "Alternative Data", href: "/data/alternative" },
      { label: "Financial Data", href: "/data/financial" },
      { label: "Fundamental Data", href: "/data/fundamental" },
      { label: "End of Day Data", href: "/data/eod" },
      { label: "Sentiment Analysis", href: "/data/sentiment" },
      { label: "Corporate Actions", href: "/data/corporate-actions" },
      { label: "News & Social Media", href: "/data/news-social" },
      { label: "E-Commerce Analytics", href: "/data/ecommerce" },
      { label: "Job Postings Data", href: "/data/job-postings" },
      { label: "SEC & Regulatory Filings", href: "/data/sec-filings" },
    ],
  },
  { label: "Data Specialist", href: "/data-specialist" },
  { label: "Consulting", href: "/consulting" },
  { label: "Documentation", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

// ============================================================
// Homepage Content
// ============================================================

export const heroContent = {
  headline: "Navigate the Sea of Data",
  subheadline:
    "AI-powered alternative data, sentiment analysis, and financial consulting — since 2012.",
  cta: { label: "Explore Products", href: "/products" },
  ctaSecondary: { label: "Contact Us", href: "/contact" },
};

export const keyMetrics = [
  { value: "100K+", label: "Companies Tracked" },
  { value: "15+", label: "Years of History" },
  { value: "2,000+", label: "News Sources" },
  { value: "60+", label: "Countries Covered" },
];

// ============================================================
// Products
// ============================================================

export const products = [
  {
    slug: "finsents",
    name: "FinSentS",
    tagline: "Financial News & Sentiment Screener",
    description:
      "Real-time sentiment analysis for 100,000+ assets. Cutting-edge NLP platform to extract and analyze massive flows of financial information, delivering actionable sentiment scores and alerts.",
    features: [
      "Real-time sentiment scores for stocks, ETFs, commodities, crypto",
      "Coverage of 2,000+ global business news outlets",
      "1,000+ financial social media sources",
      "History back to 2012",
      "Low-latency push APIs",
      "Multi-language support",
    ],
    icon: "📊",
  },
  {
    slug: "docutrie",
    name: "DocuTrie",
    tagline: "AI-Powered OCR Engine",
    description:
      "Extract and classify data from structured and unstructured documents with AI-powered optical character recognition. Transform unstructured data into actionable intelligence.",
    features: [
      "AI-powered document parsing",
      "Structured & unstructured data extraction",
      "Multi-format support",
      "Automated classification",
      "High-accuracy recognition",
      "Enterprise-grade throughput",
    ],
    icon: "📄",
  },
  {
    slug: "ifeed-api",
    name: "iFeed API",
    tagline: "Low-Latency Scalable Data API",
    description:
      "High-tech data collection at incredible scale. Access alternative and smart data across diverse sources — from social media feeds to economic indicators — through a robust, low-latency API.",
    features: [
      "Real-time & scheduled delivery",
      "Multiple data formats (JSON, CSV, XML)",
      "Scalable infrastructure",
      "Custom data pipelines",
      "Comprehensive documentation",
      "99.9% uptime SLA",
    ],
    icon: "🔌",
  },
];

// ============================================================
// Services (Consulting)
// ============================================================

export const consultingServices = [
  {
    title: "Financial IT Consulting",
    description:
      "15+ years of real-world experience in developing and operating complex treasury systems projects. Independent advisory, gap analysis, and project management.",
  },
  {
    title: "Custom Data Pipelines",
    description:
      "End-to-end data pipeline creation — from collection and processing to delivery. Tailored to your specific business requirements.",
  },
  {
    title: "AI & Predictive Analytics",
    description:
      "Smart agents and predictive analytics solutions powered by LLMs and advanced NLP. Transform your data into actionable intelligence.",
  },
  {
    title: "Project Management",
    description:
      "Qualified project managers and service delivery experts. Onshore and offshore delivery capabilities for complex outsourced solutions.",
  },
];

// ============================================================
// Data Categories
// ============================================================

export const dataCategories = [
  {
    slug: "alternative",
    name: "Alternative Data",
    short: "E-commerce, job postings, web data and more",
    icon: "🌐",
  },
  {
    slug: "financial",
    name: "Financial Data",
    short: "EOD, fundamentals, corporate actions, profiles",
    icon: "💹",
  },
  {
    slug: "fundamental",
    name: "Fundamental Data",
    short: "Financial statements, balance sheets, cash flows",
    icon: "📈",
  },
  {
    slug: "eod",
    name: "End of Day Data",
    short: "Stock prices, options, ETFs, commodities",
    icon: "🕐",
  },
  {
    slug: "sentiment",
    name: "Sentiment Analysis",
    short: "NLP-driven sentiment scores for 100K+ assets",
    icon: "🧠",
  },
  {
    slug: "corporate-actions",
    name: "Corporate Actions",
    short: "Dividends, splits, M&A, IPOs across 156 countries",
    icon: "🏢",
  },
  {
    slug: "news-social",
    name: "News & Social Media",
    short: "Curated feeds from 2,000+ global sources",
    icon: "📰",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Analytics",
    short: "Product reviews, ratings, marketplace intelligence",
    icon: "🛒",
  },
  {
    slug: "job-postings",
    name: "Job Postings Data",
    short: "Real-time job market insights and trends",
    icon: "💼",
  },
  {
    slug: "sec-filings",
    name: "SEC & Regulatory Filings",
    short: "Annual reports, ownership, 13F filings, and more",
    icon: "📋",
  },
];
