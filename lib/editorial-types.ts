export type ArticleStatus = 'draft' | 'published' | 'scheduled' | 'archived'
export type AdminRole = 'admin' | 'super_admin'
export type SubmissionStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'published'

export type EditorialArticle = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  categoryId: string | null
  authorId: string | null
  featuredImage: string | null
  featuredImageAlt: string | null
  status: ArticleStatus
  publishedAt: string | null
  scheduledFor: string | null
  readingTime: number
  seoTitle: string | null
  metaDescription: string | null
  isFeatured: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export type CloudinaryMedia = { publicId: string; secureUrl: string; resourceType: 'image' | 'video' | 'raw'; format?: string; width?: number; height?: number; duration?: number }
export type StorySubmission = { id?: string; fullName: string; email: string; phone?: string; relationshipToFuto?: string; title: string; category: string; summary: string; content: string; location?: string; eventDate?: string; media: CloudinaryMedia[]; status?: SubmissionStatus; submittedAt?: string }
