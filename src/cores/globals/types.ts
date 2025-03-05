export type DeepOmit<T, K extends string> = K extends `${infer P}.${infer R}`
  ? { [Key in keyof T]: Key extends P ? DeepOmit<T[Key], R> : T[Key] }
  : Omit<T, K>;
