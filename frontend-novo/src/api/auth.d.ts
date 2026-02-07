export type AuthMe = { role?: string };
export type AuthLogin = { role: string; token: string | null };

export declare const AuthAPI: {
  me(): Promise<AuthMe>;
  login(senha: string): Promise<AuthLogin>;
  logout(): void;
};
