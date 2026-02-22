import { createClient } from '@sanity/client'
import { env } from '$env/dynamic/private'

const projectId = env.PRIVATE_SANITY_PROJECT_ID ?? ''
const dataset = env.PRIVATE_SANITY_DATASET ?? 'production'

/**
 * Sanity client for fetching content. Use in load functions or components.
 * Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in your environment.
 */
export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion: '2024-01-01',
	useCdn: true
})
