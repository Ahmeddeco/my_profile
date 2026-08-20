import slugify from 'slugify'

export const slugTitle = (slug: string) => slugify(slug, { lower: true, strict: true })