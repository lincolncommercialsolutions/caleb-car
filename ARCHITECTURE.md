# CalebCar Application Architecture & Flow

## System Architecture Flowchart

```mermaid
graph TB
    subgraph "Client Browser"
        A[User Visits Site] --> B{Which Page?}
        B -->|Home| C[Home Page]
        B -->|Services| D[Services Page]
        B -->|About| E[About Page]
        B -->|Contact| F[Contact Form]
        B -->|Gallery| G[Gallery Page]
        B -->|Blog| H[Blog Page]
        B -->|Admin| I[Admin Login]
        
        C --> J[Hero Slideshow<br/>3 Images, 5s Rotation]
        C --> K[Featured Services]
        C --> L[Testimonials Carousel]
        
        F --> M[User Fills Form<br/>Name, Email, Phone, Message]
        M --> N[Form Validation]
        N -->|Valid| O[Submit to API]
        N -->|Invalid| M
    end
    
    subgraph "Next.js API Routes"
        O --> P[/api/submit-contact]
        P --> Q[Validate Required Fields]
        Q -->|Missing Fields| R[Return 400 Error]
        Q -->|Valid| S[Create Formatted Content]
        S --> T[Generate Unique Filename<br/>timestamp + sanitized name]
        T --> U[Upload to S3]
        
        I --> V{Valid Credentials?}
        V -->|No| W[Show Error]
        V -->|Yes| X[/api/admin-contacts]
        X --> Y[List All Submissions]
        Y --> Z[Display in Admin Panel]
        
        AA[User Categorizes] --> AB[/api/admin-contacts/categorize]
        AB --> AC[Update S3 Object Tags]
        
        AD[User Deletes] --> AE[/api/admin-contacts/delete]
        AE --> AF[Delete from S3]
        
        AG[AI Chat Button Click] --> AH[Open Chat Widget]
        AH --> AI[User Types Message]
        AI --> AJ[/api/claude]
        AJ --> AK[Call Anthropic API<br/>Claude 3.5 Sonnet]
        AK --> AL[Return AI Response]
        AL --> AM[Display in Chat]
    end
    
    subgraph "AWS S3 Storage"
        U --> AN[(S3 Bucket<br/>premium-auto-contacts-1769632596)]
        AN --> AO[contacts/ folder<br/>contact-{timestamp}-{name}.txt]
        
        AC --> AN
        AF --> AN
        Y --> AN
    end
    
    subgraph "Anthropic Claude AI"
        AK --> AP[Claude 3.5 Sonnet Model]
        AP --> AQ[Process with System Prompt<br/>CalebCar Context]
        AQ --> AL
    end
    
    subgraph "Theme System"
        AR[User Clicks Theme Toggle] --> AS{Current Theme?}
        AS -->|Light| AT[Switch to Dark]
        AS -->|Dark| AU[Switch to Light]
        AT --> AV[Update CSS Variables]
        AU --> AV
        AV --> AW[Save to localStorage]
        AW --> AX[Re-render UI]
    end
    
    style A fill:#D4AF37,stroke:#333,stroke-width:2px,color:#000
    style AN fill:#FF9900,stroke:#333,stroke-width:2px
    style AP fill:#7B68EE,stroke:#333,stroke-width:2px
    style I fill:#FF6B6B,stroke:#333,stroke-width:2px
```

## Component Hierarchy

