export const siteConfig = {
  name: 'FUTO Central',
  description: 'Independent news and information for the FUTO community.',
  contactEmail: 'hello@futocentral.name.ng',
  privacyEmail: 'privacy@futocentral.name.ng',
  editorialEmail: 'editorial@futocentral.name.ng',
  socialLinks: { Facebook: '#', X: '#', Instagram: '#', WhatsApp: '#', YouTube: '#' },
} as const

export const submissionCategories = ['News', 'Campus News', 'Academics', 'Student Life', 'Events', 'Sports', 'Technology & Innovation', 'Opportunities', 'Community', 'Other'] as const
export const relationships = ['Student', 'Staff', 'Alumni', 'Student Organization', 'Department/Unit', 'University Community', 'Other'] as const
export type StorySubmission = { fullName: string; email: string; phone?: string; relationshipToFuto: string; title: string; category: string; summary: string; content: string; location?: string; eventDate?: string; media: Array<{ publicId: string; secureUrl: string; resourceType: string; format: string }> }
export type ContactMessage = { name: string; email: string; subject: string; message: string }
export type MediaAsset = { publicId: string; secureUrl: string; resourceType: 'image' | 'video'; format: string; width?: number; height?: number; duration?: number }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function validateContact(input: Partial<ContactMessage>) { const errors: Record<string,string> = {}; if (!input.name?.trim()) errors.name='Please enter your name.'; if (!input.email || !emailPattern.test(input.email)) errors.email='Please enter a valid email address.'; if (!input.subject?.trim()) errors.subject='Please enter a subject.'; if (!input.message?.trim()) errors.message='Please enter your message.'; return errors }
export function validateSubmission(input: Partial<StorySubmission>) { const errors: Record<string,string> = {}; if (!input.fullName?.trim()) errors.fullName='Please enter your name.'; if (!input.email || !emailPattern.test(input.email)) errors.email='Please enter a valid email address.'; if (!input.title?.trim()) errors.title='Please enter a story title.'; if (!input.category) errors.category='Please choose a category.'; if (!input.summary?.trim()) errors.summary='Please add a brief summary.'; if (!input.content?.trim()) errors.content='Please provide story details.'; return errors }

export const legalDocuments = {
  privacy: { title: 'Privacy Policy', description: 'How FUTO Central handles information shared through this website.', updated: '26 August 2026' },
  terms: { title: 'Terms of Use', description: 'The rules and conditions for using FUTO Central.', updated: '26 August 2026' },
  editorial: { title: 'FUTO Central Editorial Policy', description: 'The principles we follow when reporting, reviewing and publishing stories.', updated: '26 August 2026' },
} as const
