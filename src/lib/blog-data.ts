export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  coverColor: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-scalable-microservices-with-golang",
    title: "Building Scalable Microservices with Golang",
    excerpt:
      "A deep dive into designing and implementing production-ready microservices using Go, covering patterns like circuit breakers, rate limiting, and graceful degradation.",
    date: "2024-12-15",
    readTime: "12 min read",
    category: "Backend",
    featured: true,
    coverColor: "#1a2332",
    content: `
# Building Scalable Microservices with Golang

When building distributed systems at scale, Go has become my go-to language. Its concurrency model, small memory footprint, and fast compilation make it ideal for microservices that need to handle thousands of requests per second.

## Why Go for Microservices?

Go was designed at Google to solve real-world problems in large-scale distributed systems. Here's what makes it stand out:

- **Goroutines**: Lightweight threads that cost ~2KB of stack space
- **Channels**: First-class communication primitives for safe concurrency
- **Static binary**: Single binary deployment with no runtime dependencies
- **Fast GC**: Sub-millisecond garbage collection pauses

## Architecture Overview

Here's the architecture I typically use for production microservices:

\`\`\`go
package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

type Server struct {
    router     *http.ServeMux
    httpServer *http.Server
    logger     *log.Logger
}

func NewServer(addr string) *Server {
    s := &Server{
        router: http.NewServeMux(),
        logger: log.New(os.Stdout, "[service] ", log.LstdFlags),
    }

    s.httpServer = &http.Server{
        Addr:         addr,
        Handler:      s.middleware(s.router),
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }

    s.routes()
    return s
}

func (s *Server) middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        s.logger.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
\`\`\`

## Implementing Circuit Breakers

One of the most critical patterns in microservice architecture is the circuit breaker. It prevents cascading failures when downstream services are unhealthy.

\`\`\`go
type CircuitBreaker struct {
    mu          sync.Mutex
    state       State
    failures    int
    threshold   int
    timeout     time.Duration
    lastFailure time.Time
}

type State int

const (
    StateClosed State = iota
    StateOpen
    StateHalfOpen
)

func (cb *CircuitBreaker) Execute(fn func() error) error {
    cb.mu.Lock()
    
    if cb.state == StateOpen {
        if time.Since(cb.lastFailure) > cb.timeout {
            cb.state = StateHalfOpen
        } else {
            cb.mu.Unlock()
            return ErrCircuitOpen
        }
    }
    cb.mu.Unlock()

    err := fn()
    
    cb.mu.Lock()
    defer cb.mu.Unlock()
    
    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.threshold {
            cb.state = StateOpen
        }
        return err
    }

    cb.failures = 0
    cb.state = StateClosed
    return nil
}
\`\`\`

## Rate Limiting with Token Bucket

For API rate limiting, I use a token bucket implementation that's both memory-efficient and fair:

\`\`\`go
type TokenBucket struct {
    rate       float64
    capacity   float64
    tokens     float64
    lastRefill time.Time
    mu         sync.Mutex
}

func NewTokenBucket(rate, capacity float64) *TokenBucket {
    return &TokenBucket{
        rate:       rate,
        capacity:   capacity,
        tokens:     capacity,
        lastRefill: time.Now(),
    }
}

func (tb *TokenBucket) Allow() bool {
    tb.mu.Lock()
    defer tb.mu.Unlock()

    now := time.Now()
    elapsed := now.Sub(tb.lastRefill).Seconds()
    tb.tokens = math.Min(tb.capacity, tb.tokens+elapsed*tb.rate)
    tb.lastRefill = now

    if tb.tokens >= 1 {
        tb.tokens--
        return true
    }
    return false
}
\`\`\`

## Graceful Shutdown

Always implement graceful shutdown. In-flight requests should complete before the service terminates:

\`\`\`go
func main() {
    srv := NewServer(":8080")

    go func() {
        if err := srv.httpServer.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatalf("HTTP server error: %v", err)
        }
    }()

    // Wait for interrupt signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    // Give outstanding requests 30 seconds to complete
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := srv.httpServer.Shutdown(ctx); err != nil {
        log.Fatalf("Forced shutdown: %v", err)
    }
    log.Println("Server stopped gracefully")
}
\`\`\`

## Key Takeaways

1. **Design for failure**: Every network call can fail. Plan for it.
2. **Observe everything**: Metrics, logs, and traces are non-negotiable.
3. **Keep services small**: Each service should do one thing well.
4. **Automate deployment**: CI/CD pipelines should handle the boring stuff.

The beauty of Go is that it forces you to handle errors explicitly. There's no hiding behind try-catch blocks. Every error is a conscious decision.

---

*Building resilient systems is a journey, not a destination. Keep iterating.*
`,
  },
  {
    slug: "advanced-typescript-patterns-for-large-codebases",
    title: "Advanced TypeScript Patterns for Large Codebases",
    excerpt:
      "Exploring advanced type-level programming in TypeScript — branded types, template literal types, conditional types, and patterns that make large codebases maintainable.",
    date: "2024-11-28",
    readTime: "15 min read",
    category: "TypeScript",
    featured: true,
    coverColor: "#1e293b",
    content: `
# Advanced TypeScript Patterns for Large Codebases

TypeScript's type system is Turing-complete. That means you can encode arbitrarily complex logic at the type level. But with great power comes great responsibility. Here are patterns I use daily in production codebases.

## Branded Types for Domain Safety

Primitive obsession is a common anti-pattern. A \`string\` could be a user ID, an email, or a URL — but the type system can't tell them apart. Branded types fix this:

\`\`\`typescript
// Create a unique brand symbol
declare const __brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [__brand]: B };

// Define domain types
type UserId = Brand<string, "UserId">;
type Email = Brand<string, "Email">;
type URL = Brand<string, "URL">;

// Smart constructors with validation
function createUserId(id: string): UserId {
  if (!/^usr_[a-zA-Z0-9]{24}$/.test(id)) {
    throw new Error(\`Invalid user ID format: \${id}\`);
  }
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    throw new Error(\`Invalid email: \${email}\`);
  }
  return email as Email;
}

// Now these are type-safe — can't mix them up!
function getUserById(id: UserId): Promise<User> { /* ... */ }
function sendEmail(to: Email, subject: string): void { /* ... */ }

// This would be a compile-time error:
// getUserById(someEmail); // Type 'Email' is not assignable to type 'UserId'
\`\`\`

## Template Literal Types for API Routes

TypeScript 4.1 introduced template literal types. Combined with mapped types, you can create type-safe API clients:

\`\`\`typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

type APIRoutes = {
  "GET /users": { response: User[]; query: { limit?: number } };
  "GET /users/:id": { response: User; params: { id: string } };
  "POST /users": { response: User; body: CreateUserDTO };
  "PUT /users/:id": { response: User; params: { id: string }; body: UpdateUserDTO };
  "DELETE /users/:id": { response: void; params: { id: string } };
};

// Extract route parameters from path
type ExtractParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends \`\${string}:\${infer Param}\`
      ? { [K in Param]: string }
      : never;

// Type-safe fetch wrapper
type RouteKey = keyof APIRoutes;

async function apiCall<K extends RouteKey>(
  route: K,
  config: Omit<APIRoutes[K], "response">
): Promise<APIRoutes[K]["response"]> {
  const [method, path] = route.split(" ") as [HTTPMethod, string];
  // Implementation here...
  return {} as APIRoutes[K]["response"];
}

// Usage — fully type-safe!
const users = await apiCall("GET /users", { query: { limit: 10 } });
const user = await apiCall("GET /users/:id", { params: { id: "123" } });
\`\`\`

## Conditional Types for Polymorphic Components

React components that change their props based on a discriminator are common. Here's how to type them correctly:

\`\`\`typescript
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
};

// Polymorphic "as" prop
type AsProps<E extends React.ElementType> = {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonBaseProps>;

type ButtonProps<E extends React.ElementType = "button"> = 
  ButtonBaseProps & AsProps<E>;

function Button<E extends React.ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps<E>) {
  const Component = as || "button";
  return <Component className={\`btn btn-\${variant} btn-\${size}\`} {...props}>{children}</Component>;
}

// Works as button
<Button onClick={() => {}}>Click me</Button>

// Works as link with full anchor props
<Button as="a" href="/dashboard">Go to Dashboard</Button>

// Works as Next.js Link
<Button as={Link} href="/dashboard">Navigate</Button>
\`\`\`

## The Builder Pattern with Method Chaining

For complex object construction, the builder pattern with type-safe method chaining ensures you can't forget required fields:

\`\`\`typescript
type RequiredFields = "name" | "email" | "role";

type BuilderState = {
  [K in RequiredFields]: boolean;
};

class UserBuilder<State extends Partial<BuilderState> = {}> {
  private data: Partial<User> = {};

  name(name: string): UserBuilder<State & { name: true }> {
    this.data.name = name;
    return this as any;
  }

  email(email: string): UserBuilder<State & { email: true }> {
    this.data.email = email;
    return this as any;
  }

  role(role: Role): UserBuilder<State & { role: true }> {
    this.data.role = role;
    return this as any;
  }

  // build() is only available when ALL required fields are set
  build(
    this: UserBuilder<{ [K in RequiredFields]: true }>
  ): User {
    return this.data as User;
  }
}

// This works:
const user = new UserBuilder()
  .name("Mukesh")
  .email("mukesh@example.com")
  .role("admin")
  .build(); // OK!

// This fails at compile time:
// new UserBuilder().name("Mukesh").build();
// Error: Property 'build' does not exist
\`\`\`

## Exhaustive Pattern Matching

Ensure you handle every case in a discriminated union:

\`\`\`typescript
type Result<T, E = Error> =
  | { status: "success"; data: T }
  | { status: "error"; error: E }
  | { status: "loading" }
  | { status: "idle" };

function assertNever(x: never): never {
  throw new Error(\`Unexpected value: \${x}\`);
}

function renderResult<T>(result: Result<T>): string {
  switch (result.status) {
    case "success": return \`Data: \${result.data}\`;
    case "error": return \`Error: \${result.error.message}\`;
    case "loading": return "Loading...";
    case "idle": return "Ready";
    default: return assertNever(result);
    // If you add a new status, TypeScript will error here
  }
}
\`\`\`

## Conclusion

These patterns might seem complex in isolation, but they pay dividends at scale. When your codebase grows to hundreds of files and dozens of contributors, the compiler becomes your most reliable code reviewer.

> The best TypeScript code reads like documentation and fails like a safety net.

Type-level programming isn't about showing off — it's about making invalid states unrepresentable.
`,
  },
  {
    slug: "kubernetes-zero-downtime-deployments",
    title: "Zero-Downtime Deployments on Kubernetes",
    excerpt:
      "A practical guide to achieving true zero-downtime deployments with Kubernetes, covering rolling updates, health checks, PodDisruptionBudgets, and blue-green strategies.",
    date: "2024-11-10",
    readTime: "10 min read",
    category: "DevOps",
    featured: false,
    coverColor: "#0f172a",
    content: `
# Zero-Downtime Deployments on Kubernetes

Deploying without downtime seems simple until you actually try it. There are dozens of subtle ways your users can experience errors during a rollout. Let me walk you through the strategies I use to achieve true zero-downtime deployments.

## The Problem

During a typical deployment, there's a window where:
1. Old pods are terminating (may still receive traffic)
2. New pods are starting (not yet ready to serve)
3. Load balancers are updating their backends

If any of these overlap incorrectly, users see 502s, connection resets, or timeout errors.

## Rolling Update Strategy

The foundation of zero-downtime deployments in Kubernetes:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  labels:
    app: api-server
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Create 1 new pod before killing old ones
      maxUnavailable: 0  # Never have fewer than desired replicas
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      terminationGracePeriodSeconds: 60
      containers:
        - name: api
          image: registry.example.com/api:v2.1.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "128Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "1000m"
\`\`\`

> **Key insight**: Setting \`maxUnavailable: 0\` ensures you always have at least the desired number of healthy pods. Combined with \`maxSurge: 1\`, Kubernetes creates a new pod first, waits for it to be ready, then terminates an old one.

## Health Checks: The Foundation

Without proper health checks, Kubernetes can't know when your app is ready to serve traffic:

\`\`\`yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 2

startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 2
  failureThreshold: 30  # Allow up to 60s for startup
\`\`\`

Your readiness endpoint should verify:

\`\`\`go
func readyHandler(w http.ResponseWriter, r *http.Request) {
    // Check database connectivity
    if err := db.PingContext(r.Context()); err != nil {
        http.Error(w, "db not ready", http.StatusServiceUnavailable)
        return
    }

    // Check cache connectivity  
    if err := redis.Ping(r.Context()).Err(); err != nil {
        http.Error(w, "cache not ready", http.StatusServiceUnavailable)
        return
    }

    // Check that warmup is complete
    if !cache.IsWarmed() {
        http.Error(w, "cache warming", http.StatusServiceUnavailable)
        return
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("ready"))
}
\`\`\`

## Graceful Shutdown with PreStop Hook

The most common source of dropped requests is the gap between when Kubernetes removes a pod from the service endpoints and when the pod actually stops accepting connections:

\`\`\`yaml
lifecycle:
  preStop:
    exec:
      command: ["sh", "-c", "sleep 10"]
\`\`\`

This 10-second sleep gives the kube-proxy and ingress controllers time to update their routing tables before the pod starts shutting down.

In your application code:

\`\`\`go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: router}

    go srv.ListenAndServe()

    // Wait for SIGTERM
    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGTERM)
    <-stop

    // Stop accepting new connections, finish existing ones
    ctx, cancel := context.WithTimeout(context.Background(), 45*time.Second)
    defer cancel()
    srv.Shutdown(ctx)
}
\`\`\`

## PodDisruptionBudgets

Protect against voluntary disruptions (node drains, cluster upgrades):

\`\`\`yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-server-pdb
spec:
  minAvailable: 3  # Always keep at least 3 pods running
  selector:
    matchLabels:
      app: api-server
\`\`\`

## The Complete Picture

![Deployment Flow](/images/k8s-deploy-flow.png)

Here's the sequence during a zero-downtime deployment:

1. New pod created with updated image
2. Startup probe begins checking
3. Once startup succeeds, readiness probe takes over
4. Pod marked Ready → added to Service endpoints
5. Traffic starts flowing to new pod
6. Old pod's preStop hook fires (sleep 10s)
7. Old pod removed from Service endpoints
8. SIGTERM sent to old pod's process
9. Old pod completes in-flight requests
10. Old pod terminates

## Conclusion

Zero-downtime deployments aren't a single feature — they're the result of multiple mechanisms working together correctly. Get the health checks right, handle shutdown gracefully, and always test your deployment strategy under load before relying on it in production.
`,
  },
  {
    slug: "react-server-components-deep-dive",
    title: "React Server Components: A Mental Model",
    excerpt:
      "Understanding the paradigm shift of React Server Components — how they work under the hood, when to use them, and how they change the way we think about React applications.",
    date: "2024-10-22",
    readTime: "14 min read",
    category: "React",
    featured: false,
    coverColor: "#1c1917",
    content: `
# React Server Components: A Mental Model

React Server Components (RSC) represent the biggest architectural shift in React since hooks. They fundamentally change where and how your components execute. Let me break down the mental model.

## The Core Idea

Traditional React: **All components run in the browser** (with optional SSR for initial HTML).

Server Components: **Components can run on the server and never ship their JavaScript to the client.**

This isn't SSR. SSR renders your component tree to HTML on the server, then hydrates it on the client (running the same code again). Server Components stay on the server permanently.

## The Two Worlds

\`\`\`
┌─────────────────────────────────────────┐
│              SERVER                       │
│                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │  Page   │  │  List   │  │  Query  │ │
│  │ (server)│  │ (server)│  │ (server)│ │
│  └────┬────┘  └────┬────┘  └────┬────┘ │
│       │             │             │      │
└───────┼─────────────┼─────────────┼──────┘
        │             │             │
┌───────┼─────────────┼─────────────┼──────┐
│       ▼             ▼             ▼      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Counter │  │  Modal  │  │  Form   │ │
│  │(client) │  │(client) │  │(client) │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                          │
│              CLIENT                       │
└─────────────────────────────────────────┘
\`\`\`

## What Server Components Can Do

\`\`\`tsx
// This component NEVER runs in the browser
// It doesn't add to your JS bundle
async function BlogPost({ slug }: { slug: string }) {
  // Direct database access — no API layer needed
  const post = await db.posts.findUnique({
    where: { slug },
    include: { author: true, comments: true },
  });

  if (!post) notFound();

  // Access server-only resources
  const analytics = await getAnalytics(post.id);

  // Import heavy libraries that won't be in the client bundle
  const { format } = await import("date-fns");
  const formattedDate = format(post.createdAt, "MMMM d, yyyy");

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{formattedDate}</time>
      <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
      
      {/* This client component handles interactivity */}
      <CommentSection postId={post.id} initialComments={post.comments} />
    </article>
  );
}
\`\`\`

## The Serialization Boundary

When a Server Component renders a Client Component, it passes props across the serialization boundary. Only serializable values can cross:

\`\`\`tsx
// ✅ These work as props to client components
<ClientComponent
  name="Mukesh"           // string
  count={42}              // number
  items={["a", "b"]}     // array
  config={{ key: "val" }} // plain object
  date="2024-01-01"      // string (not Date object!)
/>

// ❌ These DON'T work
<ClientComponent
  onClick={() => {}}      // functions can't be serialized
  element={<div />}       // JSX from server → actually works!
  class={new MyClass()}   // class instances
  ref={myRef}             // refs
/>
\`\`\`

## Composition Pattern: The Slot Pattern

One of the most powerful patterns with RSC is passing server-rendered content as children to client components:

\`\`\`tsx
// Server Component
async function Dashboard() {
  const data = await fetchDashboardData();

  return (
    <InteractiveLayout>
      {/* These are server-rendered but displayed inside a client component */}
      <MetricsPanel data={data.metrics} />
      <RecentActivity items={data.activity} />
      <UserStats stats={data.stats} />
    </InteractiveLayout>
  );
}

// Client Component — handles drag-and-drop, resize, etc.
"use client";
function InteractiveLayout({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState("grid");
  
  return (
    <div className={layout}>
      {children} {/* Server-rendered content, zero JS cost */}
    </div>
  );
}
\`\`\`

## When to Use Client vs Server Components

| Use Server Components when... | Use Client Components when... |
|-------------------------------|-------------------------------|
| Fetching data | Using \`useState\`, \`useEffect\` |
| Accessing backend resources | Event listeners (onClick, onChange) |
| Keeping secrets on server | Browser APIs (localStorage, etc.) |
| Large dependencies (markdown, etc.) | Interactive UI (modals, dropdowns) |
| No interactivity needed | Real-time updates |

## Performance Implications

The bundle size difference is dramatic. Consider a blog page:

\`\`\`
Traditional SPA:
- react-markdown: 45KB
- date-fns: 20KB  
- highlight.js: 80KB
- Component code: 5KB
Total JS shipped: ~150KB

With Server Components:
- Component code: 0KB (runs on server)
- Client interactivity: ~3KB (share button, comments)
Total JS shipped: ~3KB
\`\`\`

That's a **98% reduction** in JavaScript for a content-heavy page.

## Streaming and Suspense

Server Components integrate beautifully with streaming:

\`\`\`tsx
async function Page() {
  return (
    <div>
      <Header /> {/* Renders immediately */}
      
      <Suspense fallback={<PostSkeleton />}>
        <BlogPost slug={params.slug} /> {/* Streams in when ready */}
      </Suspense>

      <Suspense fallback={<CommentsSkeleton />}>
        <Comments postId={postId} /> {/* Streams independently */}
      </Suspense>
    </div>
  );
}
\`\`\`

Each Suspense boundary is an independent streaming chunk. The user sees content progressively, with no layout shift.

## Conclusion

Server Components aren't just an optimization — they're a new architecture. They let you build apps where:

1. Most code runs on the server (close to the data)
2. Only interactive bits ship JavaScript
3. The composition model is still just React

The mental model shift takes time, but once it clicks, you'll wonder how we lived without it.
`,
  },
  {
    slug: "designing-event-driven-systems-with-kafka",
    title: "Designing Event-Driven Systems with Apache Kafka",
    excerpt:
      "From event sourcing to CQRS, a comprehensive guide to building robust event-driven architectures using Kafka — with real-world patterns, pitfalls, and production lessons.",
    date: "2024-10-05",
    readTime: "16 min read",
    category: "Architecture",
    featured: false,
    coverColor: "#14202e",
    content: `
# Designing Event-Driven Systems with Apache Kafka

Event-driven architecture is one of those patterns that sounds simple but gets complex fast. After running Kafka in production for years, here's what I've learned about doing it right.

## Why Events?

Traditional request-response architectures create tight coupling:

\`\`\`
Order Service → Payment Service → Inventory Service → Notification Service
\`\`\`

If any service is down, the whole chain breaks. Events decouple this:

\`\`\`
Order Service → [OrderCreated] → Kafka
                                    ├→ Payment Service
                                    ├→ Inventory Service
                                    └→ Notification Service
\`\`\`

Each consumer processes independently. If notifications are down, orders still process.

## Event Schema Design

The schema is your contract. Get it wrong, and you'll pay for it forever:

\`\`\`typescript
// Bad: Anemic event
interface OrderCreated {
  orderId: string;
  timestamp: string;
}

// Good: Rich event with all context needed for consumers
interface OrderCreated {
  // Metadata
  eventId: string;        // Idempotency key
  eventType: "order.created";
  version: 1;
  timestamp: string;      // ISO 8601
  source: "order-service";
  correlationId: string;  // Request tracing

  // Payload
  data: {
    orderId: string;
    customerId: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      currency: string;
    }>;
    totalAmount: number;
    currency: string;
    shippingAddress: Address;
    metadata: Record<string, string>;
  };
}
\`\`\`

## Topic Design

Topics are your event streams. Design them thoughtfully:

\`\`\`
// By domain aggregate (recommended for most cases)
orders.events        → All order lifecycle events
payments.events      → Payment processing events
inventory.events     → Stock level changes

// By event type (when consumers need specific events)
order.created        → Only creation events
order.shipped        → Only shipment events

// By priority
notifications.high   → Urgent alerts
notifications.low    → Digest emails
\`\`\`

## Producer: Exactly-Once Semantics

Kafka 0.11+ supports idempotent producers. Always enable this:

\`\`\`typescript
import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],
});

const producer = kafka.producer({
  idempotent: true,                    // Prevent duplicates
  maxInFlightRequests: 5,              // Max parallelism
  createPartitioner: Partitioners.DefaultPartitioner,
});

// Transactional produce — atomic multi-topic writes
async function createOrder(order: Order): Promise<void> {
  const transaction = await producer.transaction();

  try {
    // Write to orders topic
    await transaction.send({
      topic: "orders.events",
      messages: [{
        key: order.id,                 // Partition by order ID
        value: JSON.stringify({
          eventType: "order.created",
          eventId: uuid(),
          timestamp: new Date().toISOString(),
          data: order,
        }),
        headers: {
          "correlation-id": order.correlationId,
          "content-type": "application/json",
        },
      }],
    });

    // Write to analytics topic atomically
    await transaction.send({
      topic: "analytics.events",
      messages: [{
        key: order.customerId,
        value: JSON.stringify({
          eventType: "customer.ordered",
          data: { customerId: order.customerId, amount: order.total },
        }),
      }],
    });

    await transaction.commit();
  } catch (error) {
    await transaction.abort();
    throw error;
  }
}
\`\`\`

## Consumer: Handling Failures

The consumer is where most complexity lives:

\`\`\`typescript
const consumer = kafka.consumer({
  groupId: "payment-processor",
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
  maxBytesPerPartition: 1048576,  // 1MB
});

await consumer.subscribe({ topic: "orders.events", fromBeginning: false });

await consumer.run({
  autoCommit: false,  // Manual commits for exactly-once processing
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value!.toString());
    
    // Idempotency check
    const processed = await redis.get(\`processed:\${event.eventId}\`);
    if (processed) {
      await consumer.commitOffsets([{
        topic, partition, offset: (BigInt(message.offset) + 1n).toString(),
      }]);
      return;
    }

    try {
      // Process the event
      await processPayment(event);

      // Mark as processed (with TTL for cleanup)
      await redis.set(\`processed:\${event.eventId}\`, "1", "EX", 86400 * 7);

      // Commit offset only after successful processing
      await consumer.commitOffsets([{
        topic, partition, offset: (BigInt(message.offset) + 1n).toString(),
      }]);
    } catch (error) {
      // Dead letter queue for permanently failed messages
      if (isRetryable(error)) {
        throw error;  // KafkaJS will retry
      } else {
        await sendToDeadLetter(event, error);
        await consumer.commitOffsets([{
          topic, partition, offset: (BigInt(message.offset) + 1n).toString(),
        }]);
      }
    }
  },
});
\`\`\`

## Event Sourcing Pattern

Instead of storing current state, store the sequence of events that led to it:

\`\`\`typescript
// Event store
interface EventStore {
  append(streamId: string, events: DomainEvent[], expectedVersion: number): Promise<void>;
  read(streamId: string): Promise<DomainEvent[]>;
}

// Rebuild state from events
function rebuildOrder(events: DomainEvent[]): Order {
  return events.reduce((state, event) => {
    switch (event.type) {
      case "OrderCreated":
        return { ...event.data, status: "pending", version: 1 };
      case "PaymentReceived":
        return { ...state, status: "paid", version: state.version + 1 };
      case "OrderShipped":
        return { ...state, status: "shipped", trackingId: event.data.trackingId, version: state.version + 1 };
      case "OrderCancelled":
        return { ...state, status: "cancelled", reason: event.data.reason, version: state.version + 1 };
      default:
        return state;
    }
  }, {} as Order);
}
\`\`\`

## Monitoring & Observability

You can't run Kafka blind. Key metrics to watch:

| Metric | Alert Threshold | Why |
|--------|----------------|-----|
| Consumer lag | > 10,000 messages | Consumers can't keep up |
| Under-replicated partitions | > 0 | Data loss risk |
| Request latency p99 | > 100ms | Broker overload |
| Active controller count | != 1 | Split brain scenario |

## Key Lessons

1. **Events are facts, not commands.** "OrderCreated" not "CreateOrder"
2. **Schema evolution is hard.** Use a schema registry from day one
3. **Ordering matters.** Use partition keys wisely (entity ID, not random)
4. **Consumers will fail.** Build idempotency into every consumer
5. **Monitor consumer lag.** It's your canary in the coal mine

---

Event-driven systems trade consistency for availability and scalability. Understand the tradeoffs before committing. When done right, they're the backbone of every large-scale system I've built.
`,
  },
  {
    slug: "raft-leader-elections-under-real-network-chaos",
    title: "Raft Leader Elections Under Real Network Chaos",
    excerpt:
      "How election timers, heartbeat jitter, and fsync latency interact in production Raft clusters, and what to tune before split-brain scares your team.",
    date: "2026-05-22",
    readTime: "14 min read",
    category: "Distributed Systems",
    featured: true,
    coverColor: "#13202b",
    content: `
# Raft Leader Elections Under Real Network Chaos

Leader election bugs in production usually come from timing assumptions that hold in staging but collapse under packet reordering and storage jitter.

## Hidden Inputs That Skew Elections

- Disk flush latency spikes on leaders.
- Noisy neighbors causing cgroup CPU throttling.
- Clock jitter in virtualized environments.

\`\`\`go
// Election timeout should be randomized and significantly larger
// than heartbeat interval to reduce collision probability.
heartbeat := 100 * time.Millisecond
electionMin := 600 * time.Millisecond
electionMax := 1200 * time.Millisecond
\`\`\`

## Practical Guardrails

1. Keep election timeout at least 5x heartbeat.
2. Track term-change rate as an SLO signal.
3. Separate WAL IO from snapshot IO paths.

Consensus systems fail in the margins. Measure the margins.
`,
  },
  {
    slug: "postgres-index-bloat-and-fillfactor-strategies",
    title: "Postgres Index Bloat and Fillfactor Strategies",
    excerpt:
      "A practical approach to reducing index bloat in write-heavy OLTP systems using fillfactor tuning, HOT-friendly schema design, and targeted reindex plans.",
    date: "2026-05-21",
    readTime: "13 min read",
    category: "Databases",
    featured: false,
    coverColor: "#1b2735",
    content: `
# Postgres Index Bloat and Fillfactor Strategies

Index bloat is a silent tax on both latency and storage. Teams often notice it only after cache hit ratio starts drifting.

## Start with Table Behavior

If updates touch indexed columns frequently, bloat compounds quickly.

\`\`\`sql
ALTER TABLE orders SET (fillfactor = 75);
REINDEX INDEX CONCURRENTLY idx_orders_status_updated_at;
\`\`\`

## Tuning Pattern

- Lower fillfactor on high-churn tables.
- Prefer HOT updates by minimizing unnecessary indexed columns.
- Schedule rolling concurrent reindex for top offenders.

The goal is not zero bloat. The goal is controlled, predictable bloat.
`,
  },
  {
    slug: "kubernetes-pod-startup-critical-path-analysis",
    title: "Kubernetes Pod Startup Critical Path Analysis",
    excerpt:
      "Break down cold-start latency from scheduler queue to readiness probe success, with specific tactics for reducing startup p99 in multi-tenant clusters.",
    date: "2026-05-20",
    readTime: "12 min read",
    category: "DevOps",
    featured: false,
    coverColor: "#122130",
    content: `
# Kubernetes Pod Startup Critical Path Analysis

Startup delay is a chain problem: image pull, cgroup setup, sidecar init, app boot, readiness checks. Fixing one link rarely solves p99.

## Instrument the Full Timeline

1. Scheduler enqueue to bind.
2. Node pull and unpack.
3. Container create and entrypoint.
4. Probe pass and endpoint publish.

\`\`\`yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  periodSeconds: 2
  failureThreshold: 40
\`\`\`

Treat startup latency as a product metric, not just platform noise.
`,
  },
  {
    slug: "grpc-stream-backpressure-with-flow-control-windows",
    title: "gRPC Stream Backpressure with Flow Control Windows",
    excerpt:
      "How to prevent memory blowups and long-tail latency in bidirectional gRPC streams using bounded buffers and dynamic flow-control tuning.",
    date: "2026-05-18",
    readTime: "15 min read",
    category: "Backend",
    featured: false,
    coverColor: "#152432",
    content: `
# gRPC Stream Backpressure with Flow Control Windows

Unbounded stream consumers eventually fail in one of three ways: memory pressure, queue thrashing, or timeout amplification.

## Core Rule

Apply backpressure at every stage, not just network transport.

\`\`\`go
// Bounded application channel protects process memory.
msgs := make(chan *pb.Event, 1024)
\`\`\`

## Implementation Notes

- Tune HTTP/2 window sizes with realistic payloads.
- Use bounded worker pools for downstream processing.
- Propagate cancellation aggressively.

Throughput without backpressure is borrowed time.
`,
  },
  {
    slug: "multi-region-idempotency-for-payment-apis",
    title: "Multi-Region Idempotency for Payment APIs",
    excerpt:
      "Designing payment mutation endpoints that remain safe under retries, failover races, and duplicate submit storms across regions.",
    date: "2026-05-17",
    readTime: "16 min read",
    category: "Architecture",
    featured: true,
    coverColor: "#1a2b38",
    content: `
# Multi-Region Idempotency for Payment APIs

Payment APIs are where distributed systems bugs become financial bugs. Idempotency design has to be explicit and auditable.

## Record Shape

\`\`\`typescript
type IdempotencyRow = {
  key: string;
  requestHash: string;
  status: "inflight" | "committed" | "rejected";
  responseJson: string;
};
\`\`\`

## Failure Handling

1. Same key + same hash => replay prior response.
2. Same key + different hash => hard reject.
3. Inflight collision => client retry with backoff.

Idempotency is a correctness contract, not an optimization layer.
`,
  },
  {
    slug: "building-low-latency-search-with-hybrid-indexes",
    title: "Building Low-Latency Search with Hybrid Indexes",
    excerpt:
      "Combining lexical inverted indexes with vector retrieval for high-recall, low-latency developer search workloads at scale.",
    date: "2026-05-15",
    readTime: "17 min read",
    category: "Search",
    featured: false,
    coverColor: "#182430",
    content: `
# Building Low-Latency Search with Hybrid Indexes

Developer search fails when you over-commit to either lexical matching or embeddings alone. Hybrid retrieval wins in most practical corpora.

## Retrieval Plan

- Lexical BM25 for precision anchors.
- Vector ANN for semantic recall.
- Reciprocal rank fusion for stable blending.

\`\`\`text
RRF(d) = Σ 1 / (k + rank_i(d))
\`\`\`

## Operations Notes

Keep vector index rebuilds decoupled from lexical refresh cadence to avoid synchronized regressions.

Search quality is mostly ranking engineering, not model hype.
`,
  },
  {
    slug: "timeseries-cardinality-budgeting-for-prometheus",
    title: "Time-Series Cardinality Budgeting for Prometheus",
    excerpt:
      "A governance model for labels and metric families that keeps Prometheus fast during incidents while preserving useful debugging signals.",
    date: "2026-05-14",
    readTime: "11 min read",
    category: "Observability",
    featured: false,
    coverColor: "#1d2a36",
    content: `
# Time-Series Cardinality Budgeting for Prometheus

Cardinality blowups are predictable if you do not enforce label budgets.

## Budget by Metric Family

Assign a max active-series target for each service and block merges that exceed policy.

\`\`\`yaml
metric_relabel_configs:
  - source_labels: [path]
    regex: "/users/[0-9]+"
    target_label: path
    replacement: "/users/:id"
\`\`\`

## Anti-Patterns

- Raw URL labels.
- User IDs in counters.
- Request IDs in histograms.

Metrics should summarize systems, not mirror event logs.
`,
  },
  {
    slug: "clickhouse-materialized-view-pipelines-for-analytics",
    title: "ClickHouse Materialized View Pipelines for Product Analytics",
    excerpt:
      "Designing ingestion and rollup pipelines with ClickHouse materialized views for reliable sub-second dashboard queries.",
    date: "2026-05-13",
    readTime: "14 min read",
    category: "Data Engineering",
    featured: false,
    coverColor: "#1c2532",
    content: `
# ClickHouse Materialized View Pipelines for Product Analytics

Raw event tables are great for flexibility and terrible for dashboard consistency under peak load.

## Pattern

1. Ingest immutable raw facts.
2. Build deterministic rollup MVs.
3. Query rollups by default; raw only for deep-dive.

\`\`\`sql
CREATE MATERIALIZED VIEW mv_daily_signups
ENGINE = SummingMergeTree
ORDER BY (org_id, day)
AS SELECT org_id, toDate(ts) AS day, count() AS signups
FROM events
WHERE event_name = 'signup'
GROUP BY org_id, day;
\`\`\`

Analytics stability comes from precomputation discipline.
`,
  },
  {
    slug: "online-mysql-migrations-with-dual-write-cutovers",
    title: "Online MySQL Migrations with Dual-Write Cutovers",
    excerpt:
      "A tested migration sequence for large MySQL tables using shadow schema, dual writes, checksums, and rollback-safe traffic switching.",
    date: "2026-05-11",
    readTime: "18 min read",
    category: "Databases",
    featured: true,
    coverColor: "#15212d",
    content: `
# Online MySQL Migrations with Dual-Write Cutovers

Schema migrations on multi-terabyte datasets are operational programs, not single SQL statements.

## Safe Sequence

1. Shadow table creation.
2. Backfill in bounded chunks.
3. Enable dual-write.
4. Validate checksums continuously.
5. Gradual read cutover, then write cutover.

\`\`\`sql
INSERT INTO users_v2 (id, email)
SELECT id, email FROM users
WHERE id > ? AND id <= ?;
\`\`\`

No cutover without sustained zero drift.
`,
  },
  {
    slug: "building-internal-platform-scorecards-that-drive-adoption",
    title: "Building Internal Platform Scorecards That Drive Adoption",
    excerpt:
      "How platform teams can improve reliability and velocity with actionable scorecards linked to auto-fix workflows.",
    date: "2026-05-10",
    readTime: "12 min read",
    category: "Platform Engineering",
    featured: false,
    coverColor: "#1f2b37",
    content: `
# Building Internal Platform Scorecards That Drive Adoption

Platform scorecards fail when they are dashboards without remediation paths.

## Make Them Actionable

- Show one-click fixes for each failing control.
- Surface scorecards in PR checks and service catalogs.
- Reward trend improvements, not only absolute thresholds.

\`\`\`yaml
service_scorecard:
  tracing_enabled: true
  runbook_present: true
  rollback_tested: true
\`\`\`

Adoption follows convenience. Policy follows adoption.
`,
  },
  {
    slug: "event-sourcing-snapshot-cadence-and-replay-costs",
    title: "Event Sourcing Snapshot Cadence and Replay Costs",
    excerpt:
      "A cost model for snapshot frequency in event-sourced systems, balancing write overhead against replay latency and incident recovery speed.",
    date: "2026-05-09",
    readTime: "13 min read",
    category: "Architecture",
    featured: false,
    coverColor: "#172633",
    content: `
# Event Sourcing Snapshot Cadence and Replay Costs

Snapshots are a classic tradeoff: write amplification now versus replay pain later.

## Simple Cost Frame

Let replay time be $R(n)$ for $n$ events since snapshot, and snapshot overhead per write be $S$. Pick cadence minimizing expected recovery + steady-state costs.

## Practical Heuristic

- Snapshot on both count threshold and wall-clock threshold.
- Snapshot sooner for aggregates with high recovery criticality.

\`\`\`text
if events_since_snapshot > 10_000 or age > 30m => snapshot
\`\`\`

Tune cadence using incident replay data, not gut feel.
`,
  },
  {
    slug: "zero-trust-service-identity-with-spiffe-in-k8s",
    title: "Zero-Trust Service Identity with SPIFFE in Kubernetes",
    excerpt:
      "A migration guide from network trust to workload identity using SPIFFE/SPIRE, short-lived certs, and policy shadow mode.",
    date: "2026-05-08",
    readTime: "15 min read",
    category: "Security",
    featured: false,
    coverColor: "#13242f",
    content: `
# Zero-Trust Service Identity with SPIFFE in Kubernetes

IP-based trust is fragile in dynamic orchestration platforms. Identity has to be workload-scoped and cryptographically verifiable.

## Rollout Phases

1. Authenticate only.
2. Authorize in shadow mode.
3. Enforce least-privilege policies.

\`\`\`yaml
principal: spiffe://prod/ns/payments/sa/api
allow:
  - method: ChargeCard
\`\`\`

Shadow mode is where policy quality is built.
`,
  },
  {
    slug: "adaptive-kafka-consumer-concurrency-with-lag-feedback",
    title: "Adaptive Kafka Consumer Concurrency with Lag Feedback",
    excerpt:
      "Dynamic worker scaling for consumers driven by lag slope and handler latency, with safeguards to avoid rebalance thrash.",
    date: "2026-05-07",
    readTime: "12 min read",
    category: "Streaming",
    featured: false,
    coverColor: "#1a2733",
    content: `
# Adaptive Kafka Consumer Concurrency with Lag Feedback

Static consumer concurrency is almost always wrong by lunchtime.

## Feedback Inputs

- partition lag delta
- handler p95
- broker throttle signals

\`\`\`typescript
if (lagSlope > HIGH && p95 < 100) workers += 2;
if (p95 > 300) workers = Math.max(1, workers - 1);
\`\`\`

Scale conservatively to avoid rebalance storms.
`,
  },
  {
    slug: "slo-burn-rate-alerting-that-reduces-noise",
    title: "SLO Burn-Rate Alerting That Reduces Noise",
    excerpt:
      "Designing multi-window burn-rate alerts that catch real reliability regressions early without paging teams for harmless variance.",
    date: "2026-05-06",
    readTime: "11 min read",
    category: "Reliability",
    featured: false,
    coverColor: "#1b2631",
    content: `
# SLO Burn-Rate Alerting That Reduces Noise

Burn-rate alerts work best when tied to action policies, not generic severity labels.

## Two-Window Pattern

- Fast-burn window detects acute incidents.
- Slow-burn window detects chronic erosion.

\`\`\`text
fast: 1h window, burn > 14x
slow: 6h window, burn > 4x
\`\`\`

Alert design should optimize decision quality, not chart sophistication.
`,
  },
  {
    slug: "webassembly-edge-filters-for-api-hardening",
    title: "WebAssembly Edge Filters for API Hardening",
    excerpt:
      "Use WASM edge filters to enforce deterministic request normalization and basic abuse controls before traffic reaches core services.",
    date: "2026-05-05",
    readTime: "13 min read",
    category: "Edge Computing",
    featured: false,
    coverColor: "#142532",
    content: `
# WebAssembly Edge Filters for API Hardening

Edge policy logic should be simple, deterministic, and cheap.

## Best Fit Use Cases

- Header normalization
- Path canonicalization
- Lightweight signature checks

\`\`\`rust
#[no_mangle]
pub fn on_request(req: Request) -> Action {
    if req.path().starts_with("/internal") { return Action::Deny(403); }
    Action::Continue
}
\`\`\`

Edge layers should reject obvious bad traffic and leave business logic to origin.
`,
  },
  {
    slug: "oauth-refresh-token-rotation-for-public-clients",
    title: "OAuth Refresh Token Rotation for Public Clients",
    excerpt:
      "Secure token lifecycle patterns for mobile and SPA apps with refresh rotation, reuse detection, and compromise-aware session revocation.",
    date: "2026-05-04",
    readTime: "14 min read",
    category: "Security",
    featured: false,
    coverColor: "#202b36",
    content: `
# OAuth Refresh Token Rotation for Public Clients

Public clients cannot protect long-lived secrets. Rotation and reuse detection are non-negotiable.

## Core Controls

1. PKCE for authorization code flow.
2. Short-lived access tokens.
3. One-time-use refresh tokens.

\`\`\`json
{
  "access_token_ttl": 900,
  "refresh_rotation": true,
  "reuse_detection": true
}
\`\`\`

Design the token lifecycle assuming compromise, not best behavior.
`,
  },
  {
    slug: "redis-streams-job-recovery-with-claim-loops",
    title: "Redis Streams Job Recovery with Claim Loops",
    excerpt:
      "Reliable background processing with Redis Streams using consumer groups, pending-entry recovery, and explicit poison-message handling.",
    date: "2026-05-03",
    readTime: "12 min read",
    category: "Infrastructure",
    featured: false,
    coverColor: "#1d2b39",
    content: `
# Redis Streams Job Recovery with Claim Loops

At-least-once delivery only works if abandoned pending jobs are reclaimed predictably.

## Recovery Loop

- Scan PEL for stale deliveries.
- Claim by healthy workers.
- Track attempt count and DLQ threshold.

\`\`\`bash
XAUTOCLAIM jobs workers worker-3 60000 0-0 COUNT 100
\`\`\`

Queue durability comes from recovery behavior, not enqueue speed.
`,
  },
  {
    slug: "cost-aware-batch-scheduling-on-spot-nodes",
    title: "Cost-Aware Batch Scheduling on Spot Nodes",
    excerpt:
      "Reduce compute spend safely with interruption-aware scheduling, checkpointing, and queue-level SLA classes for batch workloads.",
    date: "2026-05-02",
    readTime: "13 min read",
    category: "Cloud",
    featured: false,
    coverColor: "#18242f",
    content: `
# Cost-Aware Batch Scheduling on Spot Nodes

Spot capacity is powerful only when jobs are built to survive interruption.

## Queue Classes

- SLA-critical: on-demand only.
- Flexible: spot preferred with fallback.
- Experimental: spot only.

\`\`\`yaml
nodeSelector:
  capacity-type: spot
tolerations:
  - key: interruption
    operator: Exists
\`\`\`

Cost optimization without interruption policy is just deferred incident creation.
`,
  },
  {
    slug: "feature-flag-control-plane-consistency-models",
    title: "Feature Flag Control-Plane Consistency Models",
    excerpt:
      "How to classify flags by risk and assign consistency guarantees so kill switches are strong while experiments stay fast.",
    date: "2026-05-01",
    readTime: "12 min read",
    category: "Platform",
    featured: false,
    coverColor: "#1e2934",
    content: `
# Feature Flag Control-Plane Consistency Models

Not all flags deserve the same consistency guarantees. Over-constraining all flag reads increases latency and cost.

## Consistency Tiers

1. Safety flags: strongly consistent.
2. Experiment flags: bounded staleness.
3. Cosmetic flags: client-evaluated.

\`\`\`typescript
type FlagTier = "safety" | "experiment" | "cosmetic";
\`\`\`

Correct consistency tiering is a major lever for both reliability and performance.
`,
  },
  {
    slug: "llm-agent-cache-design-for-tool-heavy-workflows",
    title: "LLM Agent Cache Design for Tool-Heavy Workflows",
    excerpt:
      "A cache architecture for agent systems combining prompt normalization, tool-result memoization, and freshness-aware invalidation.",
    date: "2026-04-30",
    readTime: "15 min read",
    category: "AI Infrastructure",
    featured: false,
    coverColor: "#112332",
    content: `
# LLM Agent Cache Design for Tool-Heavy Workflows

Tool-heavy agents repeat work constantly. Caching is the difference between viable and expensive.

## Layered Cache

- Prompt fingerprint cache.
- Tool output cache by normalized args.
- Retrieval cache by semantic neighborhood.

\`\`\`typescript
const key = sha256(JSON.stringify({ promptTemplate, contextHash, toolSig }));
\`\`\`

Cache policy must encode freshness risk, not only hit-rate goals.
`,
  },
  {
    slug: "cqrs-read-model-rebuilds-with-versioned-cutover",
    title: "CQRS Read-Model Rebuilds with Versioned Cutover",
    excerpt:
      "Rebuild large read models online using side-by-side projections, semantic diff checks, and cohort-based traffic migration.",
    date: "2026-04-29",
    readTime: "16 min read",
    category: "Architecture",
    featured: false,
    coverColor: "#172633",
    content: `
# CQRS Read-Model Rebuilds with Versioned Cutover

Read models drift. Rebuilds are inevitable. Downtime is optional.

## Versioned Strategy

1. Build V2 projection in parallel.
2. Compare V1/V2 on sampled traffic.
3. Shift cohorts gradually.
4. Keep rollback path warm.

\`\`\`pseudo
if cohort(userId) == "canary":
  query(V2)
else:
  query(V1)
\`\`\`

Confidence comes from diff quality, not migration speed.
`,
  },
];

export function getFeaturedPosts(): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