```mermaid
graph TD
    A[RootLayout.js] --> B[Navbar]
    A --> C[Page Content]
    A --> D[Footer]
    A --> E[AIAssistant]
    
    B --> F[ThemeToggle]
    B --> G[Navigation Links]
    
    C --> H{Route}
    H -->|/| I[Home Page]
    H -->|/services| J[Services Page]
    H -->|/contact| K[Contact Page]
    H -->|/admin| L[Admin Dashboard]
    
    I --> M[Hero Component<br/>Slideshow]
    I --> N[ServiceCard Components x3]
    I --> O[Testimonials Component]
    
    J --> P[ServiceCard Components x6]
    
    L --> Q[Login Form]
    L --> R[Contact List]
    L --> S[Category Filter]
    L --> T[Delete Actions]
    
    E --> U[Chat Toggle Button]
    E --> V[Chat Window]
    V --> W[Message History]
    V --> X[Input Field]
    
    style A fill:#2E86AB,stroke:#333,stroke-width:3px,color:#fff
    style E fill:#D4AF37,stroke:#333,stroke-width:2px
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant F as Contact Form
    participant API as Next.js API
    participant S3 as AWS S3
    participant A as Admin Panel
    
    Note over U,S3: Contact Submission Flow
    U->>F: Fill out contact form
    F->>F: Client-side validation
    F->>API: POST /api/submit-contact
    API->>API: Validate required fields
    API->>API: Format submission content
    API->>API: Generate unique filename
    API->>S3: Upload contact-{timestamp}-{name}.txt
    S3-->>API: Upload successful
    API-->>F: Return success response
    F-->>U: Show success message
    
    Note over U,S3: Admin Management Flow
    U->>A: Login (admin/securepassword123)
    A->>API: GET /api/admin-contacts?action=list
    API->>S3: List objects in contacts/ folder
    S3-->>API: Return file list with metadata
    API->>S3: Get object tags (categories)
    S3-->>API: Return tags
    API-->>A: Return formatted contact list
    A-->>U: Display submissions
    
    U->>A: Click categorize
    A->>API: POST /api/admin-contacts/categorize
    API->>S3: PutObjectTagging
    S3-->>API: Success
    API-->>A: Category updated
    
    U->>A: Click delete
    A->>A: Confirm deletion
    A->>API: DELETE /api/admin-contacts/delete
    API->>S3: DeleteObject
    S3-->>API: Deleted
    API-->>A: Success
    A-->>U: Remove from list
```

## AI Assistant Flow

```mermaid
sequenceDiagram
    participant U as User
    participant W as Chat Widget
    participant API as /api/claude
    participant C as Claude API
    
    U->>W: Click chat button
    W->>W: Show welcome message
    U->>W: Type question
    W->>W: Add message to chat
    W->>API: POST {message: "user question"}
    API->>API: Load system prompt<br/>(CalebCar context)
    API->>C: Call Anthropic API<br/>model: claude-3-5-sonnet
    C->>C: Process with context
    C-->>API: Return AI response
    API-->>W: {reply: "AI answer"}
    W->>W: Add to chat history
    W-->>U: Display response
```

## Theme System Flow

```mermaid
stateDiagram-v2
    [*] --> CheckLocalStorage
    CheckLocalStorage --> Light: No preference found
    CheckLocalStorage --> Dark: "dark" in localStorage
    CheckLocalStorage --> Light: "light" in localStorage
    
    Light --> Dark: Click toggle
    Dark --> Light: Click toggle
    
    Light --> UpdateDOM: Apply light theme
    Dark --> UpdateDOM: Apply dark theme
    
    UpdateDOM --> SavePreference
    SavePreference --> UpdateCSS
    
    UpdateCSS --> [*]
    
    note right of UpdateCSS
        CSS Variables Updated:
        --background
        --surface
        --text-primary
        --text-secondary
        --accent
        --border
    end note
```

## Technology Stack

```mermaid
graph LR
    A[Frontend] --> B[Next.js 16.1.6]
    A --> C[React 19]
    A --> D[Tailwind CSS]
    
    E[Backend API] --> F[Next.js API Routes]
    E --> G[AWS SDK S3]
    E --> H[Anthropic SDK]
    
    I[Storage] --> J[AWS S3<br/>premium-auto-contacts-1769632596]
    
    K[AI] --> L[Claude 3.5 Sonnet<br/>@anthropic-ai/sdk]
    
    M[Authentication] --> N[Client-side Demo Auth<br/>admin/securepassword123]
    
    O[Styling] --> P[CSS Variables Theme System]
    O --> Q[Custom Tailwind Config]
    
    style B fill:#000000,stroke:#fff,stroke-width:2px,color:#fff
    style J fill:#FF9900,stroke:#333,stroke-width:2px
    style L fill:#7B68EE,stroke:#333,stroke-width:2px
```

