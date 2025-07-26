# CMS API Documentation

## Overview

The CMS (Content Management System) API provides role-based access to manage properties, users, blog posts, media, and analytics data. The API follows RESTful conventions and uses JWT tokens for authentication.

## Base URL

```
https://api.realestate-cms.com/v1
```

## Authentication

All API requests require authentication using JWT tokens in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Format

```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "role": "admin|agent|developer|seller",
  "permissions": ["properties:read", "properties:write", ...],
  "exp": 1640995200
}
```

## Role-Based Access Control

### Roles and Permissions

| Role      | Properties | Users     | Blog Posts | Media      | Analytics   | Activity Logs |
| --------- | ---------- | --------- | ---------- | ---------- | ----------- | ------------- |
| Admin     | Full CRUD  | Full CRUD | Full CRUD  | Full CRUD  | Full Access | Full Access   |
| Agent     | Read/Write | Read Only | Read/Write | Read/Write | Limited     | None          |
| Developer | Read/Write | Read Only | Read/Write | Read/Write | Limited     | None          |
| Seller    | Read Only  | None      | None       | Read Only  | Limited     | None          |

## API Endpoints

### Properties Management

#### Get All Properties

```http
GET /properties
```

**Query Parameters:**

- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `status` (string): Filter by status (active, sold, pending)
- `type` (string): Filter by property type (house, condo, land)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `location` (string): Location search term

**Response:**

```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "prop-123",
        "title": "Modern Downtown Condo",
        "description": "Luxury 2-bedroom condo with city views",
        "price": 450000,
        "status": "active",
        "type": "condo",
        "location": "Downtown Austin",
        "bedrooms": 2,
        "bathrooms": 2,
        "sqft": 1200,
        "images": ["url1", "url2"],
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-20T14:45:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### Get Property by ID

```http
GET /properties/{id}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "prop-123",
    "title": "Modern Downtown Condo",
    "description": "Luxury 2-bedroom condo with city views",
    "price": 450000,
    "status": "active",
    "type": "condo",
    "location": "Downtown Austin",
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 1200,
    "images": ["url1", "url2"],
    "features": ["balcony", "parking", "gym"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:45:00Z"
  }
}
```

#### Create Property

```http
POST /properties
```

**Required Permissions:** `properties:create`

**Request Body:**

```json
{
  "title": "New Property Listing",
  "description": "Property description with markdown support",
  "price": 350000,
  "type": "house",
  "location": "Austin, TX",
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 1800,
  "features": ["garage", "garden"],
  "images": ["image-url-1", "image-url-2"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "prop-124",
    "title": "New Property Listing",
    "createdAt": "2024-01-21T09:00:00Z",
    "message": "Property created successfully"
  }
}
```

#### Update Property

```http
PUT /properties/{id}
```

**Required Permissions:** `properties:update`

**Request Body:** (same as create, all fields optional)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "prop-123",
    "updatedAt": "2024-01-21T10:30:00Z",
    "message": "Property updated successfully"
  }
}
```

#### Delete Property

```http
DELETE /properties/{id}
```

**Required Permissions:** `properties:delete`

**Response:**

```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

### User Management

#### Get All Users

```http
GET /users
```

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `role` (string): Filter by role
- `status` (string): Filter by status (active, inactive)

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-123",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "agent",
        "status": "active",
        "avatar": "avatar-url",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

#### Create User

```http
POST /users
```

**Required Permissions:** `users:create`

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "agent",
  "password": "secure-password-123"
}
```

#### Update User

```http
PUT /users/{id}
```

**Required Permissions:** `users:update`

### Blog Posts Management

#### Get All Blog Posts

```http
GET /blog-posts
```

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status (draft, published, archived)
- `category` (string): Filter by category
- `author` (string): Filter by author ID

**Response:**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post-123",
        "title": "Top 10 Neighborhoods in Austin",
        "slug": "top-10-neighborhoods-austin",
        "excerpt": "Discover the best neighborhoods...",
        "content": "# Top 10 Neighborhoods...",
        "author": "Sarah Johnson",
        "category": "Neighborhoods",
        "tags": ["austin", "neighborhoods"],
        "status": "published",
        "publishedAt": "2024-01-15T10:00:00Z",
        "createdAt": "2024-01-10T09:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 25,
      "pages": 2
    }
  }
}
```

#### Create Blog Post

```http
POST /blog-posts
```

**Required Permissions:** `blog:create`

**Request Body:**

```json
{
  "title": "New Blog Post",
  "excerpt": "Brief description of the post",
  "content": "# Markdown content here...",
  "category": "Market Analysis",
  "tags": ["market", "analysis"],
  "status": "draft",
  "featuredImage": "image-url"
}
```

#### Update Blog Post

```http
PUT /blog-posts/{id}
```

**Required Permissions:** `blog:update`

#### Delete Blog Post

```http
DELETE /blog-posts/{id}
```

**Required Permissions:** `blog:delete`

### Media Library

#### Get All Media

```http
GET /media
```

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `type` (string): Filter by type (image, document, video)
- `category` (string): Filter by category

**Response:**

```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": "media-123",
        "name": "property-image-1.jpg",
        "type": "image",
        "url": "https://cdn.example.com/images/property-1.jpg",
        "thumbnail": "https://cdn.example.com/thumbnails/property-1.jpg",
        "size": 2048576,
        "mimeType": "image/jpeg",
        "dimensions": {
          "width": 1920,
          "height": 1080
        },
        "uploadedBy": "user-123",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### Upload Media

