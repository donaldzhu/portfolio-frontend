export interface Social {
  displayText: string
  link: string
  copyOnClick: boolean
}

export interface Image {
  asset: {
    url: string
  }
}

export interface MuxVideo {
  asset: {
    playbackId: string
  }
}

type Media = {
  image: Image
  video: null
} | {
  image: null
  video: MuxVideo
}

interface Settings {
  name: string
  socials: Social[]
  oldSiteThumbnail: Image
  newSiteThumbnail: Image
  mediaContents: Media[]
  instagram: string
}

interface RichHeading {
  displayText: string
  link?: string
  date?: string
}

interface View {
  heading1: string
  heading2: string
  heading3: RichHeading
  heading4: RichHeading
}

export enum ViewType {
  BIO = "bio",
  LANDING = "landing",
  NEW = "new",
  OLD = "old",
}

export interface SanityData {
  settings: Settings
  views: Record<ViewType, View>
}
