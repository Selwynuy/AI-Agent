import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select, SelectOption } from '../ui/Select';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';
import { ActionGuard } from './PermissionGuard';
import RichTextEditor from './RichTextEditor';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  CalendarIcon,
  UserIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  readTime: number;
}

interface BlogPostManagerProps {
  userRole: string;
}

const BlogPostManager: React.FC<BlogPostManagerProps> = ({ userRole }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Top 10 Neighborhoods in Austin for Families',
      slug: 'top-10-neighborhoods-austin-families',
      excerpt: 'Discover the best family-friendly neighborhoods in Austin with great schools, parks, and amenities.',
      content: `# Top 10 Neighborhoods in Austin for Families

Austin is known for its vibrant culture and family-friendly atmosphere. Here are the top 10 neighborhoods that families love:

## 1. Circle C Ranch
- **Great schools** and parks
- **Family-oriented** community
- **Safe environment** for children

## 2. Mueller
- **Walkable** and bike-friendly
- **Community events** year-round
- **Excellent amenities**

*More neighborhoods coming soon...*`,
      author: 'Sarah Johnson',
      category: 'Neighborhoods',
      tags: ['families', 'schools', 'austin', 'neighborhoods'],
      status: 'published',
      publishedAt: '2024-01-15',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      readTime: 5
    },
    {
      id: '2',
      title: 'Investment Properties: What to Look For',
      slug: 'investment-properties-what-to-look-for',
      excerpt: 'Essential tips for identifying profitable investment properties in the current market.',
      content: `# Investment Properties: What to Look For

When investing in real estate, consider these key factors:

## Location Analysis
- **Market trends** and growth potential
- **Rental demand** in the area
- **Property appreciation** history

## Financial Considerations
- **Cash flow** projections
- **ROI calculations**
- **Maintenance costs**

*Detailed analysis continues...*`,
      author: 'Mike Chen',
      category: 'Investment',
      tags: ['investment', 'roi', 'cash-flow', 'market-analysis'],
      status: 'draft',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      readTime: 8
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    status: 'draft' as const,
    featuredImage: ''
  });

  const categories = [
    'Neighborhoods',
    'Investment',
    'Market Trends',
    'Home Improvement',
    'Financing',
    'Lifestyle'
  ];

  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleAddPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      tags: '',
      status: 'draft',
      featuredImage: ''
    });
    setShowModal(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      status: post.status,
      featuredImage: post.featuredImage || ''
    });
    setShowModal(true);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
    }
  };

  const handleSavePost = () => {
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (editingPost) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              ...formData,
              tags,
              slug,
              updatedAt: new Date().toISOString(),
              publishedAt: formData.status === 'published' && !post.publishedAt 
                ? new Date().toISOString() 
                : post.publishedAt
            }
          : post
      ));
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        tags,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined,
        readTime: Math.ceil(formData.content.split(' ').length / 200) // Rough estimate
      };
      setBlogPosts([newPost, ...blogPosts]);
    }

    setShowModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return '✓';
      case 'draft': return '📝';
      case 'archived': return '📁';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
          <p className="text-gray-600">Manage your blog content and articles</p>
        </div>
        <ActionGuard role={userRole} action="create" resource="content">
          <Button onClick={handleAddPost} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Add Blog Post
          </Button>
        </ActionGuard>
      </div>

      {/* Blog Posts List */}
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                    {getStatusIcon(post.status)} {post.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <TagIcon className="h-4 w-4" />
                    {post.category}
                  </div>
                  <div className="flex items-center gap-1">
                    <EyeIcon className="h-4 w-4" />
                    {post.readTime} min read
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ActionGuard role={userRole} action="edit" resource="content">
                  <Button
                    variant="text"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </ActionGuard>
                <ActionGuard role={userRole} action="delete" resource="content">
                  <Button
                    variant="text"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </ActionGuard>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Enter author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <Input
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the blog post"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select value={formData.category} onChange={(value) => setFormData({ ...formData, category: value || '' })}>
                  <SelectOption value="">Select category</SelectOption>
                  {categories.map((category) => (
                    <SelectOption key={category} value={category}>
                      {category}
                    </SelectOption>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select value={formData.status} onChange={(value) => setFormData({ ...formData, status: (value as any) || 'draft' })}>
                  {statuses.map((status) => (
                    <SelectOption key={status.value} value={status.value}>
                      {status.label}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Enter tags separated by commas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <Input
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your blog post content using markdown..."
                label="Content"
                rows={12}
                showPreview={true}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outlined" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePost}>
              {editingPost ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogPostManager; 