## Key Features Summary

### 1. **Contact Form System**
- Client-side validation
- AWS S3 storage with structured naming
- Metadata tracking (email, timestamp)
- Organized in `contacts/` folder

### 2. **Admin Dashboard**
- Simple authentication (demo: admin/securepassword123)
- List all submissions with filtering
- 6 category system via S3 object tagging
- Delete functionality with confirmation
- Color-coded status badges

### 3. **AI Assistant**
- Floating chat widget
- Claude 3.5 Sonnet integration
- Custom system prompt with CalebCar context
- Real-time conversation
- Welcome message on first interaction

### 4. **Theme System**
- Light/Dark mode toggle
- CSS variable-based theming
- localStorage persistence
- Smooth transitions
- Gold accent (#D4AF37)

### 5. **Hero Slideshow**
- Auto-rotating images (5s interval)
- Smooth fade transitions (2s)
- Manual navigation with dots
- 3 car showcase images

## Environment Variables

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIATLYD6PLQFAA3UPLZ
AWS_SECRET_ACCESS_KEY=[secret]
AWS_S3_BUCKET_NAME=premium-auto-contacts-1769632596
ANTHROPIC_API_KEY=[secret]
```

## File Structure

```
/home/linkl0n/caleb-car/
├── app/
│   ├── layout.js              # Root layout with Navbar, Footer, AIAssistant
│   ├── page.js                # Home page with Hero, Services, Testimonials
│   ├── globals.css            # Theme CSS variables and global styles
│   ├── about/page.js          # About page
│   ├── services/page.js       # Services listing
│   ├── contact/page.js        # Contact form
│   ├── gallery/page.js        # Project gallery
│   ├── blog/page.js           # Blog articles (3 full articles)
│   ├── testimonials/page.js   # Client testimonials
│   ├── admin/page.js          # Admin dashboard
│   └── api/
│       ├── submit-contact/route.js      # S3 upload handler
│       ├── admin-contacts/route.js      # List/get submissions
│       ├── admin-contacts/categorize/route.js  # S3 tagging
│       ├── admin-contacts/delete/route.js      # Delete from S3
│       └── claude/route.js              # Claude AI integration
├── components/
│   ├── Navbar.js              # Navigation with theme toggle
│   ├── Footer.js              # Site footer
│   ├── Hero.js                # Hero section with slideshow
│   ├── Testimonials.js        # Testimonials carousel
│   ├── ServiceCard.js         # Service display cards
│   ├── AIAssistant.js         # Claude chatbot widget
│   └── ThemeToggle.js         # Light/dark mode toggle
├── public/
│   └── images/
│       ├── car13.png          # Slideshow image 1
│       ├── car27.png          # Slideshow image 2
│       └── car54.png          # Slideshow image 3
├── .env.local                 # Environment variables
└── package.json               # Dependencies

```

## Development Server

```bash
npm run dev        # Start development server on http://localhost:3000
```

## Production Deployment Considerations

1. **Authentication**: Replace demo auth with proper authentication (NextAuth.js, Auth0, etc.)
2. **Environment Variables**: Move to secure environment variable management
3. **S3 Security**: Implement IAM roles with least privilege
4. **API Rate Limiting**: Add rate limiting for Claude API calls
5. **Input Sanitization**: Enhanced XSS protection
6. **HTTPS**: Enforce HTTPS in production
7. **Error Monitoring**: Add error tracking (Sentry, etc.)
8. **Performance**: Implement caching strategies
