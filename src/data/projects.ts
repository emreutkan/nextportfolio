const projects = [
    {
        id: 1,
        title: "Mobile App - HealthTracker",
        shortDescription: "A comprehensive health monitoring application built with React Native",
        technologies: ["React Native", "Firebase", "Redux", "TypeScript", "Expo"],
        githubLink: "https://github.com/username/health-tracker",
        deploymentUrl: "https://expo.dev/@username/health-tracker",
        images: [
            "/images/projects/health-tracker-1.jpg",
            "/images/projects/health-tracker-2.jpg",
            "/images/projects/health-tracker-3.jpg"
        ],
        readme: `
      <h1>HealthTracker Mobile App</h1>
      
      <p>HealthTracker is a comprehensive mobile application designed to help users monitor and improve their health metrics. The app allows users to track their daily activities, nutrition, water intake, and sleep patterns.</p>
      
      <h2>Features</h2>
      
      <ul>
        <li>Daily activity tracking with step counter and distance calculation</li>
        <li>Nutrition tracker with calorie counter and macronutrient breakdown</li>
        <li>Water intake monitoring with customizable goals</li>
        <li>Sleep quality analysis with sleep cycle detection</li>
        <li>Goal setting and progress visualization</li>
        <li>Health insights and recommendations based on user data</li>
      </ul>
      
      <h2>Implementation Details</h2>
      
      <p>The app is built using React Native and Expo for cross-platform compatibility. Firebase is used for authentication, data storage, and real-time synchronization. Redux manages the application state, while TypeScript ensures type safety throughout the codebase.</p>
      
      <h3>Key Technical Challenges</h3>
      
      <p>One of the major challenges was implementing accurate step counting across different device sensors. This was solved by creating a custom accelerometer data processing algorithm that filters out false positives while maintaining count accuracy.</p>
      
      <p>Another significant challenge was optimizing battery usage while keeping tracking features running in the background. We implemented efficient background services that minimize power consumption while maintaining data accuracy.</p>
    `
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        shortDescription: "Full-stack e-commerce solution with advanced features",
        technologies: ["Next.js", "MongoDB", "Stripe", "TypeScript", "Tailwind CSS", "Redux"],
        githubLink: "https://github.com/username/ecommerce-platform",
        deploymentUrl: "https://ecommerce-demo.vercel.app",
        images: [
            "/images/projects/ecommerce-1.jpg",
            "/images/projects/ecommerce-2.jpg",
            "/images/projects/ecommerce-3.jpg"
        ],
        readme: `
      <h1>Advanced E-Commerce Platform</h1>
      
      <p>A modern, scalable e-commerce platform built with Next.js and MongoDB. This full-stack solution provides everything needed for a complete online shopping experience.</p>
      
      <h2>Key Features</h2>
      
      <ul>
        <li>Responsive product catalog with advanced filtering and search</li>
        <li>User authentication with multiple sign-in options</li>
        <li>Shopping cart with persistent storage</li>
        <li>Secure checkout process with Stripe integration</li>
        <li>Order management system for both customers and administrators</li>
        <li>Inventory management with real-time stock updates</li>
        <li>Admin dashboard with sales analytics and reporting</li>
      </ul>
      
      <h2>Technical Implementation</h2>
      
      <p>The platform uses Next.js for server-side rendering and static generation, providing excellent SEO optimization and performance. MongoDB Atlas serves as the database, offering scalability and flexibility for product data. State management is handled through Redux, while Stripe provides secure payment processing.</p>
      
      <h3>Performance Optimizations</h3>
      
      <p>Image optimization through Next.js Image component reduces bandwidth usage while maintaining visual quality. API routes are optimized with edge caching to reduce server load during high traffic periods.</p>
      
      <p>The checkout flow implements dynamic form validation to provide immediate feedback while minimizing unnecessary API calls. Cart data persists across sessions using a combination of local storage and database synchronization.</p>
    `
    },
    {
        id: 3,
        title: "Data Visualization Dashboard",
        shortDescription: "Interactive analytics dashboard with real-time data processing",
        technologies: ["React", "D3.js", "Node.js", "WebSocket", "PostgreSQL", "Express"],
        githubLink: "https://github.com/username/data-viz-dashboard",
        deploymentUrl: "https://data-dashboard-demo.netlify.app",
        images: [
            "/images/projects/dashboard-1.jpg",
            "/images/projects/dashboard-2.jpg",
            "/images/projects/dashboard-3.jpg"
        ],
        readme: `
      <h1>Interactive Data Visualization Dashboard</h1>
      
      <p>A powerful data visualization platform that transforms complex data sets into intuitive, actionable insights through interactive charts and graphs.</p>
      
      <h2>Features</h2>
      
      <ul>
        <li>Real-time data streaming with WebSocket connections</li>
        <li>Interactive charts with zoom, pan, and filter capabilities</li>
        <li>Customizable dashboard layouts with drag-and-drop components</li>
        <li>Data export in multiple formats (CSV, JSON, Excel)</li>
        <li>Advanced filtering and data manipulation tools</li>
        <li>User-defined alerts based on data thresholds</li>
      </ul>
      
      <h2>Technical Details</h2>
      
      <p>The frontend is built with React for component-based UI development and D3.js for advanced data visualizations. The backend uses Node.js with Express to handle API requests and WebSockets for real-time data transmission. PostgreSQL with TimescaleDB extension stores time-series data efficiently.</p>
      
      <h3>Visualization Techniques</h3>
      
      <p>The dashboard implements various visualization techniques including area charts, scatter plots, heatmaps, and network graphs. Each visualization is optimized for performance, with data aggregation happening server-side for large datasets.</p>
      
      <p>Custom D3.js implementations allow for smooth animations and transitions between data states, providing users with visual context when data changes.</p>
    `
    },
    {
        id: 4,
        title: "AI Content Generator",
        shortDescription: "Machine learning-powered platform for automated content creation",
        technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker", "AWS"],
        githubLink: "https://github.com/username/ai-content-generator",
        deploymentUrl: "",
        images: [
            "/images/projects/ai-generator-1.jpg",
            "/images/projects/ai-generator-2.jpg",
            "/images/projects/ai-generator-3.jpg"
        ],
        readme: `
      <h1>AI Content Generator</h1>
      
      <p>An advanced machine learning platform that generates high-quality articles, blog posts, and marketing copy based on user prompts and specifications.</p>
      
      <h2>Key Features</h2>
      
      <ul>
        <li>Text generation with customizable tone, style, and length</li>
        <li>Image suggestion system that pairs relevant visuals with content</li>
        <li>SEO optimization recommendations for generated content</li>
        <li>Content editing workspace with AI-powered suggestions</li>
        <li>Batch processing for multiple content pieces</li>
        <li>User feedback system to improve generation quality over time</li>
      </ul>
      
      <h2>Technical Architecture</h2>
      
      <p>The system uses a fine-tuned language model based on GPT architecture, implemented in TensorFlow. The backend is built with Python and FastAPI for efficient model serving. The React frontend provides an intuitive interface for prompt engineering and content editing.</p>
      
      <h3>ML Pipeline</h3>
      
      <p>The machine learning pipeline includes several stages: prompt analysis, content structure planning, section generation, and final refinement. Each stage is tuned separately to optimize performance and quality.</p>
      
      <p>The system employs a hybrid approach that combines retrieval-based methods with generative models to ensure factual accuracy while maintaining creative content generation capabilities.</p>
    `
    }
]

export default projects