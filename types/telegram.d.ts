interface TelegramWebApp {
  ready: () => void
  expand: () => void
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      photo_url?: string
      language_code?: string
    }
    auth_date?: number
    hash?: string
  }
  showAlert: (message: string) => void
  showPopup: (params: {
    title: string
    message: string
    buttons: Array<{ text: string; type: string }>
  }) => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
  }
  BackButton: {
    isVisible: boolean
    onClick: (callback: () => void) => void
    show: () => void
    hide: () => void
  }
  HapticFeedback: {
    impactOccurred: (style: string) => void
    notificationOccurred: (type: string) => void
    selectionChanged: () => void
  }
  close: () => void
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp
  }
}