```http
POST /media/upload
```

**Required Permissions:** `media:upload`

**Request:** Multipart form data

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "media-124",
    "name": "uploaded-file.jpg",
    "url": "https://cdn.example.com/images/uploaded-file.jpg",
    "thumbnail": "https://cdn.example.com/thumbnails/uploaded-file.jpg",
    "size": 1048576,
    "message": "File uploaded successfully"
  }
}
```

#### Delete Media

```http
DELETE /media/{id}
```

**Required Permissions:** `media:delete`

### Analytics

#### Get Analytics Data

```http
GET /analytics
```

**Query Parameters:**

- `period` (string): Time period (day, week, month, year)
- `startDate` (string): Start date (ISO format)
- `endDate` (string): End date (ISO format)
- `type` (string): Analytics type (views, leads, conversions)

**Response:**

```json
{
  "success": true,
  "data": {
    "period": "month",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31",
    "metrics": {
      "views": 15400,
      "leads": 420,
      "conversions": 88,
      "conversionRate": 5.7
    },
    "trends": {
      "views": [1200, 1350, 1400, 1500],
      "leads": [30, 35, 40, 45],
      "conversions": [5, 7, 8, 10]
    },
    "topProperties": [
      {
        "id": "prop-123",
        "title": "Downtown Condo",
        "views": 450,
        "leads": 12,
        "conversions": 3
      }
    ]
  }
}
```

### Activity Logs

#### Get Activity Logs

```http
GET /activity-logs
```

**Required Permissions:** `activity_logs:read`

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `severity` (string): Filter by severity (info, warning, error)
- `category` (string): Filter by category (user_action, security, data_change)
- `resource` (string): Filter by resource type (property, user, blog_post)
- `action` (string): Filter by action (created, updated, deleted)
- `startDate` (string): Start date (ISO format)
- `endDate` (string): End date (ISO format)

**Response:**

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log-123",
        "timestamp": "2024-01-21T10:30:00Z",
        "userId": "user-123",
        "userName": "John Doe",
        "userRole": "admin",
        "severity": "info",
        "category": "data_change",
        "resource": "property",
        "action": "created",
        "description": "Created new property: Downtown Condo",
        "resourceId": "prop-123",
        "resourceName": "Downtown Condo",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 500,
      "pages": 25
    }
  }
}
```

#### Export Activity Logs

```http
GET /activity-logs/export
```

**Required Permissions:** `activity_logs:export`

**Query Parameters:** (same as get logs)

**Response:** CSV file download

### Error Handling

All API endpoints return consistent error responses:

#### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "price",
      "issue": "Price must be a positive number"
    }
  }
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to perform this action",
    "requiredPermission": "properties:delete"
  }
}
```

#### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Property not found",
    "resourceId": "prop-999"
  }
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated users:** 1000 requests per hour
- **Admin users:** 5000 requests per hour
- **File uploads:** 100 uploads per hour per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Available Webhooks

- `property.created` - Triggered when a new property is created
- `property.updated` - Triggered when a property is updated
- `property.deleted` - Triggered when a property is deleted
- `user.created` - Triggered when a new user is created
- `blog_post.published` - Triggered when a blog post is published

### Webhook Configuration

```http
POST /webhooks
```

**Request Body:**

```json
{
  "url": "https://your-app.com/webhooks",
  "events": ["property.created", "property.updated"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload Example

```json
{
  "event": "property.created",
  "timestamp": "2024-01-21T10:30:00Z",
  "data": {
    "id": "prop-123",
    "title": "New Property",
    "price": 350000
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @realestate-cms/sdk
```

```javascript
import { CMSClient } from '@realestate-cms/sdk';

const client = new CMSClient({
  baseUrl: 'https://api.realestate-cms.com/v1',
  token: 'your-jwt-token',
});

// Get properties
const properties = await client.properties.list({
  page: 1,
  limit: 20,
  status: 'active',
});

// Create property
const newProperty = await client.properties.create({
  title: 'New Property',
  price: 350000,
  type: 'house',
});
```

### Python

```bash
pip install realestate-cms-sdk
```

```python
from realestate_cms import CMSClient

client = CMSClient(
    base_url="https://api.realestate-cms.com/v1",
    token="your-jwt-token"
)

# Get properties
properties = client.properties.list(
    page=1,
    limit=20,
    status="active"
)
```

## Testing

### Test Environment

- **Base URL:** `https://api-test.realestate-cms.com/v1`
- **Test Token:** Available in your dashboard
- **Rate Limits:** 10,000 requests per hour for testing

### Postman Collection

Download our Postman collection for easy API testing:
[Download Postman Collection](https://api.realestate-cms.com/postman-collection.json)

## Support

For API support and questions:

- **Email:** api-support@realestate-cms.com
- **Documentation:** https://docs.realestate-cms.com
- **Status Page:** https://status.realestate-cms.com
