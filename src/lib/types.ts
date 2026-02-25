export interface GadgetDownload {
  type: 'local' | 'external'
  apkPath?: string
  apkUrl?: string
  version?: string
  sha256?: string
}

export interface LocalizedText {
  en: string
  de: string
}

export interface GadgetData {
  id: string
  title: string
  subtitle: LocalizedText
  status: 'stable' | 'wip'
  tags: string[]
  shortDescription: LocalizedText
  longDescription: LocalizedText
  features: LocalizedText[]
  howToUse: LocalizedText[]
  youtube?: string
  download: GadgetDownload
  credits?: LocalizedText
  disclaimerNotes?: LocalizedText
  permissions?: string[]
}

// Resolved gadget with current language strings
export interface Gadget {
  id: string
  title: string
  subtitle: string
  status: 'stable' | 'wip'
  tags: string[]
  shortDescription: string
  longDescription: string
  features: string[]
  howToUse: string[]
  youtube?: string
  download: GadgetDownload
  credits?: string
  disclaimerNotes?: string
  permissions?: string[]
}
