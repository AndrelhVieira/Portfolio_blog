declare interface Grecaptcha {
  ready: (callback: () => void) => void
  execute: (secret: string, config: any) => Promise<string>
}

declare const grecaptcha: Grecaptcha
