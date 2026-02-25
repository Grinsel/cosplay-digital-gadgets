export interface GadgetDownload {
  type: 'local' | 'external'
  apkPath?: string
  apkUrl?: string
  version?: string
  sha256?: string
}

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
