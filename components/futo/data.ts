export type Article = {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  publishedAt: string
  date: string
  readingTime: number
  readTime: string
  author: string
  image: string
  alt: string
  tags: string[]
  featured?: boolean
  trending?: boolean
  views: number
  categoryId?: string
  authorId?: string
  status?: string
  seoTitle?: string
  metaDescription?: string
}

export const images = {
  hero: 'https://res.cloudinary.com/afogmyot/image/upload/v1787838825/otakunaija/tpc8d59drqhvunc09zcu.jpg',
  students: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85',
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85',
  campus: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=85',
  lecture: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85',
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85',
}

const makeArticle = (id: string, title: string, category: string, excerpt: string, publishedAt: string, image: string, alt: string, tags: string[], readingTime = 4, author = 'FUTO Central Desk', featured = false, trending = false, views = 1000): Article => ({ id, slug: id, title, category, excerpt, publishedAt, date: new Date(`${publishedAt}T12:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), readingTime, readTime: `${readingTime} min read`, author, image, alt, tags, featured, trending, views })

export const articles: Article[] = [
  makeArticle('futo-unveils-new-developments-campus-life', 'FUTO unveils new developments set to transform campus life', 'Campus News', 'A closer look at the ideas, places and people shaping what it means to learn, live and make an impact at FUTO.', '2026-08-26', images.hero, 'University campus building framed by green trees', ['FUTO', 'Campus'], 5, 'FUTO Central Desk', true, true, 5400),
  makeArticle('futo-announces-new-academic-session-updates', 'FUTO Announces New Academic Session Updates', 'Campus News', 'A clear guide to the dates, notices and changes students should keep in view as the new session begins.', '2026-08-25', images.campus, 'FUTO campus buildings surrounded by greenery', ['FUTO', 'Academic Session'], 4, 'FUTO Central Desk', true, true, 4900),
  makeArticle('researchers-sustainable-engineering', 'Researchers Explore New Frontiers in Sustainable Engineering', 'Academics', 'Inside the ideas and experiments helping FUTO students solve practical problems with local impact.', '2026-08-23', images.lab, 'Students working together in a university laboratory', ['Research', 'Engineering'], 6, 'Adaeze Nwosu', true, false, 3100),
  makeArticle('students-campus-activities', 'Students Prepare for a New Season of Campus Activities', 'Student Life', 'Clubs, communities and student leaders share what they are planning for the weeks ahead.', '2026-08-21', images.students, 'University students walking together outdoors', ['Students', 'Campus Life'], 3, 'FUTO Central Desk', false, true, 4200),
  makeArticle('futo-engineering-practical-innovations', 'FUTO Engineering Students Showcase Practical Innovations', 'Technology & Innovation', 'From smarter systems to thoughtful prototypes, these student projects begin with everyday observations.', '2026-08-19', images.tech, 'Close view of a technology circuit board', ['Engineering', 'Innovation'], 5, 'Chinedu Okoro', true, true, 5300),
  makeArticle('newly-admitted-students-guide', 'Important Information for Newly Admitted Students', 'Opportunities', 'A practical starting point for finding your way around campus, your department and your first semester.', '2026-08-17', images.lecture, 'Students seated in a bright university lecture room', ['Admissions', 'Students'], 4, 'FUTO Central Desk', false, false, 2800),
  makeArticle('futo-athletes-competition', 'FUTO Athletes Record Strong Performance at Competition', 'Sports', 'A look at the teamwork, preparation and determination behind a memorable campus sporting outing.', '2026-08-15', images.sports, 'Athlete running on an outdoor track', ['Sports', 'Students'], 3, 'FUTO Central Desk', false, true, 3900),
  makeArticle('student-research-useful-innovation', 'How Student Research Becomes Useful Innovation', 'Technology & Innovation', 'The journey from a question in the classroom to a prototype with practical promise.', '2026-08-12', images.tech, 'Technology components arranged on a workbench', ['Research', 'Innovation'], 5, 'FUTO Central Desk', false, false, 2400),
  makeArticle('futo-community-campus-initiative', 'University Community Welcomes a New Campus Initiative', 'Community', 'A community-focused look at how shared ideas can improve everyday university life.', '2026-08-10', images.campus, 'University walkway with trees and campus buildings', ['Community', 'Campus'], 4),
  makeArticle('student-organizations-programs', 'Student Organizations Announce Upcoming Programs', 'Student Life', 'What clubs and student communities are putting together for the new academic season.', '2026-08-08', images.students, 'Students talking together on campus', ['Student Life', 'Events'], 3),
  makeArticle('futo-department-academic-initiative', 'FUTO Department Announces a New Academic Initiative', 'Academics', 'A demo newsroom report on learning, collaboration and the work happening within departments.', '2026-08-05', images.lecture, 'Students participating in a lecture', ['Academics', 'Departments'], 4),
  makeArticle('scholarship-opportunity-futo-students', 'Scholarship Opportunity Available to FUTO Students', 'Opportunities', 'A concise guide to a demo opportunity and the details prospective applicants should review.', '2026-08-02', images.students, 'Students studying together at a table', ['Scholarship', 'Opportunities'], 3),
  makeArticle('futo-technology-competition', 'FUTO Students Participate in Technology Competition', 'Technology & Innovation', 'Student teams bring practical thinking and collaboration to a technology-focused challenge.', '2026-07-29', images.tech, 'Electronic circuit board close-up', ['Technology', 'Competition'], 5),
  makeArticle('upcoming-campus-activities-guide', 'What Students Need to Know About Upcoming Campus Activities', 'Events', 'A useful preview of the kinds of programs and gatherings students can look forward to.', '2026-07-26', images.hero, 'Campus building entrance', ['Events', 'Campus Life'], 4),
  makeArticle('futo-research-innovation-highlight', 'FUTO Researchers Highlight New Innovation', 'Academics', 'A demo feature on research questions, practical tools and the people behind new ideas.', '2026-07-22', images.lab, 'Researcher working with laboratory equipment', ['Research', 'Innovation'], 6),
  makeArticle('futo-community-outstanding-achievement', 'FUTO Community Recognizes Outstanding Achievement', 'Community', 'A community story about the everyday effort behind meaningful achievement.', '2026-07-18', images.campus, 'People gathered outside a university building', ['Achievement', 'Community'], 3),
  makeArticle('new-internship-opportunity-students', 'New Internship Opportunity Available for Students', 'Opportunities', 'A demo listing for students exploring experience-building pathways beyond the classroom.', '2026-07-14', images.lecture, 'Students collaborating in a classroom', ['Internship', 'Career'], 4),
  makeArticle('futo-campus-sports-festival', 'Students Prepare for the FUTO Campus Sports Festival', 'Sports', 'Teams, supporters and student organizers get ready for a season of friendly competition.', '2026-07-10', images.sports, 'Runner on a university track', ['Sports', 'Events'], 3),
]

export const latestNews = articles
export const featuredStories = articles.filter((article) => article.featured).slice(0, 3)
export const campusStories = articles.filter((article) => ['Campus News', 'Student Life'].includes(article.category)).slice(0, 3)
export const innovationStories = articles.filter((article) => ['Academics', 'Technology & Innovation'].includes(article.category)).slice(0, 3)
export const mostRead = [...articles].sort((a, b) => b.views - a.views).slice(0, 5).map((article) => article.title)
export const events = [{ day: '29', month: 'AUG', title: 'Student Innovation Showcase', location: 'FUTO Main Auditorium', time: '10:00 AM', category: 'Innovation' }, { day: '03', month: 'SEP', title: 'Freshers Community Welcome', location: 'Convocation Arena', time: '2:00 PM', category: 'Campus Life' }, { day: '12', month: 'SEP', title: 'Inter-Faculty Sports Festival', location: 'FUTO Sports Complex', time: '9:00 AM', category: 'Sports' }]
export const opportunities = [{ type: 'Scholarship', title: 'Future Builders Scholarship', deadline: 'Deadline · 14 Sep', text: 'Support for students building practical solutions in technology, engineering and community development.' }, { type: 'Internship', title: 'Industry Placement Guide', deadline: 'Open applications', text: 'Explore placement pathways and prepare for meaningful work experience beyond the classroom.' }, { type: 'Competition', title: 'Campus Ideas Challenge', deadline: 'Deadline · 30 Sep', text: 'Bring a useful idea, find your team and compete for resources to take it further.' }]

export function getArticlesByCategory(category?: string) { return category && category !== 'All' ? articles.filter((article) => article.category.toLowerCase() === category.toLowerCase() || (category.toLowerCase() === 'campus' && article.category === 'Campus News') || (category.toLowerCase() === 'technology' && article.category === 'Technology & Innovation')) : articles }
export function searchArticles(query: string, source = articles) { const q = query.trim().toLowerCase(); return q ? source.filter((article) => [article.title, article.excerpt, article.category, article.author, ...article.tags].join(' ').toLowerCase().includes(q)) : source }
export function getArticleBySlug(slug: string) { return articles.find((article) => article.slug === slug) }
export function getLatestArticles(source = articles) { return [...source].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)) }
export function getFeaturedArticles() { return articles.filter((article) => article.featured) }
export function getMostReadArticles() { return [...articles].sort((a, b) => b.views - a.views).slice(0, 5) }
export const categories = ['All', 'Campus News', 'Academics', 'Student Life', 'Events', 'Sports', 'Technology & Innovation', 'Opportunities', 'Community']
export const breakingNews = 'FUTO announces important updates for students ahead of the new academic session.'

export function getRelatedArticles(article: Article, limit = 3) { return getLatestArticles(articles.filter((item) => item.id !== article.id && (item.category === article.category || item.tags.some((tag) => article.tags.includes(tag))))).slice(0, limit) }
export function getTrendingArticles(limit = 5) { return [...articles].sort((a, b) => b.views - a.views).slice(0, limit) }

export type { Article as NewsArticle }
