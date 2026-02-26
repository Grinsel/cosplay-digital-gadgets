export type Language = 'en' | 'de'

export interface Translations {
  // Navigation
  nav: {
    allGadgets: string
    ideas: string
    support: string
    disclaimer: string
  }

  // Landing Page
  landing: {
    heroTitle1: string
    heroTitle2: string
    heroSubtitle: string
    ctaAllGadgets: string
    ctaSupport: string
    featuresTitle: string
    featureVideos: string
    featureVideosDesc: string
    featureDownload: string
    featureDownloadDesc: string
    featureGuides: string
    featureGuidesDesc: string
    featureInfo: string
    featureInfoDesc: string
    featuredTitle: string
    showAll: string
    whatIsTitle: string
    whatIsIt: string
    whatIsItDesc: string
    whatItDoes: string
    whatItDoesDesc: string
    whatFor: string
    whatForDesc: string
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
  }

  // Gadgets Page
  gadgets: {
    title: string
    countOf: string
    searchPlaceholder: string
    tagsLabel: string
    statusLabel: string
    sortLabel: string
    all: string
    stable: string
    wip: string
    sortAZ: string
    sortStatus: string
    clearFilters: string
    noResults: string
    showDetails: string
    version: string
  }

  // Gadget Detail Page
  gadgetDetail: {
    backToOverview: string
    download: string
    downloadApk: string
    downloadComingSoon: string
    description: string
    features: string
    howToUse: string
    permissions: string
    installation: string
    installStep1: string
    installStep2: string
    installStep3: string
    installStep4: string
    notes: string
    videoComingSoon: string
  }

  // Support Page
  support: {
    title: string
    intro: string
    freeNote: string
    optionsTitle: string
    kofiDesc: string
    bmcDesc: string
    patreonDesc: string
    paypalDesc: string
    linkComingSoon: string
    supportLink: string
    otherWaysTitle: string
    shareApps: string
    showPhotos: string
    giveFeedback: string
    reportBugs: string
    anonymousNote: string
  }

  // Disclaimer Page
  disclaimer: {
    title: string
    section1Title: string
    section1Text: string
    section2Title: string
    section2Text: string
    section3Title: string
    section3Text: string
    section4Title: string
    section4Text: string
    section5Title: string
    section5Text: string
    section6Title: string
    section6List: string[]
    legalNote: string
  }

  // Impressum Page
  impressum: {
    title: string
    placeholder: string
    section1Title: string
    nameLabel: string
    addressLabel: string
    contactLabel: string
    section2Title: string
    noteTitle: string
    noteText: string
    fillInTitle: string
    fillInText1: string
    fillInText2: string
  }

  // Privacy Page
  privacy: {
    title: string
    placeholder: string
    section1Title: string
    section1Text: string
    section2Title: string
    section2Text: string
    section2Note: string
    section3Title: string
    section3Text: string
    section3List: string[]
    section3Note: string
    section4Title: string
    section4Text: string
    section5Title: string
    section5Text: string
    section6Title: string
    section6Text: string
    legalNote: string
  }

  // Footer
  footer: {
    tagline: string
    links: string
    legal: string
    impressum: string
    privacy: string
    copyright: string
  }

  // 404 Not Found
  notFound: {
    title: string
    description: string
    homeButton: string
    gadgetsButton: string
  }

  // Comments
  comments: {
    ideasTitle: string
    feedbackTitle: string
    placeholder: string
    ideaPlaceholder: string
    bugPlaceholder: string
    replyPlaceholder: string
    nicknamePlaceholder: string
    submit: string
    submitting: string
    wait: string
    cancel: string
    reply: string
    cancelReply: string
    loading: string
    retry: string
    noComments: string
    noIdeas: string
    errorEmpty: string
    errorTooShort: string
    errorRateLimit: string
    errorGeneric: string
    errorLoading: string
  }

  // Ideas Page
  ideas: {
    title: string
    subtitle: string
    intro: string
  }
}
