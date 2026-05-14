export interface Chapter {
  id: number;
  title: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  topics: Topic[];
  quiz: QuizQuestion[];
  exam: Exam;
  challenges: Challenge[];
  miniProject: MiniProject;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: CodeExample;
  tips?: string[];
  commonMistakes?: string[];
  bestPractices?: string[];
  realWorldExample?: string;
}

export interface CodeExample {
  language: string;
  code: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exam {
  trueFalse: TrueFalseQuestion[];
  mcq: QuizQuestion[];
  codingQuestion: CodingQuestion;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
}

export interface CodingQuestion {
  prompt: string;
  starterCode: string;
  expectedKeywords: string[];
  hint: string;
  sampleAnswer: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  starterCode: string;
  expectedKeywords: string[];
  hint: string;
}

export interface MiniProject {
  title: string;
  description: string;
  steps: string[];
  starterCode: string;
  expectedKeywords: string[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    slug: "intro",
    icon: "🌐",
    color: "blue",
    description: "Learn the history, architecture, and foundational concepts of web development including client-server model, front-end vs back-end, and setting up your environment.",
    topics: [
      {
        id: "1.1",
        title: "What is the World Wide Web?",
        content: `The World Wide Web (WWW) is a system of interconnected documents and resources, linked by hyperlinks and accessed via the Internet. It was invented by Tim Berners-Lee in 1989 at CERN.

**Key Concepts:**
- **Web page**: A document displayed in a web browser, written in HTML
- **Website**: A collection of related web pages under a single domain
- **Web browser**: Software that retrieves and displays web pages (Chrome, Firefox, Edge, Safari)
- **URL (Uniform Resource Locator)**: The address of a resource on the web

The Web is NOT the Internet. The Internet is the global network infrastructure; the Web is one of many services that runs on top of it. Other internet services include email (SMTP), file transfer (FTP), and more.`,
        codeExample: {
          language: "text",
          code: `URL Anatomy:
https://www.example.com:443/path/to/page?query=value#section

Protocol: https://
Subdomain: www.
Domain:    example.com
Port:      :443 (default for HTTPS, usually hidden)
Path:      /path/to/page
Query:     ?query=value
Fragment:  #section`,
          explanation: "Every URL has specific parts. Understanding them helps you navigate, link resources, and build APIs correctly.",
        },
        tips: [
          "The Internet ≠ The Web. The Internet is the physical infrastructure; the Web is a service on top of it.",
          "HTTPS is the secure version of HTTP — always use it for production sites.",
          "DNS (Domain Name System) translates domain names like 'google.com' into IP addresses like '142.250.80.46'.",
        ],
        commonMistakes: [
          "Confusing the Internet with the Web — they are different things.",
          "Forgetting that 'www' is just a subdomain — many sites work without it.",
          "Not understanding that HTTP and HTTPS use different default ports (80 vs 443).",
        ],
        bestPractices: [
          "Always use HTTPS in production to protect user data.",
          "Use descriptive, readable URLs for better SEO and usability.",
          "Keep URLs short and meaningful — avoid unnecessary query parameters.",
        ],
        realWorldExample: "When you type 'google.com' in your browser, your computer asks a DNS server for Google's IP address, connects to that server via TCP/IP, sends an HTTP request, and receives an HTML page in return — all in milliseconds.",
      },
      {
        id: "1.2",
        title: "History of the Web",
        content: `**Timeline of the Web:**

| Year | Event |
|------|-------|
| 1969 | ARPANET — the precursor to the Internet — first connects universities |
| 1989 | Tim Berners-Lee proposes the World Wide Web at CERN |
| 1991 | First website ever published (info.cern.ch) |
| 1993 | Mosaic browser released — first graphical browser |
| 1994 | Netscape Navigator dominates; W3C founded |
| 1995 | JavaScript created by Brendan Eich in 10 days; CSS proposed |
| 1998 | Google founded; CSS2 released |
| 2004 | Firefox released; Web 2.0 era begins |
| 2007 | iPhone launches — mobile web becomes critical |
| 2008 | Chrome browser released; HTML5 drafted |
| 2014 | HTML5 officially standardized by W3C |
| 2015 | ES6 (modern JavaScript) released |
| 2017+ | Progressive Web Apps, WebAssembly, AI-driven web |

**Web Generations:**
- **Web 1.0 (1991-2004)**: Static, read-only pages. Websites were like online brochures.
- **Web 2.0 (2004-2014)**: Dynamic, interactive, social. Users create content (YouTube, Facebook, Twitter).
- **Web 3.0 (2014+)**: Semantic web, AI integration, decentralization, Progressive Web Apps.`,
        tips: [
          "JavaScript was created in just 10 days — this explains some of its quirks!",
          "HTML, CSS, and JavaScript are the only three languages that run natively in browsers.",
          "The first website (info.cern.ch) is still online and describes the World Wide Web project.",
        ],
        realWorldExample: "Web 2.0 enabled platforms like Wikipedia, where millions of users contribute content instead of just consuming it.",
      },
      {
        id: "1.3",
        title: "Client-Server Architecture",
        content: `The web is built on a **client-server model**. Every web interaction involves two parties:

**Client (Browser):**
- Sends requests (GET, POST, etc.)
- Renders HTML, CSS, JavaScript
- Examples: Chrome, Firefox, Edge

**Server:**
- Receives requests and sends responses
- Hosts files, databases, and application logic
- Examples: Apache, Nginx, Node.js

**The Request-Response Cycle:**
1. User types a URL or clicks a link
2. Browser performs a DNS lookup to find the server's IP
3. Browser opens a TCP connection to the server
4. Browser sends an **HTTP Request** (GET /index.html HTTP/1.1)
5. Server processes the request
6. Server sends an **HTTP Response** with status code + content
7. Browser parses HTML, requests CSS/JS/images
8. Browser renders the complete page

**Common HTTP Status Codes:**
- **200 OK** — Everything worked fine
- **301/302** — Redirect to another URL
- **404 Not Found** — Resource doesn't exist
- **500 Internal Server Error** — Server crashed`,
        codeExample: {
          language: "http",
          code: `// HTTP Request (sent by browser)
GET /index.html HTTP/1.1
Host: www.example.com
Accept: text/html
User-Agent: Mozilla/5.0

// HTTP Response (sent by server)
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

<!DOCTYPE html>
<html>...page content...</html>`,
          explanation: "HTTP requests and responses are plain text messages. The browser sends a request, the server sends back a response with a status code and content.",
        },
        tips: [
          "HTTP (port 80) is unencrypted; HTTPS (port 443) encrypts traffic using TLS.",
          "Modern browsers reuse connections (HTTP/2 multiplexing) for better performance.",
          "Caching headers let browsers store responses and avoid re-downloading unchanged files.",
        ],
        bestPractices: [
          "Always validate and sanitize data on the server — never trust the client.",
          "Use appropriate HTTP status codes to communicate results clearly.",
          "Implement caching headers to improve page load performance.",
        ],
      },
      {
        id: "1.4",
        title: "Front-End vs. Back-End Development",
        content: `Web development is typically divided into two sides:

**Front-End (Client Side):**
- What users see and interact with
- Technologies: HTML (structure), CSS (style), JavaScript (behavior)
- Runs in the user's browser
- Concerns: UI design, responsiveness, accessibility, performance

**Back-End (Server Side):**
- The logic behind the scenes — databases, authentication, APIs
- Technologies: Node.js, Python, PHP, Java, Go, Ruby, etc.
- Runs on a server
- Concerns: security, data management, scalability, API design

**Full-Stack Developer:**
- Works on both front-end and back-end
- Must understand the complete request-response lifecycle
- Frameworks: Next.js, Laravel, Django, Rails

**The API Bridge:**
Modern apps use APIs (Application Programming Interfaces) to separate front-end and back-end. The front-end sends requests to the API; the API returns JSON data that the front-end displays.`,
        codeExample: {
          language: "text",
          code: `┌─────────────────────────────────────────────┐
│              User's Browser                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  HTML    │  │  CSS     │  │JavaScript│  │
│  │Structure │  │ Styling  │  │Behavior  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└──────────────────┬──────────────────────────┘
                   │ HTTP/API Requests
┌──────────────────▼──────────────────────────┐
│              Web Server / API                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Routes  │  │Business  │  │Database  │  │
│  │  /API    │  │  Logic   │  │ (SQL/NoSQL│ │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘`,
          explanation: "The front-end and back-end communicate via HTTP. The front-end displays data; the back-end stores and processes it.",
        },
        tips: [
          "Start by mastering front-end skills — HTML, CSS, JavaScript are the universal entry point.",
          "REST APIs use JSON to transfer data between front-end and back-end.",
          "Full-stack frameworks like Next.js blend front-end and back-end in one project.",
        ],
      },
      {
        id: "1.5",
        title: "Web Technologies Overview",
        content: `The modern web ecosystem is vast. Here's a structured overview:

**Core Technologies (Runs in browsers):**
- **HTML5** — Markup language for structure and content
- **CSS3** — Stylesheet language for visual design
- **JavaScript** — Programming language for interactivity and logic

**CSS Frameworks & Preprocessors:**
- Bootstrap 5, Tailwind CSS, Bulma
- Sass/SCSS, Less

**JavaScript Frameworks & Libraries:**
- React, Vue.js, Angular (component-based UIs)
- Next.js, Nuxt.js (full-stack frameworks)
- jQuery (legacy but still widely used)

**Back-End Technologies:**
- **Node.js + Express** (JavaScript on server)
- **PHP + Laravel** (popular for CMS, e-commerce)
- **Python + Django/Flask** (data science, APIs)
- **Java + Spring Boot** (enterprise applications)

**Databases:**
- **Relational**: MySQL, PostgreSQL, SQLite
- **NoSQL**: MongoDB, Redis, Firebase

**Dev Tools:**
- Git & GitHub (version control)
- VS Code, WebStorm (editors)
- Chrome DevTools (debugging)
- npm, pnpm, yarn (package managers)`,
        tips: [
          "Don't try to learn everything at once — master HTML, CSS, and JavaScript first.",
          "React is the most in-demand front-end framework in 2024.",
          "Node.js lets you use JavaScript on the server — one language for full-stack!",
        ],
        realWorldExample: "Netflix uses React for the UI, Node.js for the API layer, and multiple databases including Cassandra for scaling to millions of users worldwide.",
      },
      {
        id: "1.6",
        title: "Setting Up Your Development Environment",
        content: `A proper development environment makes you productive. Here's what you need:

**Step 1: Install a Code Editor**
- Download **VS Code** (free, most popular): https://code.visualstudio.com
- Recommended extensions:
  - **Prettier** — automatic code formatting
  - **ESLint** — catch JavaScript errors
  - **Live Server** — auto-refresh browser on save
  - **HTML CSS Support** — autocomplete for HTML/CSS
  - **GitLens** — enhanced Git integration

**Step 2: Install Node.js**
- Download from https://nodejs.org (LTS version)
- Comes with **npm** (Node Package Manager)
- Verify: \`node --version\` and \`npm --version\`

**Step 3: Install Git**
- Download from https://git-scm.com
- Configure: \`git config --global user.name "Your Name"\`
- Configure: \`git config --global user.email "your@email.com"\`

**Step 4: Set Up a Browser**
- Use **Chrome** or **Firefox** for development
- Learn Chrome DevTools (press F12 to open):
  - **Elements** tab: inspect and edit HTML/CSS live
  - **Console** tab: run JavaScript and see errors
  - **Network** tab: monitor HTTP requests
  - **Sources** tab: debug JavaScript

**Step 5: Create Your First Project Folder**
- Create a folder structure: \`my-project/index.html\`, \`style.css\`, \`script.js\``,
        codeExample: {
          language: "bash",
          code: `# Check Node.js installation
node --version    # Should print v20.x.x or similar
npm --version     # Should print 10.x.x or similar

# Check Git installation
git --version     # Should print git version 2.x.x

# Create your first project
mkdir my-website
cd my-website
touch index.html style.css script.js

# Open in VS Code
code .`,
          explanation: "Use the terminal to check your tools are installed and create project files.",
        },
        tips: [
          "Use Live Server extension in VS Code to auto-refresh your browser when you save files.",
          "Learn keyboard shortcuts in VS Code — they'll save you hours every week.",
          "The Chrome DevTools 'Elements' panel lets you edit HTML and CSS live to experiment.",
        ],
      },
      {
        id: "1.7",
        title: "Career Paths in Web Development",
        content: `Web development offers many specializations:

**Front-End Developer**
- Skills: HTML, CSS, JavaScript, React/Vue/Angular, UI/UX basics
- Tools: Figma, webpack/Vite, browser DevTools
- Salary range: $60k–$120k (entry–senior)

**Back-End Developer**
- Skills: Node.js/Python/PHP, databases, REST/GraphQL APIs, security
- Tools: Postman, Docker, cloud platforms (AWS/Azure/GCP)
- Salary range: $70k–$140k

**Full-Stack Developer**
- Skills: Both front-end and back-end
- Most versatile and in-demand role
- Salary range: $80k–$150k+

**DevOps / Site Reliability Engineer**
- Skills: CI/CD, Docker, Kubernetes, cloud infrastructure
- Ensures apps are deployed, scaled, and monitored

**Mobile Web / PWA Developer**
- Builds Progressive Web Apps that work like native apps
- React Native, Flutter for cross-platform mobile

**Learning Path:**
HTML → CSS → JavaScript → Git → React → Node.js → Database → Deploy

**Job Readiness Checklist:**
☐ Build 3–5 portfolio projects
☐ Contribute to open source on GitHub
☐ Learn Git and version control
☐ Understand REST APIs
☐ Deploy at least one live project`,
        tips: [
          "Your GitHub portfolio matters more than your degree to many employers.",
          "Start with front-end — it gives you immediate visual feedback and quick wins.",
          "Network actively — attend meetups, join communities like Dev.to and Discord servers.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1-1",
        question: "Who invented the World Wide Web?",
        options: ["Bill Gates", "Tim Berners-Lee", "Brendan Eich", "Linus Torvalds"],
        correctIndex: 1,
        explanation: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.",
      },
      {
        id: "q1-2",
        question: "What does URL stand for?",
        options: ["Universal Resource Link", "Uniform Resource Locator", "Unique Reference Label", "Universal Remote Location"],
        correctIndex: 1,
        explanation: "URL stands for Uniform Resource Locator — the address of a resource on the web.",
      },
      {
        id: "q1-3",
        question: "Which HTTP status code means 'Not Found'?",
        options: ["200", "301", "404", "500"],
        correctIndex: 2,
        explanation: "404 means the requested resource was not found on the server.",
      },
      {
        id: "q1-4",
        question: "What is the default port for HTTPS?",
        options: ["80", "8080", "443", "3000"],
        correctIndex: 2,
        explanation: "HTTPS uses port 443 by default. HTTP uses port 80.",
      },
      {
        id: "q1-5",
        question: "Which language handles the STRUCTURE of a web page?",
        options: ["CSS", "JavaScript", "HTML", "SQL"],
        correctIndex: 2,
        explanation: "HTML (HyperText Markup Language) defines the structure and content of web pages.",
      },
      {
        id: "q1-6",
        question: "Who created JavaScript?",
        options: ["Tim Berners-Lee", "Brendan Eich", "Douglas Crockford", "Ryan Dahl"],
        correctIndex: 1,
        explanation: "Brendan Eich created JavaScript in 1995, originally in just 10 days.",
      },
      {
        id: "q1-7",
        question: "What does DNS stand for?",
        options: ["Domain Name System", "Dynamic Network Server", "Data Navigation Standard", "Digital Naming Service"],
        correctIndex: 0,
        explanation: "DNS (Domain Name System) translates human-readable domain names into IP addresses.",
      },
      {
        id: "q1-8",
        question: "In the client-server model, which role does a web browser play?",
        options: ["Server", "Client", "Database", "API"],
        correctIndex: 1,
        explanation: "Web browsers are clients — they request resources from servers and display them to users.",
      },
      {
        id: "q1-9",
        question: "What is a 'Full-Stack Developer'?",
        options: ["A developer who only does front-end", "A developer who only does back-end", "A developer who works on both front-end and back-end", "A developer who manages servers"],
        correctIndex: 2,
        explanation: "A full-stack developer works on both the client-side (front-end) and server-side (back-end) of applications.",
      },
      {
        id: "q1-10",
        question: "Which tool is used to inspect and debug HTML/CSS in the browser?",
        options: ["VS Code", "Git", "DevTools", "npm"],
        correctIndex: 2,
        explanation: "Browser DevTools (opened with F12) let you inspect HTML/CSS, debug JavaScript, and monitor network requests.",
      },
    ],
    exam: {
      trueFalse: [
        { id: "tf1-1", statement: "The Internet and the World Wide Web are the same thing.", answer: false, explanation: "The Internet is the physical network infrastructure; the Web is one service that runs on top of it." },
        { id: "tf1-2", statement: "Tim Berners-Lee invented the World Wide Web in 1989.", answer: true, explanation: "Tim Berners-Lee proposed the WWW while working at CERN in 1989." },
        { id: "tf1-3", statement: "HTTP uses port 443 by default.", answer: false, explanation: "HTTP uses port 80; HTTPS uses port 443." },
        { id: "tf1-4", statement: "HTML, CSS, and JavaScript are the only three languages that run natively in web browsers.", answer: true, explanation: "All browsers natively understand HTML, CSS, and JavaScript without plugins." },
        { id: "tf1-5", statement: "A 200 HTTP status code means the server encountered an error.", answer: false, explanation: "200 means 'OK' — the request succeeded." },
        { id: "tf1-6", statement: "Back-end code runs on the user's computer.", answer: false, explanation: "Back-end code runs on the server; front-end code runs in the user's browser." },
        { id: "tf1-7", statement: "JavaScript was created in 10 days by Brendan Eich.", answer: true, explanation: "Brendan Eich created JavaScript in just 10 days in 1995 while working at Netscape." },
        { id: "tf1-8", statement: "DNS translates domain names into IP addresses.", answer: true, explanation: "The Domain Name System maps human-readable hostnames to numerical IP addresses." },
        { id: "tf1-9", statement: "Front-end development deals with server-side logic and databases.", answer: false, explanation: "Front-end development is about the user interface (HTML, CSS, JS). Back-end handles server logic." },
        { id: "tf1-10", statement: "A URL can contain a path, query string, and fragment identifier.", answer: true, explanation: "URLs have the format: protocol://host/path?query#fragment" },
      ],
      mcq: [
        {
          id: "exam1-mcq1",
          question: "Which HTTP method is typically used to retrieve data from a server?",
          options: ["POST", "GET", "DELETE", "PUT"],
          correctIndex: 1,
          explanation: "GET requests retrieve data; POST creates data; PUT updates; DELETE removes.",
        },
        {
          id: "exam1-mcq2",
          question: "What does 'responsive design' mean in web development?",
          options: ["The page loads quickly", "The page adapts to different screen sizes", "The page responds to keyboard input", "The server responds fast"],
          correctIndex: 1,
          explanation: "Responsive design means the layout adjusts to fit different devices and screen sizes.",
        },
        {
          id: "exam1-mcq3",
          question: "What is the role of CSS in a web page?",
          options: ["Define content structure", "Control visual styling and layout", "Handle user interaction", "Manage server data"],
          correctIndex: 1,
          explanation: "CSS (Cascading Style Sheets) controls the presentation and layout of HTML elements.",
        },
        {
          id: "exam1-mcq4",
          question: "What does 'API' stand for?",
          options: ["Application Programming Interface", "Advanced Page Integration", "Automated Process Index", "Application Protocol Internet"],
          correctIndex: 0,
          explanation: "API stands for Application Programming Interface — a set of rules for how software should interact.",
        },
        {
          id: "exam1-mcq5",
          question: "Which year was HTML5 officially standardized?",
          options: ["2008", "2010", "2014", "2016"],
          correctIndex: 2,
          explanation: "HTML5 was officially standardized by the W3C in 2014.",
        },
        {
          id: "exam1-mcq6",
          question: "What is Git used for?",
          options: ["Styling web pages", "Version control and collaboration", "Running web servers", "Database management"],
          correctIndex: 1,
          explanation: "Git is a distributed version control system for tracking code changes and collaborating.",
        },
        {
          id: "exam1-mcq7",
          question: "Which browser DevTools panel lets you run JavaScript commands?",
          options: ["Elements", "Network", "Console", "Sources"],
          correctIndex: 2,
          explanation: "The Console panel lets you type and execute JavaScript commands directly in the browser.",
        },
        {
          id: "exam1-mcq8",
          question: "What is Node.js?",
          options: ["A CSS framework", "A database", "A JavaScript runtime that runs on servers", "A code editor"],
          correctIndex: 2,
          explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JS on the server.",
        },
        {
          id: "exam1-mcq9",
          question: "A 500 HTTP status code indicates:",
          options: ["Resource not found", "Access denied", "Internal server error", "Successful request"],
          correctIndex: 2,
          explanation: "500 (Internal Server Error) means the server encountered an unexpected condition.",
        },
        {
          id: "exam1-mcq10",
          question: "What is the purpose of a package manager like npm?",
          options: ["To edit HTML files", "To manage and install code libraries/dependencies", "To host websites", "To write CSS"],
          correctIndex: 1,
          explanation: "Package managers like npm, pnpm, and yarn install and manage third-party libraries.",
        },
      ],
      codingQuestion: {
        prompt: "Write a basic HTML document structure (DOCTYPE, html, head with title, and body) that creates a page titled 'My First Web Page' with an h1 heading saying 'Hello, Web Development!' and a paragraph saying 'I am learning web development.'",
        starterCode: `<!-- Write your HTML document here -->`,
        expectedKeywords: ["<!DOCTYPE html>", "<html", "<head>", "<title>", "<body>", "<h1>", "<p>"],
        hint: "Start with <!DOCTYPE html>, then <html>, <head> (contains <title>), and <body> tags.",
        sampleAnswer: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello, Web Development!</h1>
  <p>I am learning web development.</p>
</body>
</html>`,
      },
    },
    challenges: [
      {
        id: "ch1-1",
        title: "URL Parser",
        difficulty: "easy",
        description: "Write the different parts of the URL 'https://www.example.com:8080/products?category=books#reviews' as comments identifying each component.",
        starterCode: `/* Break down this URL into its parts:
   https://www.example.com:8080/products?category=books#reviews
   
   Protocol: 
   Subdomain: 
   Domain: 
   Port: 
   Path: 
   Query: 
   Fragment: 
*/`,
        expectedKeywords: ["https", "www", "example.com", "8080", "products", "category=books", "reviews"],
        hint: "Look at the URL structure: protocol://subdomain.domain:port/path?query#fragment",
      },
      {
        id: "ch1-2",
        title: "HTTP Status Code Matcher",
        difficulty: "medium",
        description: "Create an HTML list that shows 5 HTTP status codes with their meanings. Include: 200, 301, 404, 500, and 403.",
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>HTTP Status Codes</h1>
  <!-- Create an ordered list with 5 status codes and their meanings -->
  
</body>
</html>`,
        expectedKeywords: ["200", "301", "404", "500", "403", "<ol>", "<li>"],
        hint: "Use <ol> for ordered list and <li> for each item. Include the code and its meaning.",
      },
      {
        id: "ch1-3",
        title: "Client-Server Diagram",
        difficulty: "hard",
        description: "Write HTML that creates a visual representation of the client-server request-response cycle using a table or div structure. Show: Browser → DNS → Server → Database → Response.",
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add your styles here */
  </style>
</head>
<body>
  <h1>Client-Server Architecture</h1>
  <!-- Create your diagram here -->
  
</body>
</html>`,
        expectedKeywords: ["Browser", "DNS", "Server", "Database", "<table>", "<td>"],
        hint: "Use an HTML table with arrows (→) between each component to show the flow.",
      },
    ],
    miniProject: {
      title: "Personal Web Dev Profile Page",
      description: "Create a basic HTML page that serves as your web development profile. Include sections for: your name, why you want to learn web development, your goals, and technologies you want to learn.",
      steps: [
        "Create the HTML structure with DOCTYPE, html, head, and body",
        "Add a title in the head element",
        "Add an h1 with your name",
        "Add an h2 'About Me' section with a paragraph",
        "Add an h2 'My Goals' section with an unordered list",
        "Add an h2 'Technologies I Will Learn' section listing HTML, CSS, JavaScript, etc.",
        "Add a footer with the current year",
      ],
      starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Web Dev Profile</title>
</head>
<body>
  <!-- Your profile content goes here -->
  
</body>
</html>`,
      expectedKeywords: ["<!DOCTYPE html>", "<html", "<head>", "<title>", "<body>", "<h1>", "<h2>", "<p>", "<ul>", "<li>"],
    },
  },
  {
    id: 2,
    title: "HTML5",
    slug: "html",
    icon: "📄",
    color: "orange",
    description: "Master the language of the web — HTML5 structure, semantic elements, forms, multimedia, tables, links, and building complete web page layouts.",
    topics: [
      {
        id: "2.1",
        title: "Introduction to HTML",
        content: `**HTML** (HyperText Markup Language) is the standard language for creating web pages. It describes the **structure** and **content** of a page using **elements** represented by **tags**.

HTML is NOT a programming language — it's a markup language. It doesn't have logic or conditions; it simply marks up content.

**Key Concepts:**
- **Element**: A component of a web page (heading, paragraph, image, etc.)
- **Tag**: The code that defines an element, usually in pairs: \`<tag>content</tag>\`
- **Attribute**: Additional information inside the opening tag: \`<img src="photo.jpg" alt="A photo">\`
- **Self-closing tag**: Some elements don't need a closing tag: \`<br>\`, \`<img>\`, \`<input>\`

**How browsers render HTML:**
The browser reads HTML top-to-bottom, builds the Document Object Model (DOM) — a tree structure of all elements — then displays the visual result.`,
        codeExample: {
          language: "html",
          code: `<!-- This is an HTML comment — it won't be displayed -->

<!-- Basic element structure -->
<tagname attribute="value">Content goes here</tagname>

<!-- Example elements -->
<h1>This is a heading</h1>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
<a href="https://example.com">This is a link</a>
<img src="photo.jpg" alt="Description of photo">
<br>  <!-- Line break — self-closing -->
<hr>  <!-- Horizontal rule — self-closing -->`,
          explanation: "HTML elements consist of an opening tag, content, and closing tag. Self-closing elements like <br> and <img> have no content or closing tag.",
        },
        tips: [
          "Always close your tags — unclosed tags cause rendering bugs.",
          "HTML is case-insensitive, but use lowercase by convention.",
          "Attributes go inside the opening tag: <img src='...' alt='...'>",
        ],
        commonMistakes: [
          "Forgetting the closing tag: <p>content (missing </p>)",
          "Nesting elements incorrectly: <p><div>...</div></p> (block inside inline)",
          "Missing the alt attribute on images — critical for accessibility.",
        ],
        bestPractices: [
          "Always include the lang attribute on the <html> element: <html lang='en'>",
          "Use semantic elements to describe content meaning, not just appearance.",
          "Validate your HTML at validator.w3.org to catch errors.",
        ],
      },
      {
        id: "2.2",
        title: "HTML Document Structure",
        content: `Every valid HTML5 document follows a standard structure:

\`\`\`html
<!DOCTYPE html>          <!-- Tells browser this is HTML5 -->
<html lang="en">         <!-- Root element; lang sets language -->
  <head>                 <!-- Metadata (not visible to users) -->
    <meta charset="UTF-8">        <!-- Character encoding -->
    <meta name="viewport" ...>    <!-- Responsive design hint -->
    <meta name="description" ...> <!-- SEO description -->
    <title>Page Title</title>     <!-- Tab/window title (required) -->
    <link rel="stylesheet" href="style.css">  <!-- CSS file -->
    <script src="script.js" defer></script>   <!-- JS file -->
  </head>
  <body>                 <!-- Visible content goes here -->
    ...page content...
  </body>
</html>
\`\`\`

**The \`<head>\` element contains:**
- Character set declaration (\`<meta charset>\`)
- Viewport settings for responsive design
- Page title (shown in browser tab)
- SEO meta tags (description, keywords)
- Links to CSS files
- Script references

**The \`<body>\` element contains:**
- All visible content: headings, paragraphs, images, links, etc.`,
        codeExample: {
          language: "html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A complete HTML5 example page">
  <meta name="author" content="Your Name">
  <title>My Complete Page</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.ico">
</head>
<body>
  <header>
    <h1>Welcome to My Site</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <p>Main content goes here.</p>
  </main>
  
  <footer>
    <p>&copy; 2024 My Site</p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`,
          explanation: "This is a complete, valid HTML5 document. Note that scripts are placed at the bottom of <body> (or use defer attribute) to ensure the DOM is loaded before JavaScript runs.",
        },
        tips: [
          "The <title> tag is critical — it appears in browser tabs, bookmarks, and search results.",
          "Place <script> tags at the bottom of <body> or use the 'defer' attribute.",
          "UTF-8 charset supports almost all characters and languages worldwide.",
        ],
      },
      {
        id: "2.3",
        title: "HTML Elements & Tags",
        content: `**Headings (h1–h6):**
- \`<h1>\` is the most important, \`<h6>\` is least important
- Use only ONE \`<h1>\` per page (for SEO)
- Headings define page hierarchy — don't skip levels

**Text Elements:**
- \`<p>\` — Paragraph (block element)
- \`<strong>\` — Bold, semantically important
- \`<em>\` — Italic, semantically emphasized
- \`<span>\` — Inline container (no semantic meaning)
- \`<div>\` — Block container (no semantic meaning)
- \`<br>\` — Line break (no closing tag)
- \`<hr>\` — Horizontal rule/divider
- \`<blockquote>\` — Long quotation
- \`<code>\` — Inline code snippet
- \`<pre>\` — Preformatted text (preserves whitespace)
- \`<abbr title="Hypertext Markup Language">\` — Abbreviation with expansion
- \`<mark>\` — Highlighted text
- \`<del>\` — Deleted (strikethrough) text
- \`<ins>\` — Inserted (underlined) text
- \`<sub>\` and \`<sup>\` — Subscript and superscript`,
        codeExample: {
          language: "html",
          code: `<h1>Main Title (Only one per page)</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

<p>A paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<p>Water formula: H<sub>2</sub>O | 2<sup>nd</sup> edition</p>
<p>This is <mark>highlighted</mark> text.</p>
<p>Original price: <del>$100</del> Now: <ins>$75</ins></p>
<p>HTML stands for <abbr title="HyperText Markup Language">HTML</abbr>.</p>

<blockquote cite="https://source.com">
  "Any sufficiently advanced technology is indistinguishable from magic."
  — Arthur C. Clarke
</blockquote>

<pre><code>
function greet(name) {
  return "Hello, " + name;
}
</code></pre>

<p>Use <code>console.log()</code> to debug JavaScript.</p>`,
          explanation: "HTML has many text elements beyond just <p>. Use the most semantically appropriate element — search engines and screen readers use them to understand your content.",
        },
        tips: [
          "Use <strong> for important text (bold + semantic); use CSS for decorative bold.",
          "<div> and <span> have no semantic meaning — prefer semantic elements when possible.",
          "Never skip heading levels — go h1 → h2 → h3, not h1 → h3.",
        ],
      },
      {
        id: "2.4",
        title: "Semantic HTML5 Elements",
        content: `HTML5 introduced **semantic elements** — tags that clearly describe their purpose and content. They help search engines, screen readers, and developers understand page structure.

**Layout Semantic Elements:**
- \`<header>\` — Page or section header (logo, navigation)
- \`<nav>\` — Navigation links
- \`<main>\` — Main content (only ONE per page)
- \`<article>\` — Self-contained content (blog post, news article)
- \`<section>\` — Thematic section of content
- \`<aside>\` — Sidebar or related content
- \`<footer>\` — Page or section footer
- \`<figure>\` — Media (image, diagram) with caption
- \`<figcaption>\` — Caption for a figure
- \`<details>\` and \`<summary>\` — Expandable/collapsible content
- \`<time datetime="">\` — Date/time value

**Why Semantic HTML Matters:**
1. **SEO**: Search engines rank pages better when content is well-structured
2. **Accessibility**: Screen readers navigate by semantic structure
3. **Maintainability**: Code is easier to read and understand
4. **Consistency**: Provides standard patterns for web layouts`,
        codeExample: {
          language: "html",
          code: `<!-- Non-semantic (avoid this) -->
<div id="header">
  <div id="nav">...</div>
</div>
<div id="main">
  <div class="article">...</div>
  <div id="sidebar">...</div>
</div>
<div id="footer">...</div>

<!-- Semantic HTML5 (do this) -->
<header>
  <h1>My Blog</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Article Title</h2>
    <time datetime="2024-01-15">January 15, 2024</time>
    <p>Article content...</p>
    <figure>
      <img src="photo.jpg" alt="Description">
      <figcaption>Photo caption here</figcaption>
    </figure>
  </article>
  
  <aside>
    <h3>Related Posts</h3>
    <ul>...</ul>
  </aside>
</main>

<footer>
  <p>&copy; 2024 My Blog. All rights reserved.</p>
</footer>`,
          explanation: "Semantic elements describe the PURPOSE of content, not just its appearance. <header>, <main>, <article>, <aside>, and <footer> replace meaningless <div> wrappers.",
        },
      },
      {
        id: "2.5",
        title: "Links and Navigation",
        content: `Links are created with the **\`<a>\` (anchor) element**. The \`href\` attribute specifies the destination.

**Types of Links:**
- **Absolute links**: Full URL — \`href="https://google.com"\`
- **Relative links**: Path relative to current page — \`href="/about"\` or \`href="../images/photo.jpg"\`
- **Anchor links**: Jump to element on same page — \`href="#section-id"\`
- **Email links**: Open mail client — \`href="mailto:email@example.com"\`
- **Phone links**: Dial on mobile — \`href="tel:+1234567890"\`

**Important Attributes:**
- \`target="_blank"\` — Opens link in new tab (add \`rel="noopener noreferrer"\` for security!)
- \`rel="noopener noreferrer"\` — Security attribute for external links
- \`download\` — Forces file download instead of navigation`,
        codeExample: {
          language: "html",
          code: `<!-- Basic navigation -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- External link (opens in new tab, with security) -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">
  Visit Google
</a>

<!-- Jump to section on same page -->
<a href="#introduction">Jump to Introduction</a>
...
<section id="introduction">
  <h2>Introduction</h2>
  <p>Content here...</p>
</section>

<!-- Email link -->
<a href="mailto:hello@example.com">Email Us</a>

<!-- Phone link (works on mobile) -->
<a href="tel:+15551234567">Call Us: (555) 123-4567</a>

<!-- Download link -->
<a href="/files/resume.pdf" download="My_Resume.pdf">Download Resume</a>

<!-- Image as link -->
<a href="/home">
  <img src="logo.png" alt="Company Logo — Go to Homepage">
</a>`,
          explanation: "Always add rel='noopener noreferrer' to links with target='_blank' to prevent tab-jacking security vulnerabilities.",
        },
        tips: [
          "Never use bare 'Click here' as link text — be descriptive: 'Download the 2024 Report'.",
          "Use relative URLs for internal links — they work regardless of domain name.",
          "Add title attribute for extra context: <a title='Opens our FAQ page'>FAQ</a>",
        ],
        commonMistakes: [
          "Forgetting rel='noopener noreferrer' on target='_blank' links (security risk).",
          "Using '#' as href for buttons — use <button> elements instead.",
          "Nesting <a> inside another <a> — this is invalid HTML.",
        ],
      },
      {
        id: "2.6",
        title: "Images and Media",
        content: `**Images with \`<img>\`:**
The \`<img>\` tag is self-closing and requires at minimum \`src\` (source) and \`alt\` (alternative text) attributes.

**Essential attributes:**
- \`src\` — Path to image file
- \`alt\` — Description for screen readers and when image fails to load (REQUIRED)
- \`width\` / \`height\` — Specify dimensions to prevent layout shift
- \`loading="lazy"\` — Defer offscreen images (performance)
- \`decoding="async"\` — Don't block rendering

**Supported formats:**
- **JPEG/JPG** — Photos (lossy compression)
- **PNG** — Images with transparency
- **WebP** — Modern format, smaller than JPEG/PNG
- **SVG** — Scalable vector graphics (never blurry)
- **GIF** — Animated images (use sparingly)

**HTML5 Media Elements:**
- \`<video>\` — Embed video files
- \`<audio>\` — Embed audio files
- \`<source>\` — Specify multiple media formats for fallback`,
        codeExample: {
          language: "html",
          code: `<!-- Basic image -->
<img src="photo.jpg" alt="A scenic mountain landscape at sunset" width="800" height="600">

<!-- Responsive image with srcset -->
<img 
  src="photo-800.jpg" 
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Responsive landscape photo"
  loading="lazy"
>

<!-- Image with figure caption -->
<figure>
  <img src="chart.png" alt="Bar chart showing sales growth 2020-2024">
  <figcaption>Figure 1: Annual sales growth from 2020 to 2024</figcaption>
</figure>

<!-- Video element -->
<video controls width="640" height="360" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <p>Your browser doesn't support video. <a href="video.mp4">Download it</a>.</p>
</video>

<!-- Audio element -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Your browser doesn't support audio.
</audio>`,
          explanation: "Always specify width/height attributes to prevent cumulative layout shift (CLS). Use loading='lazy' for images below the fold to improve page performance.",
        },
        tips: [
          "Never leave alt empty for meaningful images — blank alt=\"\" means 'decorative, skip me'.",
          "Use WebP format when possible — it's 25-34% smaller than JPEG at the same quality.",
          "Specify image dimensions in HTML to prevent layout shift as images load.",
        ],
      },
      {
        id: "2.7",
        title: "HTML Lists",
        content: `HTML provides three types of lists:

**1. Unordered List (\`<ul>\`)** — Bulleted list, order doesn't matter
**2. Ordered List (\`<ol>\`)** — Numbered list, order matters
**3. Description List (\`<dl>\`)** — Term-definition pairs

Each list item is wrapped in \`<li>\`. Lists can be nested inside each other.`,
        codeExample: {
          language: "html",
          code: `<!-- Unordered List (bullet points) -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Ordered List (numbered) -->
<ol>
  <li>Open VS Code</li>
  <li>Create index.html</li>
  <li>Write HTML</li>
  <li>Open in browser</li>
</ol>

<!-- Ordered list with different type -->
<ol type="A">  <!-- A, B, C... -->
  <li>First item</li>
  <li>Second item</li>
</ol>

<!-- Description List (term-definition pairs) -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — structures web content</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets — styles web content</dd>
  
  <dt>JavaScript</dt>
  <dd>A programming language that adds interactivity</dd>
</dl>

<!-- Nested lists -->
<ul>
  <li>Front-End
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Back-End
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>`,
          explanation: "Use <ul> when order doesn't matter (shopping list), <ol> when order matters (instructions), and <dl> for glossaries and FAQs.",
        },
      },
      {
        id: "2.8",
        title: "HTML Tables",
        content: `Tables organize data into rows and columns. Use tables for **tabular data only** — not for page layout (use CSS for layout).

**Table Elements:**
- \`<table>\` — The table container
- \`<thead>\` — Table header group
- \`<tbody>\` — Table body group
- \`<tfoot>\` — Table footer group
- \`<tr>\` — Table row
- \`<th>\` — Table header cell (bold, centered by default)
- \`<td>\` — Table data cell
- \`colspan\` — Span multiple columns
- \`rowspan\` — Span multiple rows`,
        codeExample: {
          language: "html",
          code: `<table>
  <caption>Student Grades - Spring 2024</caption>
  
  <thead>
    <tr>
      <th scope="col">Student</th>
      <th scope="col">HTML</th>
      <th scope="col">CSS</th>
      <th scope="col">JavaScript</th>
      <th scope="col">Average</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td>Ahmed Hassan</td>
      <td>95</td>
      <td>88</td>
      <td>92</td>
      <td>91.7</td>
    </tr>
    <tr>
      <td>Sara Mohamed</td>
      <td>98</td>
      <td>95</td>
      <td>97</td>
      <td>96.7</td>
    </tr>
    <tr>
      <td colspan="4">Class Average</td>
      <td>94.2</td>
    </tr>
  </tbody>
  
  <tfoot>
    <tr>
      <td colspan="5">End of Term Report</td>
    </tr>
  </tfoot>
</table>`,
          explanation: "Use <thead>, <tbody>, and <tfoot> to group table sections. Always add scope attributes to <th> elements for accessibility. Use <caption> to describe the table.",
        },
        tips: [
          "Never use tables for page layout — that was a 1990s technique. Use CSS Grid or Flexbox.",
          "Add scope='col' or scope='row' to <th> elements for screen reader compatibility.",
          "Use <caption> to describe what the table shows.",
        ],
      },
      {
        id: "2.9",
        title: "HTML Forms",
        content: `Forms allow users to input data and send it to a server. The \`<form>\` element wraps all form controls.

**Key Form Attributes:**
- \`action\` — URL where data is sent
- \`method\` — HTTP method: \`get\` or \`post\`

**Common Input Types:**
text, email, password, number, tel, url, date, time, color, range, checkbox, radio, file, submit, reset, button, search, hidden

**Form Elements:**
- \`<input>\` — Various input controls
- \`<label>\` — Labels an input (always use with for/id linking)
- \`<textarea>\` — Multi-line text input
- \`<select>\` + \`<option>\` — Dropdown menu
- \`<button>\` — Button (more flexible than input type="submit")
- \`<fieldset>\` + \`<legend>\` — Group related inputs`,
        codeExample: {
          language: "html",
          code: `<form action="/register" method="post" novalidate>
  <fieldset>
    <legend>Personal Information</legend>
    
    <!-- Text input with label (ALWAYS link label to input) -->
    <div>
      <label for="fullname">Full Name *</label>
      <input type="text" id="fullname" name="fullname" 
             placeholder="Ahmed Hassan" required
             autocomplete="name">
    </div>
    
    <!-- Email input -->
    <div>
      <label for="email">Email Address *</label>
      <input type="email" id="email" name="email" 
             placeholder="ahmed@example.com" required
             autocomplete="email">
    </div>
    
    <!-- Password input -->
    <div>
      <label for="password">Password *</label>
      <input type="password" id="password" name="password"
             minlength="8" required>
    </div>
    
    <!-- Number input with range -->
    <div>
      <label for="age">Age</label>
      <input type="number" id="age" name="age" min="18" max="100">
    </div>
    
    <!-- Date input -->
    <div>
      <label for="birthdate">Birth Date</label>
      <input type="date" id="birthdate" name="birthdate">
    </div>
    
    <!-- Radio buttons (only one selectable) -->
    <div>
      <p>Gender:</p>
      <label><input type="radio" name="gender" value="male"> Male</label>
      <label><input type="radio" name="gender" value="female"> Female</label>
      <label><input type="radio" name="gender" value="other"> Other</label>
    </div>
    
    <!-- Checkboxes (multiple selectable) -->
    <div>
      <p>Interests:</p>
      <label><input type="checkbox" name="interest" value="html"> HTML</label>
      <label><input type="checkbox" name="interest" value="css"> CSS</label>
      <label><input type="checkbox" name="interest" value="js"> JavaScript</label>
    </div>
    
    <!-- Dropdown select -->
    <div>
      <label for="country">Country</label>
      <select id="country" name="country">
        <option value="">-- Select Country --</option>
        <optgroup label="Africa">
          <option value="eg">Egypt</option>
          <option value="za">South Africa</option>
        </optgroup>
        <optgroup label="Asia">
          <option value="sa">Saudi Arabia</option>
          <option value="ae">UAE</option>
        </optgroup>
      </select>
    </div>
    
    <!-- Textarea -->
    <div>
      <label for="bio">Bio</label>
      <textarea id="bio" name="bio" rows="4" cols="50"
                placeholder="Tell us about yourself..."></textarea>
    </div>
  </fieldset>
  
  <!-- Submit and Reset buttons -->
  <button type="submit">Register</button>
  <button type="reset">Clear Form</button>
</form>`,
          explanation: "Always link labels to inputs using for/id pairs. HTML5 input types provide built-in validation and mobile keyboard optimization (e.g., type='email' shows @ on mobile keyboards).",
        },
        tips: [
          "Always link <label> to inputs with matching for='' and id='' attributes.",
          "Use HTML5 input types (email, number, tel, date) for built-in validation and better mobile UX.",
          "Use 'required' attribute for mandatory fields and minlength/maxlength for text constraints.",
        ],
        commonMistakes: [
          "Creating inputs without labels — breaks accessibility and usability.",
          "Using GET method for sensitive data like passwords — always use POST.",
          "Forgetting novalidate on forms during development to test server-side validation.",
        ],
      },
    ],
    quiz: [
      {
        id: "q2-1",
        question: "What does HTML stand for?",
        options: ["High-Tech Markup Language", "HyperText Markup Language", "HyperTransfer Markup Language", "HyperText Management Language"],
        correctIndex: 1,
        explanation: "HTML stands for HyperText Markup Language.",
      },
      {
        id: "q2-2",
        question: "Which DOCTYPE declaration is correct for HTML5?",
        options: ["<!DOCTYPE HTML5>", "<!DOCTYPE html PUBLIC>", "<!DOCTYPE html>", "<html5>"],
        correctIndex: 2,
        explanation: "<!DOCTYPE html> (in any case) is the correct HTML5 DOCTYPE declaration.",
      },
      {
        id: "q2-3",
        question: "Which tag is used to create a hyperlink?",
        options: ["<link>", "<href>", "<a>", "<url>"],
        correctIndex: 2,
        explanation: "The <a> (anchor) element creates hyperlinks. The href attribute specifies the destination.",
      },
      {
        id: "q2-4",
        question: "What attribute is REQUIRED on every <img> element for accessibility?",
        options: ["src", "alt", "width", "title"],
        correctIndex: 1,
        explanation: "The alt attribute provides alternative text for screen readers and when images fail to load. It's required for accessibility.",
      },
      {
        id: "q2-5",
        question: "Which element represents the main navigation of a page?",
        options: ["<menu>", "<navigation>", "<links>", "<nav>"],
        correctIndex: 3,
        explanation: "<nav> is the semantic HTML5 element for navigation. It should contain the site's main navigation links.",
      },
      {
        id: "q2-6",
        question: "Which input type should you use for email addresses?",
        options: ["type='text'", "type='email'", "type='address'", "type='mail'"],
        correctIndex: 1,
        explanation: "type='email' provides built-in email validation and shows the appropriate keyboard on mobile.",
      },
      {
        id: "q2-7",
        question: "What does the 'required' attribute do on an input element?",
        options: ["Makes the input read-only", "Makes the field mandatory before form submission", "Sets a default value", "Styles the input with a border"],
        correctIndex: 1,
        explanation: "The 'required' attribute makes a field mandatory — the form won't submit until it's filled.",
      },
      {
        id: "q2-8",
        question: "Which tag is used for the MOST important heading?",
        options: ["<heading>", "<h6>", "<h0>", "<h1>"],
        correctIndex: 3,
        explanation: "<h1> is the most important heading. You should use only one <h1> per page.",
      },
      {
        id: "q2-9",
        question: "What is the purpose of <thead>, <tbody>, and <tfoot> in tables?",
        options: ["They style the table", "They group table rows semantically for accessibility and styling", "They are required for tables to display", "They define columns"],
        correctIndex: 1,
        explanation: "These elements group table sections semantically, improving accessibility and allowing separate styling.",
      },
      {
        id: "q2-10",
        question: "What attribute links a <label> to its corresponding input?",
        options: ["id", "name", "for", "link"],
        correctIndex: 2,
        explanation: "The 'for' attribute on <label> should match the 'id' attribute on the input. This links them for accessibility.",
      },
    ],
    exam: {
      trueFalse: [
        { id: "tf2-1", statement: "HTML5 DOCTYPE is declared as <!DOCTYPE html>.", answer: true, explanation: "The HTML5 DOCTYPE is simply <!DOCTYPE html>." },
        { id: "tf2-2", statement: "The <img> element requires a closing tag.", answer: false, explanation: "<img> is a void (self-closing) element — it doesn't need a closing tag." },
        { id: "tf2-3", statement: "You can have multiple <main> elements on a single page.", answer: false, explanation: "There should be only ONE <main> element per page, representing the primary content." },
        { id: "tf2-4", statement: "Tables should be used for page layout in modern HTML.", answer: false, explanation: "Tables are for tabular data only. Use CSS Grid or Flexbox for page layout." },
        { id: "tf2-5", statement: "The <strong> element makes text visually bold AND conveys importance semantically.", answer: true, explanation: "<strong> both bolds text and signals that the content is of strong importance to browsers and screen readers." },
        { id: "tf2-6", statement: "The alt attribute on <img> is optional.", answer: false, explanation: "The alt attribute is required for accessibility — screen readers read it aloud." },
        { id: "tf2-7", statement: "The 'for' attribute on a <label> should match the 'id' of its input.", answer: true, explanation: "Matching for/id links the label to its input, enabling click-to-focus and screen reader association." },
        { id: "tf2-8", statement: "Input type='password' automatically encrypts the password before sending.", answer: false, explanation: "type='password' only masks the display. Encryption requires HTTPS for transmission and hashing on the server." },
        { id: "tf2-9", statement: "<form method='GET'> should be used for login forms.", answer: false, explanation: "Login forms must use method='POST'. GET sends data in the URL, which would expose passwords in the browser history and server logs." },
        { id: "tf2-10", statement: "Semantic elements like <article> and <section> have the same visual rendering as <div> by default.", answer: true, explanation: "Semantic elements have no default visual difference — the difference is meaningful to browsers, search engines, and screen readers." },
      ],
      mcq: [
        {
          id: "exam2-mcq1",
          question: "Which HTML element is used to define the structure/header of a web page or section?",
          options: ["<head>", "<top>", "<header>", "<headline>"],
          correctIndex: 2,
          explanation: "<header> is the semantic element for page or section headers. <head> contains metadata, not content.",
        },
        {
          id: "exam2-mcq2",
          question: "What does 'colspan' do in a table?",
          options: ["Colors the column", "Merges multiple columns into one cell", "Sets column width", "Adds a border"],
          correctIndex: 1,
          explanation: "colspan='n' makes a cell span n columns horizontally.",
        },
        {
          id: "exam2-mcq3",
          question: "Which element is used for the main content of a page (should appear only once)?",
          options: ["<content>", "<section>", "<main>", "<body>"],
          correctIndex: 2,
          explanation: "<main> represents the dominant content of the document body. There should be only one per page.",
        },
        {
          id: "exam2-mcq4",
          question: "What is the correct way to add a comment in HTML?",
          options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "# This is a comment"],
          correctIndex: 2,
          explanation: "HTML comments use the <!-- comment --> syntax.",
        },
        {
          id: "exam2-mcq5",
          question: "Which input type shows a date picker in browsers?",
          options: ["type='calendar'", "type='date'", "type='datetime'", "type='picker'"],
          correctIndex: 1,
          explanation: "type='date' shows a native date picker UI in supporting browsers.",
        },
        {
          id: "exam2-mcq6",
          question: "What is the purpose of <fieldset> in forms?",
          options: ["To style form inputs", "To group related form inputs with a visual border", "To submit the form", "To create input fields"],
          correctIndex: 1,
          explanation: "<fieldset> groups related inputs together, typically with a visible box border and <legend> label.",
        },
        {
          id: "exam2-mcq7",
          question: "What attribute should be added to links that open in a new tab for security?",
          options: ["security='safe'", "target='_parent'", "rel='noopener noreferrer'", "nofollow"],
          correctIndex: 2,
          explanation: "rel='noopener noreferrer' prevents the new page from accessing window.opener and protects against tab-jacking.",
        },
        {
          id: "exam2-mcq8",
          question: "Which element is used to provide a caption for a table?",
          options: ["<title>", "<caption>", "<heading>", "<label>"],
          correctIndex: 1,
          explanation: "<caption> is placed directly after the opening <table> tag and provides a title/description for the table.",
        },
        {
          id: "exam2-mcq9",
          question: "What does the 'defer' attribute do on a <script> tag?",
          options: ["Delays loading for 5 seconds", "Loads the script after HTML parsing is complete", "Makes script optional", "Runs script only in development"],
          correctIndex: 1,
          explanation: "defer tells the browser to load the script in parallel with HTML parsing, then execute after parsing is complete — without blocking rendering.",
        },
        {
          id: "exam2-mcq10",
          question: "Which attribute on <select> allows multiple options to be selected?",
          options: ["type='multiple'", "multi", "multiple", "select-all"],
          correctIndex: 2,
          explanation: "Adding the 'multiple' attribute to <select> allows users to select multiple options (using Ctrl/Cmd+click).",
        },
      ],
      codingQuestion: {
        prompt: "Create a complete HTML registration form with: name (required), email (required), password (required, min 8 chars), country (dropdown with at least 3 options), and a checkbox for terms agreement. Include proper labels for all fields and a submit button.",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Form</title>
</head>
<body>
  <h1>Registration</h1>
  <!-- Build your registration form below -->

</body>
</html>`,
        expectedKeywords: ["<form", "<label", "<input", "type=\"email\"", "type=\"password\"", "required", "<select>", "<option", "type=\"checkbox\"", "type=\"submit\""],
        hint: "Use <form>, <label> linked to each <input> with for/id, type='email', type='password', minlength='8', <select> with <option> tags, and type='checkbox' for terms.",
        sampleAnswer: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Form</title>
</head>
<body>
  <h1>Registration</h1>
  <form action="/register" method="post">
    <div>
      <label for="name">Full Name *</label>
      <input type="text" id="name" name="name" required>
    </div>
    <div>
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div>
      <label for="password">Password * (min 8 characters)</label>
      <input type="password" id="password" name="password" minlength="8" required>
    </div>
    <div>
      <label for="country">Country</label>
      <select id="country" name="country">
        <option value="">Select...</option>
        <option value="eg">Egypt</option>
        <option value="sa">Saudi Arabia</option>
        <option value="ae">UAE</option>
      </select>
    </div>
    <div>
      <label>
        <input type="checkbox" name="terms" required>
        I agree to the Terms & Conditions
      </label>
    </div>
    <button type="submit">Register</button>
  </form>
</body>
</html>`,
      },
    },
    challenges: [
      {
        id: "ch2-1",
        title: "Semantic Blog Post",
        difficulty: "easy",
        description: "Create an HTML page for a blog post about your favorite topic. Use: <article>, <header>, <h1>, <h2>, <p>, <time>, <figure>, <figcaption>, and <footer>.",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Blog Post</title>
</head>
<body>
  <!-- Create a semantic blog post layout -->
  
</body>
</html>`,
        expectedKeywords: ["<article>", "<header>", "<h1>", "<time>", "<figure>", "<figcaption>", "<footer>"],
        hint: "Wrap everything in <article>, add a <header> with <h1> and <time>, then <p> paragraphs for content, a <figure> with an <img> and <figcaption>, and a <footer>.",
      },
      {
        id: "ch2-2",
        title: "Product Comparison Table",
        difficulty: "medium",
        description: "Create an HTML table comparing 3 web hosting plans (Basic, Pro, Enterprise). Include: Plan Name, Price, Storage, Bandwidth, Support columns. Use thead, tbody, tfoot, and caption.",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hosting Comparison</title>
</head>
<body>
  <h1>Hosting Plan Comparison</h1>
  <!-- Create your comparison table here -->
  
</body>
</html>`,
        expectedKeywords: ["<table>", "<caption>", "<thead>", "<tbody>", "<tfoot>", "<th>", "<td>"],
        hint: "Use <table>, add <caption>, then <thead> with <th> headers, <tbody> with data rows, and <tfoot> for totals.",
      },
      {
        id: "ch2-3",
        title: "Complete Contact Form",
        difficulty: "hard",
        description: "Build a professional contact form with: name, email, phone (tel input), subject (select dropdown), message (textarea), preferred contact method (radio buttons), and newsletter subscription (checkbox). Include all required attributes and proper labels.",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Us</title>
</head>
<body>
  <h1>Contact Us</h1>
  <!-- Build the complete contact form here -->
  
</body>
</html>`,
        expectedKeywords: ["<form", "type=\"tel\"", "type=\"email\"", "<select>", "<textarea>", "type=\"radio\"", "type=\"checkbox\"", "type=\"submit\"", "<label", "<fieldset>"],
        hint: "Use <fieldset> to group sections, type='tel' for phone, <select> for subject, <textarea> for message, radio inputs for contact preference, and checkbox for newsletter.",
      },
    ],
    miniProject: {
      title: "Personal Portfolio Page",
      description: "Build a complete personal portfolio page using proper HTML5 structure and semantic elements. Include: a header with navigation, an about section, a skills table, a projects section with figure elements, and a contact form.",
      steps: [
        "Create the HTML5 document structure (DOCTYPE, html, head, body)",
        "Add a <header> with your name as <h1> and a <nav> with links to page sections",
        "Add a <main> element containing all content sections",
        "Create an <section id='about'> with a <p> about yourself",
        "Create a <section id='skills'> with a table of your skills and levels",
        "Create a <section id='projects'> with at least 2 <article> elements, each with a <figure>",
        "Create a <section id='contact'> with a complete contact form",
        "Add a <footer> with copyright and social links",
      ],
      starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
</head>
<body>
  <!-- Add your portfolio content here -->
  
</body>
</html>`,
      expectedKeywords: ["<header>", "<nav>", "<main>", "<section>", "<article>", "<figure>", "<table>", "<form>", "<footer>"],
    },
  },
  {
    id: 3,
    title: "CSS3",
    slug: "css",
    icon: "🎨",
    color: "purple",
    description: "Style web pages with CSS3 — selectors, box model, Flexbox, CSS Grid, responsive design, animations, and modern layout techniques.",
    topics: [
      {
        id: "3.1",
        title: "Introduction to CSS",
        content: `**CSS** (Cascading Style Sheets) controls the **visual presentation** of HTML elements — colors, fonts, spacing, layout, animations.

**Three Ways to Add CSS:**

1. **External CSS** (Best Practice): Separate \`.css\` file linked in \`<head>\`
2. **Internal CSS**: \`<style>\` block in \`<head>\`
3. **Inline CSS**: \`style=""\` attribute on an element (avoid for maintainability)

**CSS Syntax:**
\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

**Why "Cascading"?**
When multiple rules apply to the same element, CSS resolves conflicts using:
1. **Specificity** — more specific selectors win
2. **Cascade order** — later rules override earlier ones (when specificity is equal)
3. **Inheritance** — some properties inherit from parent elements`,
        codeExample: {
          language: "css",
          code: `/* External CSS file: style.css */

/* This styles ALL paragraphs */
p {
  color: #333333;         /* Dark gray text */
  font-size: 16px;        /* Text size */
  line-height: 1.6;       /* Space between lines */
  margin-bottom: 1rem;    /* Space below paragraph */
}

/* This styles elements with class="highlight" */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* This styles the element with id="main-title" */
#main-title {
  font-size: 2.5rem;
  color: #1a56db;
  text-align: center;
}`,
          explanation: "CSS rules consist of a selector and declaration block. Properties and values are separated by colons; declarations end with semicolons.",
        },
        tips: [
          "Always use external CSS files for maintainability — don't mix CSS into HTML.",
          "Use relative units like rem and em instead of fixed px for better scalability.",
          "Comment your CSS with /* comment */ to explain complex styles.",
        ],
      },
      {
        id: "3.2",
        title: "CSS Selectors",
        content: `CSS selectors target which HTML elements to style.

**Basic Selectors:**
- \`*\` — Universal (selects ALL elements)
- \`p\` — Type/element selector
- \`.classname\` — Class selector
- \`#id\` — ID selector (use sparingly — IDs must be unique)

**Combinators:**
- \`div p\` — Descendant (any p inside div)
- \`div > p\` — Direct child only
- \`h1 + p\` — Adjacent sibling (immediately after h1)
- \`h1 ~ p\` — General sibling (all p after h1)

**Attribute Selectors:**
- \`[type="text"]\` — Exact attribute value
- \`[class*="btn"]\` — Contains "btn"
- \`[href^="https"]\` — Starts with "https"
- \`[href$=".pdf"]\` — Ends with ".pdf"

**Pseudo-classes:** (state-based)
- \`:hover\` — Mouse over element
- \`:focus\` — Element has keyboard focus
- \`:first-child\` / \`:last-child\`
- \`:nth-child(2n)\` — Every 2nd element
- \`:not(.special)\` — Excludes elements

**Pseudo-elements:** (virtual elements)
- \`::before\` and \`::after\` — Insert content
- \`::first-line\` — First line of text
- \`::placeholder\` — Input placeholder text`,
        codeExample: {
          language: "css",
          code: `/* Type selector */
h1 { color: navy; }

/* Class selector (can be reused) */
.card { border: 1px solid #ddd; border-radius: 8px; }

/* ID selector (unique per page) */
#logo { width: 200px; }

/* Descendant: links inside nav */
nav a { color: white; text-decoration: none; }

/* Direct child: only direct li inside ul */
ul > li { list-style: square; }

/* Attribute selector: external links */
a[href^="https"] { color: green; }

/* Pseudo-class: button on hover */
button:hover { background: #0047ab; cursor: pointer; }

/* Pseudo-class: highlighted rows */
tr:nth-child(even) { background: #f5f5f5; }

/* Focus state for accessibility */
input:focus { outline: 2px solid blue; outline-offset: 2px; }

/* Pseudo-element: add icon before links */
a::before { content: "→ "; }

/* Style placeholder text */
input::placeholder { color: #999; font-style: italic; }`,
          explanation: "Pseudo-classes select elements in a specific state (:hover, :focus). Pseudo-elements create virtual sub-elements (::before, ::after). Use class selectors for reusable styles.",
        },
        tips: [
          "Prefer class selectors (.class) over ID selectors (#id) — IDs can't be reused.",
          "Use :focus styles for keyboard accessibility — never remove outlines without replacement.",
          "::before and ::after require a content property (even if it's content: '')",
        ],
        commonMistakes: [
          "Overusing ID selectors — they have very high specificity and can't be reused.",
          "Removing :focus outline without replacement — breaks keyboard navigation.",
          "Forgetting that CSS selectors are case-sensitive for attribute values.",
        ],
      },
      {
        id: "3.3",
        title: "The CSS Box Model",
        content: `Every HTML element is a **box**. The CSS Box Model describes the four layers of this box from inside to outside:

1. **Content** — The actual text/image content
2. **Padding** — Space between content and border (INSIDE the border)
3. **Border** — The element's border
4. **Margin** — Space OUTSIDE the border (separates from other elements)

**box-sizing:**
- \`content-box\` (default): width/height applies to content only — padding and border are ADDED to the size
- \`border-box\` (recommended): width/height includes padding and border — much more intuitive

**Always set border-box globally!**`,
        codeExample: {
          language: "css",
          code: `/* Reset to border-box for all elements (always do this!) */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  /* Content area */
  width: 320px;
  height: 200px;
  
  /* Padding (inside the border) */
  padding: 20px;              /* All sides */
  padding: 10px 20px;         /* Top/Bottom | Left/Right */
  padding: 10px 20px 15px 5px; /* Top | Right | Bottom | Left */
  
  /* Border */
  border: 2px solid #1a56db;
  border-radius: 8px;         /* Round corners */
  
  /* Margin (outside the border) */
  margin: 16px;
  margin: 10px auto;          /* Center horizontally (top/bottom 10px, auto left/right) */
  
  /* Background */
  background-color: white;
  
  /* Shadow (not part of box model but common) */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* margin: auto to center block elements */
.container {
  max-width: 1200px;
  margin: 0 auto;     /* Centers horizontally */
  padding: 0 16px;    /* Horizontal padding */
}`,
          explanation: "With box-sizing: border-box, a 320px wide element with padding:20px stays 320px total — not 360px. This is why resetting box-sizing is the first thing in most CSS files.",
        },
        tips: [
          "Always reset box-sizing: border-box at the top of your CSS file.",
          "Use margin: 0 auto to horizontally center block elements with a fixed width.",
          "Margin collapse: vertical margins between elements merge (only the larger margin applies).",
        ],
        bestPractices: [
          "Use the box model diagram in DevTools to debug spacing issues.",
          "Prefer shorthand properties: padding: 10px 20px instead of 4 separate declarations.",
          "Use CSS custom properties (variables) for consistent spacing: --spacing-md: 16px",
        ],
      },
      {
        id: "3.4",
        title: "Colors and Typography",
        content: `**CSS Colors:**
- Named: \`red\`, \`blue\`, \`coral\`, \`rebeccapurple\` (140+ names)
- Hexadecimal: \`#FF5733\` or shorthand \`#F53\`
- RGB: \`rgb(255, 87, 51)\`
- RGBA (with transparency): \`rgba(255, 87, 51, 0.5)\`
- HSL: \`hsl(11, 100%, 60%)\` — Hue, Saturation, Lightness
- CSS variables: \`var(--primary-color)\`

**Typography Properties:**
- \`font-family\` — Font name (with fallbacks)
- \`font-size\` — em, rem, px, %, vw
- \`font-weight\` — 100–900 (bold = 700, normal = 400)
- \`font-style\` — normal, italic, oblique
- \`line-height\` — 1.5 is ideal for readability
- \`letter-spacing\` — Spacing between characters
- \`text-align\` — left, right, center, justify
- \`text-decoration\` — underline, none, line-through
- \`text-transform\` — uppercase, lowercase, capitalize`,
        codeExample: {
          language: "css",
          code: `/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

/* CSS Custom Properties (Variables) */
:root {
  --color-primary: #1a56db;
  --color-text: #1f2937;
  --color-muted: #6b7280;
  --color-bg: #f9fafb;
  --font-size-base: 16px;
}

/* Base typography */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-bg);
}

h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
h2 { font-size: 2rem; font-weight: 600; }
h3 { font-size: 1.5rem; font-weight: 600; }

.text-primary { color: var(--color-primary); }
.text-muted { color: var(--color-muted); }

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`,
          explanation: "Use CSS custom properties (variables) for colors and font sizes — change one variable to update the entire site's color scheme.",
        },
      },
      {
        id: "3.5",
        title: "CSS Flexbox Layout",
        content: `**Flexbox** is a one-dimensional layout method — it lays out items in a row or column.

**Container Properties (parent):**
- \`display: flex\` — Activates flexbox
- \`flex-direction\` — row | column | row-reverse | column-reverse
- \`justify-content\` — Aligns items along MAIN axis: flex-start | flex-end | center | space-between | space-around | space-evenly
- \`align-items\` — Aligns items along CROSS axis: stretch | flex-start | flex-end | center | baseline
- \`flex-wrap\` — nowrap | wrap | wrap-reverse
- \`gap\` — Space between items

**Item Properties (children):**
- \`flex-grow\` — How much item grows to fill space (default: 0)
- \`flex-shrink\` — How much item shrinks (default: 1)
- \`flex-basis\` — Initial size before growing/shrinking
- \`flex: 1\` — Shorthand for grow:1 shrink:1 basis:0 (fills available space)
- \`align-self\` — Override parent's align-items for this item
- \`order\` — Visual order (default: 0)`,
        codeExample: {
          language: "css",
          code: `/* Navigation bar with flexbox */
.navbar {
  display: flex;
  justify-content: space-between;  /* Logo left, links right */
  align-items: center;             /* Vertically centered */
  padding: 16px 32px;
  background: #1e293b;
}

/* Card grid with flex-wrap */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 280px; /* Grow, shrink, min-width 280px */
  background: white;
  border-radius: 12px;
  padding: 24px;
}

/* Centering trick (most common use) */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;  /* Full viewport height */
}

/* Sidebar layout */
.page-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar { width: 240px; flex-shrink: 0; }
.main-content { flex: 1; overflow: auto; }`,
          explanation: "The most common Flexbox use cases: navigation bars (space-between), centering content (justify/align center), and responsive card grids (flex-wrap + flex:1).",
        },
        tips: [
          "justify-content works on the MAIN axis; align-items on the CROSS axis.",
          "gap is much cleaner than using margins — prefer it for flexbox/grid spacing.",
          "flex: 1 on children makes them equally share available space.",
        ],
      },
      {
        id: "3.6",
        title: "CSS Grid Layout",
        content: `**CSS Grid** is a two-dimensional layout system — it handles both rows AND columns simultaneously.

**Container Properties:**
- \`display: grid\` — Activates grid
- \`grid-template-columns\` — Define column sizes
- \`grid-template-rows\` — Define row sizes
- \`gap\` / \`column-gap\` / \`row-gap\` — Space between grid items
- \`grid-template-areas\` — Named area layout

**Grid Units:**
- \`fr\` (fraction) — fraction of available space
- \`repeat(3, 1fr)\` — 3 equal columns
- \`minmax(200px, 1fr)\` — min 200px, max 1fr
- \`auto\` — fits content

**Placement:**
- \`grid-column: 1 / 3\` — Span from column line 1 to 3
- \`grid-row: 1 / 2\` — Row placement
- \`grid-area: header\` — Use named template area`,
        codeExample: {
          language: "css",
          code: `/* Basic 3-column grid */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 24px;
}

/* Responsive grid with auto-fill */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Classic page layout with named areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 0;
}

.site-header { grid-area: header; }
.sidebar     { grid-area: sidebar; }
.main-content { grid-area: main; }
.site-footer { grid-area: footer; }

/* Span multiple columns */
.featured-card {
  grid-column: span 2; /* Takes up 2 columns */
}

/* Complex layout with explicit placement */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.dashboard .stats-card { grid-column: span 1; }
.dashboard .main-chart { grid-column: span 3; }
.dashboard .activity   { grid-column: span 1; }`,
          explanation: "CSS Grid shines for 2D layouts. Use grid-template-areas for readable named layouts. minmax(280px, 1fr) with auto-fill creates automatic responsive grids without media queries.",
        },
      },
      {
        id: "3.7",
        title: "Responsive Design & Media Queries",
        content: `Responsive design ensures your site looks good on all screen sizes — mobile phones, tablets, and desktops.

**Media Query Syntax:**
\`\`\`css
@media (max-width: 768px) {
  /* Styles for screens ≤ 768px */
}
\`\`\`

**Common Breakpoints:**
- Mobile: ≤ 767px
- Tablet: 768px – 1023px
- Desktop: ≥ 1024px
- Large Desktop: ≥ 1280px

**Mobile-First vs Desktop-First:**
- **Mobile-first** (recommended): Write base styles for mobile, then add \`min-width\` media queries for larger screens
- **Desktop-first**: Write for desktop, then add \`max-width\` queries for smaller screens

**Responsive Units:**
- \`%\` — Relative to parent
- \`vw\` / \`vh\` — Viewport width/height
- \`rem\` — Relative to root font-size
- \`em\` — Relative to parent font-size
- \`clamp(min, preferred, max)\` — Fluid values`,
        codeExample: {
          language: "css",
          code: `/* Mobile-first approach (BASE styles) */
.container {
  width: 100%;
  padding: 0 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 column on mobile */
  gap: 16px;
}

.navbar {
  flex-direction: column; /* Stacked on mobile */
}

/* Tablet and above */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
  
  .navbar {
    flex-direction: row; /* Horizontal on tablet+ */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; }
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Fluid typography with clamp */
h1 {
  font-size: clamp(1.75rem, 5vw, 3rem); /* Min 1.75rem, max 3rem */
}

/* Responsive image */
img {
  max-width: 100%;
  height: auto;
}

/* Hide on mobile */
@media (max-width: 767px) {
  .desktop-only { display: none; }
}`,
          explanation: "Mobile-first is the recommended approach — start with mobile styles, then progressively enhance for larger screens using min-width media queries.",
        },
        tips: [
          "Always include the viewport meta tag: <meta name='viewport' content='width=device-width, initial-scale=1.0'>",
          "Test on real devices or use Chrome DevTools mobile emulation.",
          "Use clamp() for fluid typography — no media queries needed for font sizes.",
        ],
      },
      {
        id: "3.8",
        title: "CSS Transitions and Animations",
        content: `CSS provides two ways to animate elements:

**Transitions:** Smoothly animate when a CSS property changes (usually on :hover)
- \`transition: property duration timing-function delay\`

**Animations:** More complex multi-step animations with @keyframes
- \`animation: name duration timing-function delay iteration-count direction\`

**Timing Functions:**
- \`ease\` — Start fast, end slow (default)
- \`linear\` — Constant speed
- \`ease-in\` — Start slow
- \`ease-out\` — End slow
- \`ease-in-out\` — Slow at both ends
- \`cubic-bezier()\` — Custom curve

**Transform Properties (GPU accelerated):**
- \`translate(x, y)\` — Move
- \`scale(x, y)\` — Resize
- \`rotate(angle)\` — Rotate
- \`skew(x, y)\` — Distort

**Performance tip:** Animate only \`transform\` and \`opacity\` — they use the GPU and don't cause layout reflow.`,
        codeExample: {
          language: "css",
          code: `/* Button with multiple transitions */
.btn {
  background: #1a56db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  /* Transition multiple properties */
  transition: background-color 0.2s ease, transform 0.1s ease, 
              box-shadow 0.2s ease;
}

.btn:hover {
  background: #1544b0;
  transform: translateY(-2px); /* Lift effect */
  box-shadow: 0 8px 20px rgba(26, 86, 219, 0.4);
}

.btn:active {
  transform: translateY(0); /* Press effect */
  box-shadow: none;
}

/* Card hover effect */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Keyframe animation: spinning loader */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #1a56db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Fade in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* Pulse animation for notifications */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}

.notification-dot {
  animation: pulse 2s ease-in-out infinite;
}`,
          explanation: "Animate transform and opacity for smooth 60fps animations — they don't trigger layout recalculations. Avoid animating width, height, or top/left.",
        },
        tips: [
          "Always animate 'transform' and 'opacity' — they run on the GPU without layout reflow.",
          "Use transition: all 0.3s ease sparingly — 'all' can cause unexpected transitions.",
          "Add will-change: transform to elements you'll animate for a rendering hint to the browser.",
        ],
      },
    ],
    quiz: [
      {
        id: "q3-1",
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Colorful Styling Syntax"],
        correctIndex: 1,
        explanation: "CSS stands for Cascading Style Sheets.",
      },
      {
        id: "q3-2",
        question: "Which box-sizing value includes padding and border in the element's total width?",
        options: ["content-box", "padding-box", "border-box", "full-box"],
        correctIndex: 2,
        explanation: "box-sizing: border-box includes padding and border in the element's width/height calculation.",
      },
      {
        id: "q3-3",
        question: "In Flexbox, which property controls alignment along the MAIN axis?",
        options: ["align-items", "justify-content", "flex-direction", "align-content"],
        correctIndex: 1,
        explanation: "justify-content aligns items along the main axis (horizontal by default). align-items works on the cross axis.",
      },
      {
        id: "q3-4",
        question: "What does 'fr' mean in CSS Grid?",
        options: ["A fixed pixel unit", "A fraction of the available space", "A font ratio", "A frequency unit"],
        correctIndex: 1,
        explanation: "'fr' is a fractional unit — 1fr means 'take one fraction of the remaining available space'.",
      },
      {
        id: "q3-5",
        question: "Which CSS selector targets elements with class='btn-primary'?",
        options: ["#btn-primary", ".btn-primary", "btn-primary", "[btn-primary]"],
        correctIndex: 1,
        explanation: "Class selectors use a dot prefix: .btn-primary targets all elements with class='btn-primary'.",
      },
      {
        id: "q3-6",
        question: "What is the 'mobile-first' approach in responsive design?",
        options: ["Only building mobile apps", "Writing base CSS for mobile, then enhancing for larger screens with min-width media queries", "Testing on mobile first", "Using mobile frameworks only"],
        correctIndex: 1,
        explanation: "Mobile-first means your base CSS targets mobile, and you use min-width media queries to progressively enhance the layout for larger screens.",
      },
      {
        id: "q3-7",
        question: "Which properties should you animate for best CSS performance?",
        options: ["width and height", "top and left", "transform and opacity", "margin and padding"],
        correctIndex: 2,
        explanation: "Animating transform and opacity is most performant — they use the GPU and don't cause layout reflow.",
      },
      {
        id: "q3-8",
        question: "How do you center a block element horizontally in CSS?",
        options: ["text-align: center", "margin: 0 auto (with a fixed width)", "align: center", "position: center"],
        correctIndex: 1,
        explanation: "margin: 0 auto centers block elements horizontally, but the element needs a defined width (not 100%).",
      },
      {
        id: "q3-9",
        question: "What does 'z-index' control?",
        options: ["The zoom level", "The stacking order of positioned elements", "The size of elements", "The font weight"],
        correctIndex: 1,
        explanation: "z-index controls the stacking order — higher z-index values appear in front of elements with lower values.",
      },
      {
        id: "q3-10",
        question: "Which pseudo-class applies styles when a user hovers over an element?",
        options: [":active", ":focus", ":hover", ":mouse"],
        correctIndex: 2,
        explanation: ":hover applies styles when the mouse cursor is positioned over an element.",
      },
    ],
    exam: {
      trueFalse: [
        { id: "tf3-1", statement: "Inline CSS has higher specificity than external CSS.", answer: true, explanation: "Inline styles (style='') have specificity of 1000, higher than class (10) or ID (100) selectors." },
        { id: "tf3-2", statement: "Flexbox works in two dimensions (both rows and columns simultaneously).", answer: false, explanation: "Flexbox is one-dimensional — it handles either a row OR a column. CSS Grid is two-dimensional." },
        { id: "tf3-3", statement: "CSS Grid's 'fr' unit distributes available space proportionally.", answer: true, explanation: "The 'fr' (fraction) unit divides the remaining space. 2fr gets twice as much space as 1fr." },
        { id: "tf3-4", statement: "margin: 0 auto can center any element horizontally.", answer: false, explanation: "margin: 0 auto only centers block-level elements with a defined width — it won't work on inline elements or elements without a width." },
        { id: "tf3-5", statement: "CSS variables (custom properties) are declared with --variable-name.", answer: true, explanation: "CSS custom properties use the -- prefix: --primary-color: blue; and are used with var(--primary-color)." },
        { id: "tf3-6", statement: "The :hover pseudo-class only works with mouse devices, not touch screens.", answer: false, explanation: "On touch devices, :hover is triggered on tap, though the experience differs from mouse hover." },
        { id: "tf3-7", statement: "box-sizing: content-box means padding and border are added to the element's width.", answer: true, explanation: "With content-box (default), a 200px element with 20px padding will actually be 240px wide total." },
        { id: "tf3-8", statement: "CSS animations should primarily use 'width' and 'height' for best performance.", answer: false, explanation: "Animating width/height causes layout reflow. Use transform (scale, translate) and opacity for GPU-accelerated animations." },
        { id: "tf3-9", statement: "Media queries can target screen orientation as well as width.", answer: true, explanation: "Media queries support orientation: @media (orientation: landscape) or @media (orientation: portrait)." },
        { id: "tf3-10", statement: "The 'gap' property in CSS Grid adds space between grid items, not at the edges.", answer: true, explanation: "gap only adds space between items — there's no gap at the outer edges of the grid." },
      ],
      mcq: [
        {
          id: "exam3-mcq1",
          question: "What is CSS specificity, and what has the highest specificity?",
          options: ["How fast CSS loads — external CSS is fastest", "How CSS determines which rule to apply — !important has highest specificity", "The number of CSS properties used", "The file size of CSS"],
          correctIndex: 1,
          explanation: "Specificity determines which rule wins when multiple rules target the same element. The order is: !important > inline styles > IDs > classes > elements.",
        },
        {
          id: "exam3-mcq2",
          question: "What does 'repeat(auto-fill, minmax(250px, 1fr))' do in CSS Grid?",
          options: ["Creates exactly 3 columns", "Creates columns that are always 250px wide", "Creates as many 250px+ columns as fit, then grows them equally", "Repeats the grid 250 times"],
          correctIndex: 2,
          explanation: "auto-fill creates as many column tracks as fit; minmax(250px, 1fr) sets minimum 250px, maximum 1fr. This creates a fully responsive grid without media queries.",
        },
        {
          id: "exam3-mcq3",
          question: "What is the CSS cascade?",
          options: ["The waterfall animation effect", "The order CSS properties are applied when multiple rules conflict", "Loading CSS from a CDN", "The way CSS files cascade down folders"],
          correctIndex: 1,
          explanation: "The cascade determines which CSS declaration wins when multiple rules target the same element. It considers origin, specificity, and source order.",
        },
        {
          id: "exam3-mcq4",
          question: "Which CSS unit is relative to the root element's font size?",
          options: ["em", "rem", "px", "vw"],
          correctIndex: 1,
          explanation: "rem (root em) is relative to the root (<html>) element's font size. em is relative to the parent element's font size.",
        },
        {
          id: "exam3-mcq5",
          question: "What does 'position: absolute' do to an element?",
          options: ["Fixes it to the viewport", "Positions it relative to the nearest positioned ancestor", "Positions it relative to itself", "Makes it invisible"],
          correctIndex: 1,
          explanation: "position: absolute removes an element from normal flow and positions it relative to the nearest ancestor with position: relative/absolute/fixed/sticky.",
        },
        {
          id: "exam3-mcq6",
          question: "What is the purpose of the ::before and ::after pseudo-elements?",
          options: ["They target the first and last child elements", "They insert content before or after an element's content without modifying HTML", "They run before and after CSS is loaded", "They style header and footer elements"],
          correctIndex: 1,
          explanation: "::before and ::after insert virtual content boxes around an element's content. They require a content property (even if empty). Great for decorative elements.",
        },
        {
          id: "exam3-mcq7",
          question: "Which property controls the layout direction in Flexbox?",
          options: ["justify-direction", "flex-align", "flex-direction", "flow"],
          correctIndex: 2,
          explanation: "flex-direction: row (default) makes items horizontal; flex-direction: column stacks them vertically.",
        },
        {
          id: "exam3-mcq8",
          question: "What does the 'overflow: hidden' property do?",
          options: ["Hides the element", "Clips content that extends beyond the element's bounds", "Makes text invisible", "Disables scrolling on the page"],
          correctIndex: 1,
          explanation: "overflow: hidden clips any content that extends beyond the element's box. Common uses: hide overflowing text, contain floats, create clipping containers.",
        },
        {
          id: "exam3-mcq9",
          question: "What does 'vh' stand for in CSS units?",
          options: ["Vertical Height", "Viewport Height", "Variable Height", "Visible Height"],
          correctIndex: 1,
          explanation: "vh stands for Viewport Height. 1vh = 1% of the viewport height. 100vh = full screen height.",
        },
        {
          id: "exam3-mcq10",
          question: "What is the correct syntax for a CSS transition that animates transform over 0.3s?",
          options: ["animate: transform 0.3s", "transition: transform 0.3s ease", "transform-transition: 0.3s", "motion: transform 0.3s"],
          correctIndex: 1,
          explanation: "CSS transition syntax: transition: property duration timing-function. Example: transition: transform 0.3s ease",
        },
      ],
      codingQuestion: {
        prompt: "Create CSS styles for a card component with: a white background, subtle border, rounded corners (12px), inner padding (24px), a box shadow, a hover effect that lifts the card up (translateY), and a smooth transition. The card should be at most 400px wide.",
        starterCode: `/* Write your card styles here */

.card {
  /* Add all card styles */
}

.card:hover {
  /* Add hover effect */
}`,
        expectedKeywords: ["background", "border", "border-radius", "padding", "box-shadow", "transform", "translateY", "transition", "max-width"],
        hint: "Use background-color, border, border-radius:12px, padding:24px, box-shadow for the base. Add transform:translateY(-8px) on :hover. Use transition for smooth animation.",
        sampleAnswer: `.card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}`,
      },
    },
    challenges: [
      {
        id: "ch3-1",
        title: "Style a Navigation Bar",
        difficulty: "easy",
        description: "Style a horizontal navigation bar using Flexbox. It should have: a dark background, logo on the left, nav links on the right, hover effects on links, and be responsive.",
        starterCode: `/* Style the navigation */
nav {
  /* Add flexbox, background, padding */
}

nav .logo {
  /* Style the logo */
}

nav ul {
  /* Remove list styling, add flex */
}

nav a {
  /* Style links */
}

nav a:hover {
  /* Hover effect */
}`,
        expectedKeywords: ["display: flex", "justify-content", "background", "text-decoration: none", ":hover", "padding"],
        hint: "Use display:flex with justify-content:space-between on nav. Remove list-style from ul. Style a as color:white, text-decoration:none with a hover effect.",
      },
      {
        id: "ch3-2",
        title: "CSS Grid Dashboard Layout",
        difficulty: "medium",
        description: "Create a dashboard layout using CSS Grid with named template areas: a header across the top, a sidebar on the left (240px), main content area on the right, and a footer across the bottom.",
        starterCode: `.dashboard {
  /* Create grid with template areas */
  /* Define columns: sidebar=240px, main=1fr */
  /* Define rows: header=auto, content=1fr, footer=auto */
  min-height: 100vh;
}

.header { /* grid-area: header */ }
.sidebar { /* grid-area: sidebar */ }
.main { /* grid-area: main */ }
.footer { /* grid-area: footer */ }`,
        expectedKeywords: ["display: grid", "grid-template-areas", "grid-area", "grid-template-columns", "grid-template-rows"],
        hint: "Use grid-template-areas with a 3-row, 2-column layout. Assign grid-area names to each child element.",
      },
      {
        id: "ch3-3",
        title: "Animated Hero Section",
        difficulty: "hard",
        description: "Create a CSS hero section with: a gradient background, centered text using Flexbox, an animated heading (fade in from bottom), a button with hover animation, and a responsive layout (stacked on mobile).",
        starterCode: `/* Hero section with animations */
.hero {
  /* Full height, gradient background, flex centering */
}

.hero h1 {
  /* Large text with animation */
}

.hero .btn {
  /* Styled button with transition */
}

.hero .btn:hover {
  /* Hover effect */
}

@keyframes fadeInUp {
  /* Define the animation */
}

@media (max-width: 768px) {
  /* Responsive adjustments */
}`,
        expectedKeywords: ["display: flex", "justify-content: center", "align-items: center", "linear-gradient", "@keyframes", "animation", "transition", "@media"],
        hint: "Use min-height:100vh with display:flex and center alignment. Add a linear-gradient background. Create @keyframes for fadeInUp and apply it to h1. Style the button with transition.",
      },
    ],
    miniProject: {
      title: "Responsive Card Component with Dark Mode",
      description: "Build a responsive card component with full CSS styling including Flexbox/Grid layout, hover animations, and dark mode support using CSS custom properties.",
      steps: [
        "Set up CSS variables in :root for colors and spacing (light mode)",
        "Add .dark class variables for dark mode",
        "Create a responsive card grid using CSS Grid with auto-fill",
        "Style each card with border, padding, border-radius, and box-shadow",
        "Add smooth hover animation (translateY + box-shadow change)",
        "Add a button inside each card with hover and active states",
        "Add media queries for mobile (1 column) and tablet (2 columns)",
        "Add a transition to the body background for theme switching",
      ],
      starterCode: `/* CSS for responsive card grid with dark mode */

/* CSS Variables */
:root {
  --bg: #f8fafc;
  --card-bg: white;
  --text: #1e293b;
  --border: #e2e8f0;
}

.dark {
  /* Add dark mode variables */
}

/* Grid layout */
.card-grid {
  /* Responsive grid */
}

/* Card styles */
.card {
  /* Base card styles */
}

/* Hover effect */
.card:hover {
  /* Animation */
}`,
      expectedKeywords: ["--bg", ":root", ".dark", "display: grid", "auto-fill", "minmax", "transition", "transform", "@media"],
    },
  },
  {
    id: 4,
    title: "Bootstrap 5",
    slug: "bootstrap",
    icon: "🅱️",
    color: "indigo",
    description: "Rapidly build responsive, mobile-first websites using Bootstrap 5's grid system, utility classes, components, and forms.",
    topics: [
      {
        id: "4.1",
        title: "What is Bootstrap?",
        content: `**Bootstrap** is the world's most popular CSS framework. It provides a collection of pre-built CSS classes and JavaScript components that help you build responsive, mobile-first websites quickly.

**Why Bootstrap?**
- **Speed**: Build professional layouts in minutes without writing custom CSS
- **Responsive**: Built-in mobile-first responsive grid system
- **Consistent**: Cross-browser compatible styles
- **Components**: Ready-made navbars, modals, cards, forms, and more
- **Utility Classes**: Hundreds of helper classes for spacing, colors, typography

**Bootstrap 5 Changes from v4:**
- Dropped jQuery dependency (pure vanilla JavaScript)
- New utility API for generating custom utilities
- Improved grid system with xxl breakpoint
- CSS Grid support added
- New components: Offcanvas, Accordion updates
- RTL (right-to-left) support built-in

**Adding Bootstrap to a project:**
1. CDN (quickest for prototyping)
2. npm install bootstrap
3. Download files`,
        codeExample: {
          language: "html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap 5 Page</title>
  
  <!-- Bootstrap 5 CSS (CDN) -->
  <link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
    rel="stylesheet"
    integrity="sha384-..." 
    crossorigin="anonymous"
  >
</head>
<body>

  <!-- Your Bootstrap-powered content here -->
  <div class="container">
    <h1 class="text-primary fw-bold mt-4">Hello, Bootstrap!</h1>
    <p class="text-muted fs-5">Building fast with Bootstrap 5</p>
    <button class="btn btn-primary">Get Started</button>
  </div>

  <!-- Bootstrap 5 JavaScript Bundle (includes Popper.js) -->
  <script 
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-..." 
    crossorigin="anonymous"
  ></script>
</body>
</html>`,
          explanation: "Include Bootstrap CSS in <head> and the JS bundle before </body>. Always include the viewport meta tag for responsive behavior.",
        },
      },
      {
        id: "4.2",
        title: "The Bootstrap Grid System",
        content: `Bootstrap's grid is based on a **12-column flexbox system**. Every grid layout needs:

1. **Container** (\`.container\` or \`.container-fluid\`)
2. **Row** (\`.row\`)
3. **Columns** (\`.col-*\`)

**Breakpoints:**
| Breakpoint | Name | Min Width | Class Prefix |
|-----------|------|-----------|-------------|
| xs | Extra small | <576px | \`.col-\` |
| sm | Small | ≥576px | \`.col-sm-\` |
| md | Medium | ≥768px | \`.col-md-\` |
| lg | Large | ≥992px | \`.col-lg-\` |
| xl | Extra large | ≥1200px | \`.col-xl-\` |
| xxl | Extra extra large | ≥1400px | \`.col-xxl-\` |

**Column Sizing:**
- \`.col\` — Equal width (auto divides available space)
- \`.col-6\` — 6 columns (50% width)
- \`.col-md-4\` — 4 columns (33.3%) on medium screens+

**Grid Utilities:**
- \`.g-3\` — gap on both axes
- \`.gy-4\` — vertical gap only
- \`.gx-4\` — horizontal gap only
- \`.offset-md-2\` — Skip 2 columns`,
        codeExample: {
          language: "html",
          code: `<!-- Basic Grid -->
<div class="container">
  <div class="row g-3">
    
    <!-- Full width on mobile, half on tablet, third on desktop -->
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card p-3">Column 1</div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card p-3">Column 2</div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card p-3">Column 3</div>
    </div>
    
  </div>
</div>

<!-- Mixed column widths -->
<div class="container">
  <div class="row">
    <div class="col-md-8">Main Content (8/12)</div>
    <div class="col-md-4">Sidebar (4/12)</div>
  </div>
</div>

<!-- Auto columns (equal width) -->
<div class="container">
  <div class="row">
    <div class="col">Auto</div>
    <div class="col">Auto</div>
    <div class="col">Auto</div>
  </div>
</div>

<!-- Offset (skip columns) -->
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">Centered (6 cols, offset 3)</div>
  </div>
</div>

<!-- Nested grids -->
<div class="container">
  <div class="row">
    <div class="col-8">
      Outer column
      <div class="row">
        <div class="col-6">Nested col</div>
        <div class="col-6">Nested col</div>
      </div>
    </div>
    <div class="col-4">Side</div>
  </div>
</div>`,
          explanation: "Bootstrap's 12-column grid uses responsive class prefixes. col-12 col-md-6 col-lg-4 means: full width on mobile, 2 per row on tablet, 3 per row on desktop.",
        },
      },
      {
        id: "4.3",
        title: "Bootstrap Utility Classes",
        content: `Bootstrap provides hundreds of utility classes for common CSS patterns without writing custom CSS.

**Spacing (m=margin, p=padding):**
- \`m-3\` — margin all sides (1=4px, 2=8px, 3=12px, 4=16px, 5=24px)
- \`mt-4\` — margin-top 16px
- \`mx-auto\` — horizontal margins auto (center)
- \`py-5\` — padding top+bottom 48px

**Display:**
- \`d-none\` — display: none
- \`d-flex\` — display: flex
- \`d-md-block\` — block from md breakpoint

**Flexbox Utilities:**
- \`justify-content-between\` — space-between
- \`align-items-center\` — center vertically
- \`flex-column\` — column direction
- \`gap-3\` — gap: 12px

**Text:**
- \`text-center\` / \`text-start\` / \`text-end\`
- \`text-primary\` / \`text-danger\` / \`text-muted\`
- \`fw-bold\` / \`fw-light\`
- \`fs-1\` to \`fs-6\` — font sizes

**Background & Colors:**
- \`bg-primary\`, \`bg-success\`, \`bg-danger\`, \`bg-warning\`, \`bg-info\`
- \`bg-light\`, \`bg-dark\`, \`bg-white\`, \`bg-transparent\`

**Border & Sizing:**
- \`border\`, \`border-primary\`, \`rounded-3\`
- \`w-100\` — width 100%
- \`h-100\` — height 100%`,
        codeExample: {
          language: "html",
          code: `<!-- Spacing utilities -->
<div class="p-4 mb-3 bg-light rounded">
  Padded box with margin-bottom
</div>

<!-- Flex utilities -->
<div class="d-flex justify-content-between align-items-center p-3 border">
  <span class="fw-bold text-primary">Title</span>
  <button class="btn btn-sm btn-outline-primary">Action</button>
</div>

<!-- Text utilities -->
<h2 class="text-center text-primary fw-bold mb-2">Main Title</h2>
<p class="text-muted text-center fs-5">Subtitle text</p>

<!-- Color utilities -->
<div class="bg-primary text-white p-3 rounded mb-2">Primary background</div>
<div class="bg-success text-white p-3 rounded mb-2">Success background</div>
<div class="bg-warning text-dark p-3 rounded mb-2">Warning background</div>

<!-- Responsive display -->
<p class="d-none d-md-block">Visible only on medium screens and above</p>
<p class="d-block d-md-none">Visible only on small screens</p>

<!-- Common pattern: centered card -->
<div class="row justify-content-center">
  <div class="col-md-6">
    <div class="card p-4 shadow-sm">
      <h3 class="mb-3">Card Title</h3>
      <p class="text-muted mb-4">Card description text goes here.</p>
      <button class="btn btn-primary w-100">Take Action</button>
    </div>
  </div>
</div>`,
          explanation: "Bootstrap utilities follow a consistent naming pattern: property-value (e.g., mt-3 = margin-top level 3). Responsive variants add the breakpoint: d-md-flex.",
        },
      },
      {
        id: "4.4",
        title: "Bootstrap Components",
        content: `Bootstrap provides ready-made UI components. Here are the most important ones:

**Navigation:**
- \`.navbar\` — Responsive navigation bar
- \`.navbar-brand\` — Logo/brand name
- \`.navbar-toggler\` — Mobile hamburger button
- \`.nav-link\` — Navigation links
- \`.active\` — Current page indicator

**Cards:**
- \`.card\` — Container
- \`.card-img-top\` — Image at top
- \`.card-body\` — Padded content area
- \`.card-title\`, \`.card-text\`, \`.card-link\`

**Alerts:**
- \`.alert alert-primary/success/danger/warning/info\`
- \`.alert-dismissible\` — With close button

**Badges:**
- \`.badge bg-primary\` — Small label
- Position on icon: \`.position-relative\`

**Buttons:**
- \`.btn btn-primary/secondary/success/danger/warning/info/light/dark\`
- \`.btn-outline-primary\` — Outlined variant
- \`.btn-sm\` / \`.btn-lg\` — Size variants
- \`.btn-group\` — Group of buttons

**Modal:**
- Triggered by data attributes
- \`data-bs-toggle="modal" data-bs-target="#myModal"\`

**Accordion:**
- \`data-bs-toggle="collapse"\`
- Perfect for FAQs`,
        codeExample: {
          language: "html",
          code: `<!-- Responsive Navbar -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">CodeLearn</a>
    
    <!-- Hamburger for mobile -->
    <button class="navbar-toggler" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Courses</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Card Component -->
<div class="card shadow-sm">
  <img src="course.jpg" class="card-img-top" alt="Course thumbnail">
  <div class="card-body">
    <span class="badge bg-primary mb-2">Beginner</span>
    <h5 class="card-title">HTML5 Fundamentals</h5>
    <p class="card-text text-muted">Learn the building blocks of the web.</p>
    <a href="#" class="btn btn-primary w-100">Enroll Now</a>
  </div>
</div>

<!-- Alert messages -->
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Well done!</strong> You passed the quiz with 90%.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Modal trigger -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
  Login
</button>

<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Login</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="email" class="form-control mb-3" placeholder="Email">
        <input type="password" class="form-control" placeholder="Password">
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary">Login</button>
      </div>
    </div>
  </div>
</div>`,
          explanation: "Bootstrap components work via CSS classes and data attributes (data-bs-*). No JavaScript code needed — just add the right classes.",
        },
      },
      {
        id: "4.5",
        title: "Bootstrap Forms",
        content: `Bootstrap provides beautiful, consistent form styling out of the box.

**Key Classes:**
- \`.form-control\` — Styled input, textarea, select
- \`.form-label\` — Styled label
- \`.form-check\` — Wrapper for checkboxes/radios
- \`.form-check-input\` — Styled checkbox/radio input
- \`.form-check-label\` — Label for checkbox/radio
- \`.form-select\` — Styled select dropdown
- \`.form-text\` — Help text below field
- \`.mb-3\` — Standard spacing between fields

**Validation States:**
- \`.is-valid\` — Green valid state
- \`.is-invalid\` — Red invalid state
- \`.valid-feedback\` / \`.invalid-feedback\` — Feedback messages

**Input Groups:**
- \`.input-group\` — Container
- \`.input-group-text\` — Addon (icon or text) before/after input

**Floating Labels:**
- \`.form-floating\` — Label floats above when focused/filled`,
        codeExample: {
          language: "html",
          code: `<form class="needs-validation" novalidate>
  <!-- Standard input with floating label -->
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
    <label for="email">Email address</label>
    <div class="invalid-feedback">Please enter a valid email.</div>
  </div>
  
  <!-- Input with icon addon -->
  <div class="input-group mb-3">
    <span class="input-group-text">
      <i class="bi bi-search"></i> <!-- Bootstrap Icons -->
    </span>
    <input type="text" class="form-control" placeholder="Search courses...">
    <button class="btn btn-primary">Search</button>
  </div>
  
  <!-- Select dropdown -->
  <div class="mb-3">
    <label for="level" class="form-label">Experience Level</label>
    <select class="form-select" id="level" required>
      <option selected disabled value="">Choose level...</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
  </div>
  
  <!-- Range slider -->
  <div class="mb-3">
    <label class="form-label">Budget: $<span id="budgetValue">50</span></label>
    <input type="range" class="form-range" min="0" max="200" value="50"
           oninput="document.getElementById('budgetValue').textContent = this.value">
  </div>
  
  <!-- Checkboxes -->
  <div class="mb-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="html" value="html" checked>
      <label class="form-check-label" for="html">HTML</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="css" value="css">
      <label class="form-check-label" for="css">CSS</label>
    </div>
  </div>
  
  <!-- Switch toggle -->
  <div class="form-check form-switch mb-4">
    <input class="form-check-input" type="checkbox" id="newsletter" checked>
    <label class="form-check-label" for="newsletter">Subscribe to newsletter</label>
  </div>
  
  <!-- Submit -->
  <button class="btn btn-primary btn-lg w-100" type="submit">Create Account</button>
</form>`,
          explanation: "Bootstrap handles form styling automatically. Use .form-control on inputs, .form-label on labels, and .mb-3 for spacing. The .is-invalid/.is-valid classes add visual validation feedback.",
        },
      },
      {
        id: "4.6",
        title: "Bootstrap Admin Dashboard Layout",
        content: `Let's build a practical admin dashboard layout combining multiple Bootstrap components.

**Layout Strategy:**
- Sidebar using column classes
- Main content area
- Top stats cards
- Data table
- Breadcrumbs for navigation

**Key patterns:**
- \`sticky-top\` — Sticky positioning
- \`vh-100\` — Full viewport height
- \`overflow-auto\` — Scrollable content
- \`d-flex flex-column\` — Vertical flex layout`,
        codeExample: {
          language: "html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .sidebar { width: 250px; min-height: 100vh; }
    .nav-link { color: rgba(255,255,255,.6); }
    .nav-link:hover, .nav-link.active { color: white; background: rgba(255,255,255,.1); border-radius: 6px; }
  </style>
</head>
<body class="bg-light">

<div class="d-flex">
  <!-- Sidebar -->
  <div class="sidebar bg-dark p-3 d-flex flex-column">
    <h5 class="text-white fw-bold mb-4">📊 AdminPanel</h5>
    <nav class="nav flex-column gap-1">
      <a href="#" class="nav-link active py-2 px-3">🏠 Dashboard</a>
      <a href="#" class="nav-link py-2 px-3">👥 Users</a>
      <a href="#" class="nav-link py-2 px-3">📦 Products</a>
      <a href="#" class="nav-link py-2 px-3">📊 Reports</a>
      <a href="#" class="nav-link py-2 px-3">⚙️ Settings</a>
    </nav>
    <div class="mt-auto">
      <a href="#" class="nav-link py-2 px-3">🚪 Logout</a>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="flex-grow-1">
    <!-- Top bar -->
    <div class="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
      <h6 class="mb-0 fw-semibold">Dashboard Overview</h6>
      <div class="d-flex align-items-center gap-3">
        <span class="badge bg-success">● Online</span>
        <img src="https://i.pravatar.cc/32" class="rounded-circle" alt="User">
      </div>
    </div>
    
    <div class="p-4">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
      
      <!-- Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="p-3 bg-primary bg-opacity-10 rounded-3 fs-3">👥</div>
              <div>
                <p class="text-muted small mb-0">Total Users</p>
                <h4 class="fw-bold mb-0">12,489</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="p-3 bg-success bg-opacity-10 rounded-3 fs-3">💰</div>
              <div>
                <p class="text-muted small mb-0">Revenue</p>
                <h4 class="fw-bold mb-0">$94,200</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Data Table -->
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white d-flex justify-content-between">
          <h6 class="mb-0">Recent Orders</h6>
          <button class="btn btn-sm btn-outline-primary">Export CSV</button>
        </div>
        <div class="card-body p-0">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Ahmed H.</td>
                <td>HTML5 Mastery</td>
                <td>$29</td>
                <td><span class="badge bg-success">Completed</span></td>
              </tr>
              <tr>
                <td>002</td>
                <td>Sara M.</td>
                <td>CSS Advanced</td>
                <td>$39</td>
                <td><span class="badge bg-warning text-dark">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`,
          explanation: "This admin dashboard combines Bootstrap's grid, flexbox utilities, cards, tables, and badges. The sidebar is a fixed-width div; the main content uses flex-grow-1 to fill remaining space.",
        },
      },
    ],
    quiz: [
      {
        id: "q4-1",
        question: "How many columns does Bootstrap's grid system have?",
        options: ["8", "10", "12", "16"],
        correctIndex: 2,
        explanation: "Bootstrap uses a 12-column grid system. All column classes (col-4, col-6, etc.) are based on 12 total columns.",
      },
      {
        id: "q4-2",
        question: "Which class makes an input field styled with Bootstrap?",
        options: [".input", ".form-input", ".form-control", ".styled-input"],
        correctIndex: 2,
        explanation: ".form-control applies Bootstrap's styled appearance to input, textarea, and select elements.",
      },
      {
        id: "q4-3",
        question: "What does col-md-6 mean?",
        options: ["6% width on all screens", "6 pixels wide", "6 out of 12 columns (50%) on medium screens and above", "6 columns on small screens only"],
        correctIndex: 2,
        explanation: "col-md-6 means 6 of 12 columns (50% width) starting from the medium breakpoint (768px+).",
      },
      {
        id: "q4-4",
        question: "Which Bootstrap 5 change removed a major dependency?",
        options: ["Removed CSS", "Removed jQuery (now pure JavaScript)", "Removed the grid system", "Removed responsive features"],
        correctIndex: 1,
        explanation: "Bootstrap 5 removed jQuery as a dependency, making it lighter and using vanilla JavaScript instead.",
      },
      {
        id: "q4-5",
        question: "What class creates a responsive navbar that collapses on mobile?",
        options: ["navbar-responsive", "navbar-collapse", "navbar-expand-lg", "navbar-mobile"],
        correctIndex: 2,
        explanation: "navbar-expand-lg means the navbar is expanded (horizontal) on large screens and collapses to a hamburger menu on smaller screens.",
      },
      {
        id: "q4-6",
        question: "Which class adds a bottom margin of level 3 in Bootstrap?",
        options: ["pb-3", "m-3", "mb-3", "margin-3"],
        correctIndex: 2,
        explanation: "mb-3 means margin-bottom level 3 (12px in Bootstrap's default spacing scale).",
      },
      {
        id: "q4-7",
        question: "What does 'g-3' do in a Bootstrap row?",
        options: ["Sets font size to 3", "Sets opacity to 3", "Adds gap/gutters of level 3 between columns", "Adds 3px border"],
        correctIndex: 2,
        explanation: "g-3 adds gutters (gaps) between row columns in both directions. gy-3 is vertical only, gx-3 is horizontal only.",
      },
      {
        id: "q4-8",
        question: "Which class makes a Bootstrap button full-width?",
        options: ["btn-block", "btn-full", "w-100", "full-btn"],
        correctIndex: 2,
        explanation: "Bootstrap 5 removed btn-block. Use w-100 (width: 100%) to make buttons full-width.",
      },
      {
        id: "q4-9",
        question: "What data attribute triggers a Bootstrap modal?",
        options: ["data-modal", "data-bs-toggle='modal'", "onClick='modal'", "trigger='modal'"],
        correctIndex: 1,
        explanation: "data-bs-toggle='modal' and data-bs-target='#modalId' trigger a Bootstrap modal without any JavaScript code.",
      },
      {
        id: "q4-10",
        question: "Which Bootstrap class creates a form with floating labels?",
        options: [".float-label", ".form-floating", ".label-up", ".input-float"],
        correctIndex: 1,
        explanation: ".form-floating wraps an input and label to create the floating label effect where the label moves up when the input is focused or has content.",
      },
    ],
    exam: {
      trueFalse: [
        { id: "tf4-1", statement: "Bootstrap 5 requires jQuery to work.", answer: false, explanation: "Bootstrap 5 dropped jQuery — it uses vanilla JavaScript only." },
        { id: "tf4-2", statement: "The Bootstrap grid is based on 12 columns.", answer: true, explanation: "Bootstrap uses a 12-column system making it easy to create layouts: 2+10, 4+8, 6+6, 4+4+4, etc." },
        { id: "tf4-3", statement: "col-md-12 takes up the full width on medium screens.", answer: true, explanation: "12 out of 12 columns = 100% width." },
        { id: "tf4-4", statement: "The .container class makes a fluid full-width container.", answer: false, explanation: ".container has a max-width at each breakpoint. .container-fluid is always full-width." },
        { id: "tf4-5", statement: "Bootstrap's utility classes follow a consistent naming pattern.", answer: true, explanation: "Bootstrap utilities follow patterns like: m{side}-{size}, d-{breakpoint}-{value}, text-{color}, etc." },
        { id: "tf4-6", statement: "You can apply multiple Bootstrap classes to one element.", answer: true, explanation: "This is the key to Bootstrap — combine classes: class='btn btn-primary btn-lg w-100 mt-3'" },
        { id: "tf4-7", statement: "Bootstrap modals require you to write JavaScript to open them.", answer: false, explanation: "Bootstrap modals can be triggered with data attributes alone: data-bs-toggle='modal' data-bs-target='#myModal'." },
        { id: "tf4-8", statement: "'text-primary' in Bootstrap applies a blue color by default.", answer: true, explanation: "Bootstrap's 'primary' color is blue by default. It can be customized with Sass variables." },
        { id: "tf4-9", statement: "The 'offset-md-3' class moves an element 3 columns to the right.", answer: true, explanation: "Offset classes add left margin equal to the specified number of columns, effectively shifting the element right." },
        { id: "tf4-10", statement: "Bootstrap's responsive breakpoints only support mobile and desktop.", answer: false, explanation: "Bootstrap has 6 breakpoints: xs (<576px), sm (576px+), md (768px+), lg (992px+), xl (1200px+), xxl (1400px+)." },
      ],
      mcq: [
        {
          id: "exam4-mcq1",
          question: "What is the correct class combination for a centered, medium-sized primary button?",
          options: ["button-center-primary", "btn btn-primary mx-auto", "btn btn-primary text-center", "primary-btn medium"],
          correctIndex: 1,
          explanation: "btn btn-primary creates a styled button. mx-auto centers it (needs d-block or fixed width). btn-md is not a class — medium is the default.",
        },
        {
          id: "exam4-mcq2",
          question: "How do you create a Bootstrap card with an image on top, body with title and text, and a button?",
          options: [
            "Use .card with .card-image, .card-content",
            "Use .card with .card-img-top, .card-body containing .card-title, .card-text, and a button",
            "Use .panel with .panel-heading and .panel-body",
            "Use .box with .box-image and .box-text"
          ],
          correctIndex: 1,
          explanation: "A Bootstrap card structure: <div class='card'><img class='card-img-top'><div class='card-body'><h5 class='card-title'><p class='card-text'><a class='btn btn-primary'>",
        },
        {
          id: "exam4-mcq3",
          question: "In Bootstrap's grid, what class makes content 8 columns wide on large screens?",
          options: ["col-8", "col-large-8", "col-lg-8", "col-l-8"],
          correctIndex: 2,
          explanation: "col-lg-8 applies 8-column width starting at the lg breakpoint (992px+). col-8 applies at all sizes.",
        },
        {
          id: "exam4-mcq4",
          question: "What is the purpose of .navbar-toggler in Bootstrap?",
          options: ["Changes navbar colors", "The hamburger menu button shown on mobile", "Adds dropdown to navbar", "Toggles dark mode"],
          correctIndex: 1,
          explanation: ".navbar-toggler is the hamburger button that shows on small screens. When clicked, it toggles the collapsed navbar menu.",
        },
        {
          id: "exam4-mcq5",
          question: "Which class creates a Bootstrap badge (small label)?",
          options: ["label", "tag", "chip", "badge"],
          correctIndex: 3,
          explanation: ".badge with a background color class creates a small inline label: <span class='badge bg-primary'>New</span>",
        },
        {
          id: "exam4-mcq6",
          question: "What does the Bootstrap class 'shadow-sm' do?",
          options: ["Makes text smaller", "Adds a small box shadow", "Creates a small button", "Reduces opacity"],
          correctIndex: 1,
          explanation: "shadow-sm adds a small subtle box-shadow. Bootstrap also has shadow, shadow-lg, and shadow-none.",
        },
        {
          id: "exam4-mcq7",
          question: "How do you make a Bootstrap table's rows highlight on hover?",
          options: [".table-highlight", ".table-active", ".table-hover", ".table-interactive"],
          correctIndex: 2,
          explanation: ".table-hover added to the <table> element makes rows highlight when the mouse hovers over them.",
        },
        {
          id: "exam4-mcq8",
          question: "Which class creates accordion-style collapsible sections?",
          options: [".accordion", ".collapse-group", ".panel-group", ".expandable"],
          correctIndex: 0,
          explanation: ".accordion with .accordion-item, .accordion-header, .accordion-button, and .accordion-collapse creates Bootstrap accordions.",
        },
        {
          id: "exam4-mcq9",
          question: "What does 'ms-auto' do in Bootstrap flexbox utilities?",
          options: ["Sets margin-start to auto (pushes element to the right)", "Sets maximum size to auto", "Makes text start with auto", "Sets margin-size automatically"],
          correctIndex: 0,
          explanation: "ms-auto (margin-start: auto) in a flex container pushes an element to the far right. Common pattern: <ul class='navbar-nav ms-auto'> to right-align nav links.",
        },
        {
          id: "exam4-mcq10",
          question: "Which Bootstrap class creates a progress bar?",
          options: ["<div class='progress'>", ".progressbar", ".loading-bar", ".bar"],
          correctIndex: 0,
          explanation: "Bootstrap progress: <div class='progress'><div class='progress-bar' style='width:75%'>75%</div></div>",
        },
      ],
      codingQuestion: {
        prompt: "Using Bootstrap 5, create a responsive pricing card component. It should contain: a card header with the plan name ('Pro Plan'), a card body with a large price ($49/month), a list of 4 features using Bootstrap list-group, and a 'Get Started' button that spans full width. Make it look professional.",
        starterCode: `<!-- Bootstrap 5 Pricing Card -->
<!-- Include Bootstrap CSS link first -->
<div class="...">
  <!-- Build your pricing card here -->
</div>`,
        expectedKeywords: ["card", "card-header", "card-body", "list-group", "btn", "btn-primary", "w-100", "h2", "$49"],
        hint: "Use .card structure with .card-header, .card-body. Add price in an h2. Use .list-group.list-group-flush inside .card-body. Add .btn.btn-primary.w-100.",
        sampleAnswer: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="card shadow-lg" style="max-width: 350px; margin: 2rem auto;">
  <div class="card-header bg-primary text-white text-center py-3">
    <h5 class="mb-0 fw-bold">Pro Plan</h5>
    <small>Most Popular</small>
  </div>
  <div class="card-body text-center p-4">
    <h2 class="display-4 fw-bold text-primary">$49<small class="fs-6 text-muted fw-normal">/month</small></h2>
    <p class="text-muted">Perfect for growing teams</p>
    
    <ul class="list-group list-group-flush text-start my-3">
      <li class="list-group-item border-0 py-2">✅ Unlimited projects</li>
      <li class="list-group-item border-0 py-2">✅ 50GB storage</li>
      <li class="list-group-item border-0 py-2">✅ Priority support 24/7</li>
      <li class="list-group-item border-0 py-2">✅ Advanced analytics</li>
    </ul>
    
    <button class="btn btn-primary btn-lg w-100">Get Started</button>
    <p class="text-muted mt-2 small">No credit card required</p>
  </div>
</div>`,
      },
    },
    challenges: [
      {
        id: "ch4-1",
        title: "Bootstrap Responsive Navbar",
        difficulty: "easy",
        description: "Create a Bootstrap navbar with: brand logo text, navigation links (Home, Courses, About, Contact), a search input, and a Login button. It should collapse on mobile.",
        starterCode: `<!-- Bootstrap 5 Navbar -->
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <!-- Add navbar brand, toggler, collapse, links, search, and button -->
    
  </div>
</nav>`,
        expectedKeywords: ["navbar-brand", "navbar-toggler", "collapse", "navbar-nav", "nav-link", "form-control", "btn"],
        hint: "Use navbar-brand for logo, navbar-toggler for hamburger, collapse navbar-collapse for the menu, and ms-auto to right-align the login button.",
      },
      {
        id: "ch4-2",
        title: "Course Cards Grid",
        difficulty: "medium",
        description: "Create a responsive grid of 3 Bootstrap cards showing web development courses. Each card should have: a colored header, course title, description, a badge (level), and an Enroll button. Use the grid to show 1 card on mobile, 2 on tablet, 3 on desktop.",
        starterCode: `<!-- Bootstrap Course Cards -->
<div class="container py-5">
  <h2 class="text-center mb-4">Our Courses</h2>
  <div class="row g-4">
    <!-- Add 3 course cards here -->
    
  </div>
</div>`,
        expectedKeywords: ["col-12", "col-md-6", "col-lg-4", "card", "card-header", "card-body", "badge", "btn-primary"],
        hint: "Use col-12 col-md-6 col-lg-4 for each card column. Inside each card: card-header for color, card-body for content, badge for level, btn for enrollment.",
      },
      {
        id: "ch4-3",
        title: "Admin Dashboard with Sidebar",
        difficulty: "hard",
        description: "Build a complete admin dashboard layout with Bootstrap: a fixed-width sidebar with navigation, a top bar, 4 stats cards in a row, and a table. Use Bootstrap's flexbox utilities for layout.",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!-- d-flex for sidebar + main layout -->
  <div class="d-flex">
    <!-- Sidebar here -->
    
    <!-- Main content here -->
    
  </div>
</body>
</html>`,
        expectedKeywords: ["d-flex", "flex-grow-1", "bg-dark", "card", "table", "badge", "navbar", "nav-link"],
        hint: "Use d-flex wrapper. Sidebar: fixed width div with bg-dark. Main: flex-grow-1 with top bar and content. Use row g-3 for stats cards. Use table table-hover for data.",
      },
    ],
    miniProject: {
      title: "Bootstrap Course Platform Page",
      description: "Build a complete web page for a coding course platform using Bootstrap 5. Include: responsive navbar, hero section with jumbotron effect, features section with 3 cards, a pricing table, and a footer.",
      steps: [
        "Set up HTML file with Bootstrap 5 CDN links",
        "Create a responsive navbar with brand, links, and a CTA button",
        "Add a hero/jumbotron section with bg-primary, large heading, subtext, and two buttons",
        "Create a 'Why Choose Us' section with 3 feature cards using col-md-4",
        "Build a pricing section with 3 plan cards using col-lg-4 (Basic, Pro, Enterprise)",
        "Add a testimonials section using Bootstrap's blockquote component",
        "Create a footer with links, copyright, and social badges",
        "Test responsiveness using browser DevTools mobile emulation",
      ],
      starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeLearn - Web Development Courses</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!-- Navbar -->
  
  <!-- Hero Section -->
  
  <!-- Features Section -->
  
  <!-- Pricing Section -->
  
  <!-- Footer -->
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`,
      expectedKeywords: ["navbar", "container", "row", "col-md-4", "col-lg-4", "card", "btn-primary", "bg-primary", "footer"],
    },
  },
  {
    id: 5,
    title: "JavaScript",
    slug: "javascript",
    icon: "⚡",
    color: "yellow",
    description: "Learn JavaScript from variables and functions to DOM manipulation, events, arrays, objects, and building interactive web applications.",
    topics: [
      {
        id: "5.1",
        title: "Introduction to JavaScript",
        content: `**JavaScript** is a programming language that makes web pages interactive. It's the only programming language that runs natively in web browsers.

**What JavaScript Can Do:**
- Respond to user interactions (clicks, typing, scrolling)
- Modify HTML/CSS dynamically (DOM manipulation)
- Validate form data before submission
- Fetch data from servers (AJAX/Fetch API)
- Create animations and visual effects
- Build full applications (with Node.js, even servers!)

**How to Add JavaScript:**
1. **External file** (recommended): \`<script src="script.js" defer></script>\`
2. **Internal**: \`<script>code here</script>\` in HTML
3. **Inline** (avoid): \`<button onclick="doSomething()">\`

**JavaScript in the Browser vs Node.js:**
- **Browser**: Can access DOM, window, document, localStorage
- **Node.js**: Can access file system, network, modules

**Running JavaScript:**
- Open browser DevTools → Console tab → type code directly
- Include in HTML via \`<script>\` tag`,
        codeExample: {
          language: "javascript",
          code: `// Single-line comment

/*
  Multi-line comment
  Describes blocks of code
*/

// Output to browser console (DevTools → Console)
console.log("Hello, JavaScript!");
console.log(42);
console.log(true);
console.log([1, 2, 3]);
console.log({ name: "Ahmed", age: 21 });

// Different console methods
console.warn("This is a warning!");
console.error("This is an error!");
console.table([{ name: "Alice", score: 95 }, { name: "Bob", score: 88 }]);

// JavaScript in browser: access DOM
document.title = "JS Changed This!";
console.log("Page URL:", window.location.href);`,
          explanation: "console.log() is your main debugging tool. Press F12 in Chrome, click the Console tab, and you can type JavaScript directly. This is how you experiment and debug.",
        },
        tips: [
          "Press F12 → Console in Chrome to run JavaScript immediately.",
          "Use console.log() liberally while learning — it's how you see what's happening.",
          "JavaScript is case-sensitive: myVariable ≠ MyVariable ≠ MYVARIABLE",
        ],
      },
      {
        id: "5.2",
        title: "Variables and Data Types",
        content: `**Declaring Variables:**
- \`const\` — Constant: cannot be reassigned (use by default)
- \`let\` — Can be reassigned (use when value will change)
- \`var\` — Old way, has quirks, avoid it

**JavaScript Data Types:**
1. **String** — Text: \`"hello"\`, \`'world'\`, \`\`template literals\`\`
2. **Number** — All numbers: \`42\`, \`3.14\`, \`-7\`
3. **Boolean** — \`true\` or \`false\`
4. **null** — Intentional absence of value
5. **undefined** — Variable declared but not assigned
6. **Symbol** — Unique identifier (advanced)
7. **BigInt** — Very large integers (advanced)
8. **Object** — Collection of key-value pairs \`{}\`
9. **Array** — Ordered list \`[]\` (technically an object)
10. **Function** — Callable code block

**Type Checking:**
- \`typeof value\` — Returns string: "string", "number", "boolean", "object", "undefined"

**Type Coercion:**
JavaScript automatically converts types in some situations (implicit coercion):
- \`"5" + 3 = "53"\` (string concatenation)
- \`"5" - 3 = 2\` (numeric subtraction)
- Use explicit conversion: \`Number("5")\`, \`String(42)\`, \`Boolean(0)\``,
        codeExample: {
          language: "javascript",
          code: `// const - value never changes
const PI = 3.14159;
const MAX_SCORE = 100;
const APP_NAME = "CodeLearn";

// let - value can change
let score = 0;
let username = "Ahmed";
let isLoggedIn = false;

score = 95;        // OK: reassigning let
// PI = 3;         // ERROR: cannot reassign const

// Data Types
const name = "Sara Mohamed";     // String
const age = 21;                   // Number
const gpa = 3.85;                 // Number (float)
const isStudent = true;           // Boolean
const address = null;             // null (no value yet)
let phoneNumber;                   // undefined (not assigned)

// Template Literals (backticks) - powerful string interpolation
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
console.log(greeting); // Hello, Sara Mohamed! You are 21 years old.

// Multi-line template literal
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>GPA: \${gpa}</p>
  </div>
\`;

// Type checking
console.log(typeof name);        // "string"
console.log(typeof age);         // "number"
console.log(typeof isStudent);   // "boolean"
console.log(typeof null);        // "object" (JavaScript quirk!)
console.log(typeof undefined);   // "undefined"

// Type conversion
const numStr = "42";
console.log(typeof numStr);           // "string"
console.log(typeof Number(numStr));   // "number"
console.log(Number("abc"));           // NaN (Not a Number)
console.log(Boolean(0));              // false
console.log(Boolean(""));            // false
console.log(Boolean("hello"));       // true`,
          explanation: "Use const by default. Only use let when you need to reassign. Template literals (backticks) are the modern way to embed variables in strings.",
        },
        tips: [
          "Use const by default — switch to let only when you actually need to reassign.",
          "Template literals (backticks) are cleaner than string concatenation for embedding values.",
          "NaN is 'Not a Number' — any invalid numeric operation returns NaN.",
        ],
        commonMistakes: [
          "Using var instead of const/let — var has function scope and hoisting quirks.",
          "Forgetting that null === null is true, but typeof null is 'object' (a known JS bug).",
          "Comparing with == instead of === — always use strict equality ===",
        ],
      },
      {
        id: "5.3",
        title: "Operators",
        content: `**Arithmetic Operators:**
\`+\` \`-\` \`*\` \`/\` \`%\` (modulo) \`**\` (exponent)

**Assignment Operators:**
\`=\` \`+=\` \`-=\` \`*=\` \`/=\` \`%=\`

**Comparison Operators (always use === and !==):**
- \`===\` — Strict equality (same value AND type)
- \`!==\` — Strict inequality
- \`==\` — Loose equality (type coercion, AVOID)
- \`>\` \`<\` \`>=\` \`<=\`

**Logical Operators:**
- \`&&\` — AND (both must be true)
- \`||\` — OR (at least one must be true)
- \`!\` — NOT (inverts boolean)

**String Operator:**
- \`+\` — Concatenation: \`"Hello " + "World"\`

**Special Operators:**
- \`typeof\` — Type of value
- Optional chaining (?.) — Safe property access: user?.address?.city
- Nullish coalescing (??) — Default for null/undefined: value ?? "default"
- Ternary: condition ? valueIfTrue : valueIfFalse`,
        codeExample: {
          language: "javascript",
          code: `// Arithmetic
console.log(10 + 5);    // 15
console.log(10 - 5);    // 5
console.log(10 * 5);    // 50
console.log(10 / 3);    // 3.333...
console.log(10 % 3);    // 1 (remainder)
console.log(2 ** 10);   // 1024 (2 to the power of 10)

// Increment/Decrement
let count = 0;
count++;  // count = 1
count--;  // count = 0
count += 5;  // count = 5

// ALWAYS use strict equality ===
console.log(5 === 5);      // true
console.log(5 === "5");    // false (different types!)
console.log(5 == "5");     // true (AVOID - type coercion)
console.log(null === undefined); // false
console.log(null == undefined);  // true (AVOID!)

// Logical operators
const age = 20;
const hasID = true;
const canEnter = age >= 18 && hasID;  // true
const isMember = false;
const canDiscount = isMember || age < 25;  // true

// Ternary operator (inline if/else)
const grade = 85;
const letterGrade = grade >= 90 ? "A" : grade >= 80 ? "B" : grade >= 70 ? "C" : "F";
console.log(letterGrade); // "B"

// Optional chaining (safe property access)
const user = { name: "Ahmed", address: null };
console.log(user.address?.city);   // undefined (no error!)
// console.log(user.address.city); // TypeError: Cannot read property

// Nullish coalescing (default for null/undefined only)
const username = null;
console.log(username ?? "Guest");   // "Guest"
console.log(username || "Guest");   // "Guest" (also works but catches 0, "", false)`,
          explanation: "Always use === (triple equals) for comparisons — == does type coercion which leads to surprising bugs. Use ?. for safe property access and ?? for null/undefined defaults.",
        },
      },
      {
        id: "5.4",
        title: "Control Flow",
        content: `**if / else if / else:**
Execute different code based on conditions.

**switch:**
Multiple conditions based on a single value.

**Loops:**
- \`for\` — Classic loop with counter
- \`while\` — Loop while condition is true
- \`do...while\` — Runs once then checks
- \`for...of\` — Iterate array values (modern)
- \`for...in\` — Iterate object keys (modern)
- \`forEach()\` / \`map()\` — Array methods (functional)

**Loop Control:**
- \`break\` — Exit the loop immediately
- \`continue\` — Skip current iteration`,
        codeExample: {
          language: "javascript",
          code: `// if / else if / else
const score = 78;

if (score >= 90) {
  console.log("Grade: A — Excellent!");
} else if (score >= 80) {
  console.log("Grade: B — Good");
} else if (score >= 70) {
  console.log("Grade: C — Average");
} else if (score >= 60) {
  console.log("Grade: D — Below Average");
} else {
  console.log("Grade: F — Failed");
}
// Output: Grade: C — Average

// switch statement
const day = "Monday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  case "Monday":
  case "Friday":
    console.log("Start/end of work week");
    break;
  default:
    console.log("Regular workday");
}

// for loop
for (let i = 1; i <= 5; i++) {
  console.log(\`Chapter \${i}\`);
}

// for...of (iterate array values)
const courses = ["HTML", "CSS", "JavaScript", "Bootstrap"];
for (const course of courses) {
  console.log("Course:", course);
}

// while loop
let attempts = 0;
while (attempts < 3) {
  console.log(\`Attempt \${attempts + 1}\`);
  attempts++;
}

// Array forEach
const grades = [85, 92, 78, 95, 88];
grades.forEach((grade, index) => {
  console.log(\`Student \${index + 1}: \${grade}\`);
});

// break and continue
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue; // Skip even numbers
  if (i > 7) break;          // Stop at 7
  console.log(i);            // 1, 3, 5, 7
}`,
          explanation: "Use for...of to iterate arrays — it's cleaner than traditional for loops. Use for...in for object keys. Always include break in switch cases or they'll fall through.",
        },
      },
      {
        id: "5.5",
        title: "Functions",
        content: `Functions are reusable blocks of code. JavaScript has several ways to define them.

**Function Types:**
1. **Function Declaration** — Hoisted (can call before declaration)
2. **Function Expression** — Not hoisted, assigned to variable
3. **Arrow Function** — Shorter syntax, no own \`this\`
4. **Default Parameters** — Default values if not provided
5. **Rest Parameters** — Collect remaining args into array

**Key Concepts:**
- \`return\` — Send a value back from the function
- **Parameters** — Variables listed in function definition
- **Arguments** — Actual values passed when calling
- **Scope** — Variables declared inside a function are local
- **Closure** — Inner function remembers outer function's variables`,
        codeExample: {
          language: "javascript",
          code: `// 1. Function Declaration (hoisted)
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("Ahmed")); // "Hello, Ahmed!"

// 2. Function Expression
const double = function(n) {
  return n * 2;
};

// 3. Arrow Function (modern, preferred for callbacks)
const add = (a, b) => a + b;
const square = n => n * n;    // Single param: no parens needed
const sayHi = () => "Hello!"; // No params: empty parens

console.log(add(3, 4));    // 7
console.log(square(5));    // 25

// 4. Default Parameters
function createUser(name, role = "student", active = true) {
  return { name, role, active };
}
console.log(createUser("Sara"));
// { name: "Sara", role: "student", active: true }

// 5. Rest Parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// 6. Real-world: Grade calculator
function calculateGrade(scores) {
  if (scores.length === 0) return null;
  const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  
  if (avg >= 90) return { average: avg.toFixed(1), grade: "A" };
  if (avg >= 80) return { average: avg.toFixed(1), grade: "B" };
  if (avg >= 70) return { average: avg.toFixed(1), grade: "C" };
  return { average: avg.toFixed(1), grade: "F" };
}

const result = calculateGrade([85, 90, 78, 92, 88]);
console.log(result); // { average: "86.6", grade: "B" }

// Closure example
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = start; },
    value: () => count
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
console.log(counter.value()); // 11`,
          explanation: "Arrow functions are the modern choice for callbacks and short functions. They don't have their own 'this' — which is actually an advantage for event handlers and methods.",
        },
        tips: [
          "Use arrow functions for callbacks: array.map(x => x * 2)",
          "Always include a return statement if the function should produce a value.",
          "Pure functions (same input always gives same output) are easier to test and reason about.",
        ],
      },
      {
        id: "5.6",
        title: "Arrays",
        content: `Arrays store ordered lists of values. JavaScript arrays can hold mixed types and have many powerful built-in methods.

**Creating Arrays:**
- \`const arr = [1, 2, 3]\` — Array literal
- \`const arr = new Array(5)\` — Empty array of length 5

**Basic Methods:**
- \`push()\` — Add to end
- \`pop()\` — Remove from end
- \`unshift()\` — Add to beginning
- \`shift()\` — Remove from beginning
- \`splice(start, deleteCount, ...items)\` — Remove/insert at index
- \`slice(start, end)\` — Extract portion (doesn't mutate)
- \`indexOf()\` — Find index of value
- \`includes()\` — Check if value exists
- \`join(separator)\` — Array to string
- \`reverse()\` — Reverse order (mutates)
- \`sort()\` — Sort (mutates)
- \`length\` — Number of elements

**Functional Methods (non-mutating, return new array):**
- \`map(callback)\` — Transform each element
- \`filter(callback)\` — Keep elements that pass test
- \`reduce(callback, initial)\` — Reduce to single value
- \`find(callback)\` — First element that passes test
- \`findIndex(callback)\` — Index of first match
- \`every(callback)\` — True if ALL pass
- \`some(callback)\` — True if ANY pass
- \`flat()\` — Flatten nested arrays
- \`flatMap()\` — Map then flatten`,
        codeExample: {
          language: "javascript",
          code: `// Create and access
const fruits = ["apple", "banana", "mango", "orange"];
console.log(fruits[0]);      // "apple" (index 0)
console.log(fruits.length);  // 4
console.log(fruits[fruits.length - 1]); // "orange" (last item)

// Mutating methods
fruits.push("grape");        // ["apple", "banana", "mango", "orange", "grape"]
fruits.pop();                // removes "grape"
fruits.unshift("cherry");    // adds to beginning
fruits.shift();              // removes "cherry"

// Spread operator — create new array
const moreFruits = [...fruits, "pear", "kiwi"];

// Destructuring
const [first, second, ...rest] = fruits;
console.log(first);  // "apple"
console.log(rest);   // ["mango", "orange"]

// === Functional Array Methods ===
const scores = [85, 92, 78, 95, 88, 72, 99];

// map — transform each element
const doubled = scores.map(s => s * 2);
const letterGrades = scores.map(s => s >= 90 ? "A" : s >= 80 ? "B" : "C");

// filter — keep elements that pass test
const highScores = scores.filter(s => s >= 90);
console.log(highScores); // [92, 95, 99]

// reduce — calculate sum, avg, etc.
const total = scores.reduce((sum, s) => sum + s, 0);
const average = total / scores.length;
console.log(\`Average: \${average.toFixed(1)}\`); // "Average: 87.0"

// find — first match
const firstA = scores.find(s => s >= 90);
console.log(firstA); // 92

// every / some
const allPassed = scores.every(s => s >= 70);  // true
const anyPerfect = scores.some(s => s === 100); // false

// Method chaining
const topStudentScores = scores
  .filter(s => s >= 90)    // [92, 95, 99]
  .map(s => \`\${s}%\`)       // ["92%", "95%", "99%"]
  .join(", ");              // "92%, 95%, 99%"

console.log(topStudentScores); // "92%, 95%, 99%"

// sort (numbers require comparator!)
const sorted = [...scores].sort((a, b) => a - b); // ascending
const sortedDesc = [...scores].sort((a, b) => b - a); // descending`,
          explanation: "The functional methods (map, filter, reduce) are the backbone of modern JavaScript. They don't mutate the original array and chain together beautifully.",
        },
      },
      {
        id: "5.7",
        title: "Objects",
        content: `Objects store data as key-value pairs. They're JavaScript's fundamental data structure.

**Creating Objects:**
- **Object literal**: \`const obj = { key: value }\` (most common)
- **Constructor**: \`new Object()\`
- **Class**: \`class Person { ... }\`

**Accessing Properties:**
- **Dot notation**: \`obj.name\` (when key is a known identifier)
- **Bracket notation**: \`obj["name"]\` (when key is dynamic)

**Common Methods:**
- \`Object.keys(obj)\` — Array of property names
- \`Object.values(obj)\` — Array of values
- \`Object.entries(obj)\` — Array of [key, value] pairs
- \`Object.assign(target, source)\` — Copy properties
- Spread: \`const copy = { ...obj }\``,
        codeExample: {
          language: "javascript",
          code: `// Object literal
const student = {
  name: "Ahmed Hassan",
  age: 21,
  email: "ahmed@example.com",
  grades: [85, 92, 78, 95],
  address: {
    city: "Cairo",
    country: "Egypt"
  },
  // Method
  greet() {
    return \`Hi, I'm \${this.name}\`;
  },
  // Computed average
  get average() {
    return this.grades.reduce((s, g) => s + g, 0) / this.grades.length;
  }
};

// Accessing properties
console.log(student.name);           // "Ahmed Hassan"
console.log(student["email"]);       // "ahmed@example.com" (bracket notation)
console.log(student.address.city);   // "Cairo" (nested)
console.log(student.greet());        // "Hi, I'm Ahmed Hassan"
console.log(student.average);        // 87.5

// Destructuring objects
const { name, age, grades } = student;
console.log(name, age); // "Ahmed Hassan" 21

// Destructuring with rename
const { name: studentName, email: studentEmail } = student;

// Adding/modifying properties
student.gpa = 3.75;
student.age = 22;
delete student.email;

// Object.keys/values/entries
console.log(Object.keys(student));    // ["name", "age", "grades", ...]
console.log(Object.values(student));  // [values...]
Object.entries(student).forEach(([key, val]) => {
  console.log(\`\${key}: \${val}\`);
});

// Spread — copy and merge
const updatedStudent = { ...student, age: 22, year: "Senior" };

// Array of objects (most common data structure)
const students = [
  { id: 1, name: "Ahmed", gpa: 3.8 },
  { id: 2, name: "Sara", gpa: 3.9 },
  { id: 3, name: "Omar", gpa: 3.5 }
];

// Find student with highest GPA
const topStudent = students.reduce((best, s) => 
  s.gpa > best.gpa ? s : best
);
console.log(topStudent.name); // "Sara"

// Sort by GPA
const byGPA = [...students].sort((a, b) => b.gpa - a.gpa);`,
          explanation: "Destructuring and spread operators make working with objects much cleaner. Arrays of objects are the most common data structure in web development.",
        },
      },
      {
        id: "5.8",
        title: "DOM Manipulation",
        content: `The **DOM (Document Object Model)** is a tree representation of the HTML page. JavaScript can read and modify it.

**Selecting Elements:**
- \`document.getElementById("id")\` — One element by ID
- \`document.querySelector(".class")\` — First match of CSS selector
- \`document.querySelectorAll("tag")\` — All matches (NodeList)
- \`document.getElementsByClassName("class")\` — HTMLCollection

**Modifying Content:**
- \`element.textContent\` — Get/set text (safe, no HTML)
- \`element.innerHTML\` — Get/set HTML (be careful with XSS!)
- \`element.innerText\` — Visible text only

**Modifying Styles & Classes:**
- \`element.style.color = "red"\` — Inline style
- \`element.classList.add("active")\`
- \`element.classList.remove("active")\`
- \`element.classList.toggle("active")\`
- \`element.classList.contains("active")\`

**Working with Attributes:**
- \`element.getAttribute("href")\`
- \`element.setAttribute("class", "new-class")\`
- \`element.removeAttribute("disabled")\`

**Creating & Adding Elements:**
- \`document.createElement("div")\`
- \`element.appendChild(child)\`
- \`element.insertAdjacentHTML("beforeend", html)\`
- \`element.remove()\``,
        codeExample: {
          language: "javascript",
          code: `// === Selecting Elements ===
const title = document.getElementById("main-title");
const btn = document.querySelector(".submit-btn");
const cards = document.querySelectorAll(".card");

// === Reading Content ===
console.log(title.textContent); // Text without HTML tags
console.log(title.innerHTML);   // HTML content inside element

// === Modifying Content ===
title.textContent = "New Title!";
title.innerHTML = "Title with <strong>Bold</strong>"; // Can inject HTML

// === Modifying Styles ===
title.style.color = "#1a56db";
title.style.fontSize = "2rem";
title.style.fontWeight = "bold";

// Better: use classes
title.classList.add("highlighted");
title.classList.remove("old-class");
title.classList.toggle("dark-mode");
console.log(title.classList.contains("highlighted")); // true

// === Modify Attributes ===
const link = document.querySelector("a");
link.setAttribute("href", "https://newurl.com");
link.setAttribute("target", "_blank");
console.log(link.getAttribute("href")); // "https://newurl.com"

// === Creating Elements ===
function createCard(title, description) {
  const card = document.createElement("div");
  card.classList.add("card");
  
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;
  
  const cardText = document.createElement("p");
  cardText.textContent = description;
  
  card.appendChild(cardTitle);
  card.appendChild(cardText);
  
  return card;
}

// Add to page
const container = document.querySelector("#card-container");
const newCard = createCard("JavaScript", "The language of the web");
container.appendChild(newCard);

// Faster: insertAdjacentHTML
container.insertAdjacentHTML("beforeend", \`
  <div class="card">
    <h3>HTML</h3>
    <p>Structure of the web</p>
  </div>
\`);

// Remove element
document.querySelector(".old-banner")?.remove();

// Iterate all matches
cards.forEach((card, index) => {
  card.dataset.index = index; // Set data attribute
  card.style.animationDelay = \`\${index * 0.1}s\`;
});`,
          explanation: "querySelector/querySelectorAll with CSS selectors is the modern approach. Use textContent instead of innerHTML when inserting user-provided data to prevent XSS attacks.",
        },
        tips: [
          "Use querySelector with CSS selectors — same syntax you already know from CSS.",
          "Prefer textContent over innerHTML for user-generated content to prevent XSS.",
          "classList.toggle() is perfect for showing/hiding elements or switching themes.",
        ],
      },
      {
        id: "5.9",
        title: "Events",
        content: `Events are actions that happen in the browser — clicks, key presses, form submissions, page loads, etc.

**Adding Event Listeners:**
- **Best**: \`element.addEventListener("event", handler)\`
- **Old way**: \`element.onclick = handler\` (only one handler)
- **Avoid**: \`<button onclick="...">\` (inline, hard to maintain)

**Common Events:**
- **Mouse**: click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove
- **Keyboard**: keydown, keyup, keypress
- **Form**: submit, change, input, focus, blur, reset
- **Document/Window**: DOMContentLoaded, load, scroll, resize

**Event Object:**
The handler receives an event object with useful properties:
- \`e.target\` — The element that was clicked
- \`e.currentTarget\` — The element the listener is on
- \`e.preventDefault()\` — Stop default behavior (form submit, link click)
- \`e.stopPropagation()\` — Stop event bubbling up

**Event Delegation:**
Instead of adding listeners to many elements, add ONE listener to a parent and check \`e.target\`.`,
        codeExample: {
          language: "javascript",
          code: `// === Basic Event Listener ===
const btn = document.querySelector("#myButton");

btn.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log("Target:", event.target);
  console.log("Target text:", event.target.textContent);
});

// Arrow function (preferred for simple handlers)
btn.addEventListener("click", (e) => {
  e.target.textContent = "Clicked!";
  e.target.classList.toggle("active");
});

// === Mouse Events ===
const card = document.querySelector(".card");
card.addEventListener("mouseenter", () => {
  card.style.transform = "translateY(-8px)";
});
card.addEventListener("mouseleave", () => {
  card.style.transform = "translateY(0)";
});

// === Keyboard Events ===
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  filterItems(query);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.ctrlKey && e.key === "k") searchInput.focus();
});

// === Form Events ===
const form = document.querySelector("#contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // STOP the form from refreshing the page
  
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  
  // Validate
  if (!name || !email) {
    showError("Please fill all required fields");
    return;
  }
  
  console.log({ name, email });
  showSuccess("Form submitted successfully!");
  form.reset();
});

// === Event Delegation ===
// Instead of adding listener to each button...
const todoList = document.querySelector("#todo-list");

todoList.addEventListener("click", (e) => {
  // Check if clicked element is a delete button
  if (e.target.matches(".delete-btn")) {
    const listItem = e.target.closest("li");
    listItem.remove();
  }
  
  if (e.target.matches(".complete-btn")) {
    const listItem = e.target.closest("li");
    listItem.classList.toggle("completed");
  }
});

// === DOMContentLoaded — Safe initialization ===
document.addEventListener("DOMContentLoaded", () => {
  // DOM is ready — safe to select elements
  initializeApp();
});

function initializeApp() {
  console.log("App initialized!");
}`,
          explanation: "Event delegation (one listener on parent, check e.target) is more efficient than adding listeners to each child. Always use e.preventDefault() to stop form submission from refreshing the page.",
        },
        tips: [
          "Use e.preventDefault() on form submit to handle data with JavaScript instead of page reload.",
          "Event delegation: add one listener on the parent, use e.target to identify which child was clicked.",
          "DOMContentLoaded fires when HTML is parsed — use it to safely initialize JavaScript.",
        ],
      },
      {
        id: "5.10",
        title: "Practical: Grade Calculator",
        content: `Let's build an interactive **Student Grade Calculator** that combines everything we've learned:
- DOM manipulation
- Event handling
- Arrays and functions
- Dynamic HTML generation
- Form processing

This is a real-world mini-application that demonstrates JavaScript's power.`,
        codeExample: {
          language: "javascript",
          code: `// Complete Grade Calculator Application
document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector("#gradeForm");
  const subjectInput = document.querySelector("#subject");
  const scoreInput = document.querySelector("#score");
  const gradeList = document.querySelector("#gradeList");
  const summaryDiv = document.querySelector("#summary");
  
  let grades = []; // Array to store { subject, score } objects
  
  // Add grade on form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const subject = subjectInput.value.trim();
    const score = Number(scoreInput.value);
    
    // Validate
    if (!subject) { alert("Enter a subject name!"); return; }
    if (isNaN(score) || score < 0 || score > 100) {
      alert("Score must be 0-100"); return;
    }
    
    // Add to array
    grades.push({ subject, score, letter: getLetterGrade(score) });
    
    // Update UI
    renderGrades();
    updateSummary();
    
    // Clear form
    form.reset();
    subjectInput.focus();
  });
  
  // Delete grade (event delegation)
  gradeList.addEventListener("click", (e) => {
    if (e.target.matches("[data-delete]")) {
      const index = Number(e.target.dataset.delete);
      grades.splice(index, 1);
      renderGrades();
      updateSummary();
    }
  });
  
  function getLetterGrade(score) {
    if (score >= 90) return { letter: "A", color: "#16a34a" };
    if (score >= 80) return { letter: "B", color: "#2563eb" };
    if (score >= 70) return { letter: "C", color: "#d97706" };
    if (score >= 60) return { letter: "D", color: "#dc2626" };
    return { letter: "F", color: "#7c3aed" };
  }
  
  function renderGrades() {
    if (grades.length === 0) {
      gradeList.innerHTML = '<p class="empty">No grades yet. Add your first subject!</p>';
      return;
    }
    
    gradeList.innerHTML = grades.map((g, i) => \`
      <div class="grade-item">
        <span class="subject">\${g.subject}</span>
        <span class="score">\${g.score}/100</span>
        <span class="letter" style="color:\${g.letter.color}">\${g.letter.letter}</span>
        <button data-delete="\${i}" class="delete-btn">Remove</button>
      </div>
    \`).join("");
  }
  
  function updateSummary() {
    if (grades.length === 0) {
      summaryDiv.innerHTML = '';
      return;
    }
    
    const scores = grades.map(g => g.score);
    const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passed = grades.filter(g => g.score >= 60).length;
    
    summaryDiv.innerHTML = \`
      <div class="summary-grid">
        <div class="stat">
          <span class="label">Subjects</span>
          <span class="value">\${grades.length}</span>
        </div>
        <div class="stat">
          <span class="label">Average</span>
          <span class="value">\${average.toFixed(1)}%</span>
        </div>
        <div class="stat">
          <span class="label">Highest</span>
          <span class="value">\${highest}%</span>
        </div>
        <div class="stat">
          <span class="label">Lowest</span>
          <span class="value">\${lowest}%</span>
        </div>
        <div class="stat">
          <span class="label">Passed</span>
          <span class="value">\${passed}/\${grades.length}</span>
        </div>
        <div class="stat">
          <span class="label">Overall</span>
          <span class="value">\${getLetterGrade(average).letter}</span>
        </div>
      </div>
    \`;
  }
  
  // Initialize
  renderGrades();
});`,
          explanation: "This grade calculator uses an array to store data, functions for calculations, DOM manipulation to render HTML, and event delegation for the delete buttons. This pattern — data array, render function, event handlers — is the foundation of all modern web apps.",
        },
      },
    ],
    quiz: [
      {
        id: "q5-1",
        question: "Which keyword should you use by default when declaring variables in modern JavaScript?",
        options: ["var", "let", "const", "def"],
        correctIndex: 2,
        explanation: "Use const by default. Only use let when you need to reassign the variable. Avoid var — it has function scope and hoisting quirks.",
      },
      {
        id: "q5-2",
        question: "What does === (triple equals) check?",
        options: ["Value only (with type coercion)", "Type only", "Value AND type (strict equality)", "Object reference"],
        correctIndex: 2,
        explanation: "=== is strict equality — it checks both value AND type. 5 === '5' is false. Always prefer === over ==.",
      },
      {
        id: "q5-3",
        question: "Which array method creates a NEW array with transformed elements?",
        options: ["forEach()", "map()", "filter()", "reduce()"],
        correctIndex: 1,
        explanation: "map() creates a new array by applying a function to each element. forEach() just iterates without returning a new array.",
      },
      {
        id: "q5-4",
        question: "What does document.querySelector('.card') return?",
        options: ["All elements with class 'card'", "The first element with class 'card'", "An error if none found", "The last element with class 'card'"],
        correctIndex: 1,
        explanation: "querySelector returns the FIRST matching element. Use querySelectorAll to get all matches.",
      },
      {
        id: "q5-5",
        question: "What is the purpose of e.preventDefault() in a form submit handler?",
        options: ["Prevents CSS from loading", "Stops the browser from refreshing/navigating on form submission", "Prevents JavaScript errors", "Disables the submit button"],
        correctIndex: 1,
        explanation: "e.preventDefault() stops the default browser behavior — for forms, that means preventing the page reload/navigation so you can handle submission with JavaScript.",
      },
      {
        id: "q5-6",
        question: "What does this code return: [1,2,3].filter(n => n > 1)?",
        options: ["[1, 2, 3]", "[2, 3]", "[true, true, false]", "[1]"],
        correctIndex: 1,
        explanation: "filter() keeps elements where the callback returns true. Numbers > 1 are 2 and 3, so [2, 3] is returned.",
      },
      {
        id: "q5-7",
        question: "What is the DOM?",
        options: ["A type of database", "A Document Object Model — the browser's tree representation of HTML", "A CSS styling system", "A JavaScript framework"],
        correctIndex: 1,
        explanation: "The DOM (Document Object Model) is a programming interface — a tree of objects representing the HTML structure that JavaScript can read and modify.",
      },
      {
        id: "q5-8",
        question: "Which is the correct syntax for an arrow function that squares a number?",
        options: ["function square(n) { return n*n; }", "const square = n => n*n", "def square(n): n*n", "square = function(n) n*n"],
        correctIndex: 1,
        explanation: "Arrow function with single parameter and expression body: const square = n => n*n (implicit return, no braces needed for single expression).",
      },
      {
        id: "q5-9",
        question: "What does classList.toggle('active') do?",
        options: ["Always adds 'active' class", "Always removes 'active' class", "Adds 'active' if missing, removes if present", "Checks if 'active' class exists"],
        correctIndex: 2,
        explanation: "classList.toggle() adds the class if not present, removes it if present — like a switch. Perfect for dark mode toggles and accordion open/close states.",
      },
      {
        id: "q5-10",
        question: "What is event delegation?",
        options: ["Assigning events to multiple elements", "Adding one event listener to a parent to handle events from multiple children", "Delaying event execution", "Preventing events from firing"],
        correctIndex: 1,
        explanation: "Event delegation adds ONE listener to a parent element and uses e.target to check which child triggered the event. More efficient than adding listeners to each child, especially for dynamic content.",
      },
    ],
    exam: {
      trueFalse: [
        { id: "tf5-1", statement: "const variables can be reassigned after declaration.", answer: false, explanation: "const variables cannot be reassigned. However, if the const holds an object/array, the properties/items can be mutated." },
        { id: "tf5-2", statement: "0 === false evaluates to true in JavaScript.", answer: false, explanation: "=== (strict equality) checks both value and type. 0 is a number; false is a boolean. 0 == false is true (loose equality with coercion), but 0 === false is false." },
        { id: "tf5-3", statement: "Array.map() modifies the original array.", answer: false, explanation: "map() returns a NEW array — it doesn't modify the original. This is why it's called 'non-mutating'." },
        { id: "tf5-4", statement: "Arrow functions create their own 'this' context.", answer: false, explanation: "Arrow functions do NOT create their own 'this' — they inherit 'this' from their enclosing scope. This is a key difference from regular functions." },
        { id: "tf5-5", statement: "document.querySelectorAll() returns a live HTMLCollection.", answer: false, explanation: "querySelectorAll() returns a static NodeList — it doesn't update if DOM changes. getElementsByClassName() returns a live HTMLCollection." },
        { id: "tf5-6", statement: "typeof null returns 'null' in JavaScript.", answer: false, explanation: "typeof null returns 'object' — this is a well-known JavaScript bug that was never fixed for backward compatibility." },
        { id: "tf5-7", statement: "The spread operator (...) can be used to copy arrays.", answer: true, explanation: "const copy = [...original] creates a shallow copy of an array using the spread operator." },
        { id: "tf5-8", statement: "event.preventDefault() on a link click prevents navigation.", answer: true, explanation: "Yes — e.preventDefault() on an anchor click prevents the browser from navigating to the href URL." },
        { id: "tf5-9", statement: "JavaScript is synchronous by default — code runs one line at a time.", answer: true, explanation: "JavaScript is single-threaded and synchronous by default. Asynchronous operations (setTimeout, fetch) use callbacks/promises to schedule work without blocking." },
        { id: "tf5-10", statement: "NaN === NaN evaluates to true in JavaScript.", answer: false, explanation: "NaN is the ONLY value in JavaScript that is not equal to itself! Use Number.isNaN(value) to check for NaN." },
      ],
      mcq: [
        {
          id: "exam5-mcq1",
          question: "What does this code return? ['a', 'b', 'c'].reduce((acc, char) => acc + char, '')",
          options: ["['a', 'b', 'c']", "'abc'", "3", "undefined"],
          correctIndex: 1,
          explanation: "reduce starts with '' and concatenates each char: '' + 'a' = 'a', 'a' + 'b' = 'ab', 'ab' + 'c' = 'abc'.",
        },
        {
          id: "exam5-mcq2",
          question: "What is the output of: console.log(typeof [])?",
          options: ["'array'", "'list'", "'object'", "'undefined'"],
          correctIndex: 2,
          explanation: "Arrays are objects in JavaScript, so typeof [] returns 'object'. Use Array.isArray([]) to properly check for arrays.",
        },
        {
          id: "exam5-mcq3",
          question: "Which method finds the first array element that satisfies a condition?",
          options: ["filter()", "find()", "indexOf()", "some()"],
          correctIndex: 1,
          explanation: "find() returns the first element where the callback returns true. filter() returns all matches. some() returns a boolean.",
        },
        {
          id: "exam5-mcq4",
          question: "What does element.classList.toggle('active') return?",
          options: ["Nothing (undefined)", "The class list", "true if class was added, false if removed", "The element"],
          correctIndex: 2,
          explanation: "classList.toggle() returns true if the class was added, false if it was removed. This can be used to track state.",
        },
        {
          id: "exam5-mcq5",
          question: "How do you correctly destructure name and age from const user = { name: 'Ahmed', age: 21 }?",
          options: ["const [name, age] = user", "const {name, age} = user", "const name = user[0]; const age = user[1]", "user.destructure(name, age)"],
          correctIndex: 1,
          explanation: "Object destructuring uses curly braces: const {name, age} = user. Array destructuring uses square brackets.",
        },
        {
          id: "exam5-mcq6",
          question: "What is a closure in JavaScript?",
          options: ["A way to close the browser", "A function that has access to its outer function's variables even after the outer function has returned", "A method to close event listeners", "A type of loop"],
          correctIndex: 1,
          explanation: "A closure is when an inner function 'closes over' variables from its outer scope, retaining access to them even after the outer function finishes executing.",
        },
        {
          id: "exam5-mcq7",
          question: "Which is the safest way to insert user-provided text into the DOM?",
          options: ["element.innerHTML = userText", "element.insertAdjacentHTML('', userText)", "element.textContent = userText", "eval(userText)"],
          correctIndex: 2,
          explanation: "textContent is safe — it treats the value as plain text, not HTML. innerHTML can execute scripts in user-provided input (XSS vulnerability).",
        },
        {
          id: "exam5-mcq8",
          question: "What does the spread operator (...) do when used in a function call?",
          options: ["Creates a copy of an object", "Spreads array elements as individual arguments", "Joins arrays together", "Merges objects"],
          correctIndex: 1,
          explanation: "Math.max(...[1, 5, 3]) is equivalent to Math.max(1, 5, 3). The spread operator 'spreads' array elements as separate arguments.",
        },
        {
          id: "exam5-mcq9",
          question: "What event should you listen for to safely initialize JavaScript after the HTML is parsed?",
          options: ["window.onload", "document.ready", "DOMContentLoaded", "document.onparse"],
          correctIndex: 2,
          explanation: "DOMContentLoaded fires when HTML is parsed (without waiting for images/CSS). window.load fires later after all resources load. DOMContentLoaded is preferred for initialization.",
        },
        {
          id: "exam5-mcq10",
          question: "What is the output of: [1, 2, 3].map(n => n * 2).filter(n => n > 2)?",
          options: ["[2, 4, 6]", "[4, 6]", "[3, 4]", "[1, 4, 6]"],
          correctIndex: 1,
          explanation: "map(n => n*2) produces [2, 4, 6]. Then filter(n => n > 2) keeps [4, 6].",
        },
      ],
      codingQuestion: {
        prompt: "Write a JavaScript function called 'analyzeStudents' that takes an array of student objects (each with name and score properties) and returns an object with: the total count, the average score (rounded to 1 decimal), the highest scorer's name, the number who passed (score >= 60), and an array of names of students who scored 90 or above (honor roll).",
        starterCode: `function analyzeStudents(students) {
  // students = [{ name: "Ahmed", score: 85 }, ...]
  // Return an object with: count, average, topScorer, passed, honorRoll
  
}

// Test your function:
const students = [
  { name: "Ahmed", score: 85 },
  { name: "Sara", score: 95 },
  { name: "Omar", score: 72 },
  { name: "Layla", score: 58 },
  { name: "Khaled", score: 91 }
];
console.log(analyzeStudents(students));`,
        expectedKeywords: ["function", "reduce", "filter", "map", "Math.max", "average", "return", "length"],
        hint: "Use reduce() to calculate total, divide by length for average. Use filter() for passed and honorRoll. Use reduce() or sort() to find topScorer.",
        sampleAnswer: `function analyzeStudents(students) {
  if (students.length === 0) return null;
  
  const count = students.length;
  
  const totalScore = students.reduce((sum, s) => sum + s.score, 0);
  const average = parseFloat((totalScore / count).toFixed(1));
  
  const topStudent = students.reduce((best, s) => s.score > best.score ? s : best);
  const topScorer = topStudent.name;
  
  const passed = students.filter(s => s.score >= 60).length;
  
  const honorRoll = students
    .filter(s => s.score >= 90)
    .map(s => s.name);
  
  return { count, average, topScorer, passed, honorRoll };
}`,
      },
    },
    challenges: [
      {
        id: "ch5-1",
        title: "FizzBuzz Counter",
        difficulty: "easy",
        description: "Write a function that returns an array of numbers from 1 to n, but replaces multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
        starterCode: `function fizzBuzz(n) {
  // Return array of length n with FizzBuzz replacements
  
}

console.log(fizzBuzz(15));
// [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]`,
        expectedKeywords: ["function", "for", "%", "FizzBuzz", "Fizz", "Buzz", "return", "push"],
        hint: "Loop from 1 to n. Check if divisible by both 3 and 5 FIRST (using &&), then check 3 alone, then 5 alone. Use % (modulo) to check divisibility.",
      },
      {
        id: "ch5-2",
        title: "Dynamic To-Do List",
        difficulty: "medium",
        description: "Build a complete to-do list application with JavaScript. It should: add items on form submit, mark items as complete on click, delete items with a button, and show a count of remaining tasks.",
        starterCode: `// HTML structure:
// <form id="todoForm">
//   <input id="taskInput" placeholder="New task...">
//   <button type="submit">Add</button>
// </form>
// <p id="taskCount">0 tasks remaining</p>
// <ul id="todoList"></ul>

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#todoForm");
  const input = document.querySelector("#taskInput");
  const list = document.querySelector("#todoList");
  const count = document.querySelector("#taskCount");
  
  let tasks = [];
  
  // Add your implementation here
  
});`,
        expectedKeywords: ["addEventListener", "submit", "preventDefault", "push", "innerHTML", "classList", "toggle", "filter", "splice"],
        hint: "Store tasks in an array. On submit, push new task object {id, text, done}. Render list with map(). Use event delegation on ul for complete/delete. Update count with filter(t => !t.done).length.",
      },
      {
        id: "ch5-3",
        title: "Quiz Application",
        difficulty: "hard",
        description: "Build a complete multiple-choice quiz application. It should: display one question at a time, show 4 options as clickable buttons, immediately show correct/wrong feedback with color, advance to next question, and show the final score at the end with a retry option.",
        starterCode: `const questions = [
  { q: "What does HTML stand for?", options: ["Hypertext Markup Language", "High-Level Text Markup", "Hypertext Machine Language", "Home Tool Markup Language"], correct: 0 },
  { q: "Which CSS property controls text color?", options: ["font-color", "text-color", "color", "foreground"], correct: 2 },
  { q: "Which JavaScript method adds to array end?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 }
];

// Build the quiz application here
// You need: current question index, score tracking,
// rendering function, answer checking, and next question logic`,
        expectedKeywords: ["let", "const", "querySelector", "innerHTML", "addEventListener", "classList", "correct", "score"],
        hint: "Track currentIndex and score as variables. Create renderQuestion() that shows question text and 4 buttons. On button click, check answer, add .correct/.wrong classes, disable all buttons, then show Next button. After last question, show score.",
      },
    ],
    miniProject: {
      title: "Interactive Student Grade Calculator",
      description: "Build a fully functional grade calculator web application using HTML, CSS, and JavaScript. Students can add subjects with scores, see letter grades, and get a complete summary with average, highest/lowest scores, and pass/fail status.",
      steps: [
        "Create HTML structure: form with subject input and score input, a table/list for grades, and a summary section",
        "Add CSS styling for the form, grade items (with color coding for grades), and summary stats",
        "Create a grades array to store { subject, score, letter } objects",
        "Write getLetterGrade(score) function returning A/B/C/D/F with color",
        "Add form submit event listener that validates input, creates grade object, adds to array",
        "Write renderGrades() function that generates HTML from the grades array",
        "Write updateSummary() function computing average, highest, lowest, pass count",
        "Add delete functionality using event delegation on the grades container",
        "Add keyboard shortcut: Enter to submit, Escape to clear input",
      ],
      starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grade Calculator</title>
  <style>
    /* Add your CSS here */
    body { font-family: sans-serif; max-width: 600px; margin: 2rem auto; padding: 1rem; }
  </style>
</head>
<body>
  <h1>Student Grade Calculator</h1>
  
  <form id="gradeForm">
    <input type="text" id="subject" placeholder="Subject name" required>
    <input type="number" id="score" placeholder="Score (0-100)" min="0" max="100" required>
    <button type="submit">Add Grade</button>
  </form>
  
  <div id="gradeList"></div>
  <div id="summary"></div>
  
  <script>
    // Write your JavaScript here
    
  </script>
</body>
</html>`,
      expectedKeywords: ["addEventListener", "submit", "preventDefault", "push", "innerHTML", "reduce", "filter", "Math.max", "Math.min"],
    },
  },
];
