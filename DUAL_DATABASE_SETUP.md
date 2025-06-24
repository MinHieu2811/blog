# Dual Database Setup: MongoDB + Supabase

This project uses both MongoDB (for blog content) and Supabase/PostgreSQL (for tracking and analytics) simultaneously.

## Database Structure

### MongoDB (Blog Data)
- **Schema**: `prisma/schema.prisma`
- **Models**: `Post`, `Category`
- **Purpose**: Store blog posts, categories, and content

### Supabase/PostgreSQL (Tracking Data)
- **Schema**: `prisma/tracking.schema.prisma`
- **Models**: `UserTrackingEvent`, `ErrorLog`
- **Purpose**: Store user analytics, tracking events, and error logs

## Environment Variables

Make sure you have these environment variables set in your `.env` file:

```env
# MongoDB
MONGO_DATABASE_URL="mongodb://localhost:27017/your-blog-db"

# Supabase
SUPABASE_DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma clients**:
   ```bash
   npm run db:generate
   ```

3. **Push schemas to databases**:
   ```bash
   npm run db:push
   ```

## Usage

### Import the Database utility

```typescript
import { Database } from '../lib/database'
```

### Access MongoDB (Blog Data)

```typescript
// Get all posts
const posts = await Database.blog.post.findMany({
  include: { category: true }
})

// Create a new post
const newPost = await Database.blog.post.create({
  data: {
    title: "My New Post",
    slug: "my-new-post",
    content: "Post content...",
    // ... other fields
  }
})
```

### Access Supabase (Tracking Data)

```typescript
// Track a user event
const trackingEvent = await Database.tracking.userTrackingEvent.create({
  data: {
    sessionId: "session-123",
    blogId: "post-id",
    eventType: "page_view",
    eventData: { referrer: "google.com" }
  }
})

// Log an error
await Database.tracking.errorLog.create({
  data: {
    error: "Something went wrong",
    event: "api_error",
    eventData: { endpoint: "/api/posts" }
  }
})
```

### Using Convenience Methods

```typescript
// Get posts with categories
const posts = await Database.getPosts()

// Get categories with posts
const categories = await Database.getCategories()

// Track an event
await Database.trackEvent("session-123", "post-id", "click", { button: "share" })

// Log an error
await Database.logError("Database connection failed", "db_error", { retries: 3 })
```

### Direct Client Access

```typescript
import { mongo, supabase } from '../lib/database'

// Use MongoDB client directly
const post = await mongo.post.findUnique({ where: { id: "post-id" } })

// Use Supabase client directly
const events = await supabase.userTrackingEvent.findMany()
```

## API Routes Example

See `src/pages/api/example-dual-db.ts` for a complete example of using both databases in an API route.

## Database Operations

### MongoDB Operations
- **Posts**: Create, read, update, delete blog posts
- **Categories**: Manage blog categories
- **Relationships**: Posts belong to categories

### Supabase Operations
- **User Tracking**: Track user interactions with blog posts
- **Error Logging**: Log application errors and events
- **Analytics**: Store analytics data for reporting

## Migration and Schema Changes

When you need to update schemas:

1. **Update MongoDB schema**:
   ```bash
   npx prisma db push
   ```

2. **Update Supabase schema**:
   ```bash
   npx prisma db push --schema=./prisma/tracking.schema.prisma
   ```

3. **Regenerate clients**:
   ```bash
   npm run db:generate
   ```

## Best Practices

1. **Use the Database utility class** for most operations
2. **Handle errors properly** and log them to Supabase
3. **Use transactions** when operations span both databases
4. **Keep schemas separate** to avoid conflicts
5. **Use appropriate data types** for each database (ObjectId for MongoDB, UUID for PostgreSQL)

## Troubleshooting

### Common Issues

1. **Client not generated**: Run `npm run db:generate`
2. **Connection errors**: Check environment variables
3. **Schema conflicts**: Ensure generator names are unique
4. **Import errors**: Make sure both clients are generated before importing

### Debug Commands

```bash
# Check MongoDB connection
npx prisma db pull

# Check Supabase connection
npx prisma db pull --schema=./prisma/tracking.schema.prisma

# View generated clients
ls src/lib/tracking-client/
``` 