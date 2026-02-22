import { sanityClient } from '$lib/sanity'
import type { SanityData } from '$lib/types'

export const load = async () => {
	try {
		const data = await sanityClient.fetch(`{
			"settings": *[_type == "siteSettings"][0]{
				name,
				socials[]{
					displayText,
					link,
					copyOnClick
				},
				oldSiteThumbnail {
					asset-> {
						url
					}
				},
				newSiteThumbnail {
					asset-> {
						url
					}
				},
				instagram,
				mediaContents[]{
					image {
						asset-> {
							url,
						}
					},
					video {
						asset-> {
							playbackId
						}
					}
				}
			},
			"views": *[_type == "homePage"]{
				bio->,
				landing->,
				new->,
				old->
			}[0]
		}`)
		return data satisfies SanityData
	} catch (e) {
		console.error('Sanity fetch error:', e)
		return {} as SanityData
	}
}
