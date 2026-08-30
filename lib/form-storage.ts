import { withDatabase } from '@/lib/db'
import type { ContactMessage, StorySubmission } from '@/lib/config/site'

export async function createStorySubmission(payload: StorySubmission) {
  return withDatabase(async (db) => {
    const result = await db.query(`INSERT INTO story_submissions (full_name,email,phone,relationship_to_futo,title,category,summary,content,location,event_date,media) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb) RETURNING id`, [payload.fullName.trim(), payload.email.trim().toLowerCase(), payload.phone?.trim() || null, payload.relationshipToFuto || null, payload.title.trim(), payload.category, payload.summary.trim(), payload.content.trim(), payload.location?.trim() || null, payload.eventDate || null, JSON.stringify(payload.media || [])])
    return result.rows[0]
  })
}

export async function sendContactMessage(payload: ContactMessage) {
  return withDatabase(async (db) => {
    const result = await db.query(`INSERT INTO contact_submissions (name,email,subject,message) VALUES ($1,$2,$3,$4) RETURNING id`, [payload.name.trim(), payload.email.trim().toLowerCase(), payload.subject.trim(), payload.message.trim()])
    return result.rows[0]
  })
}
