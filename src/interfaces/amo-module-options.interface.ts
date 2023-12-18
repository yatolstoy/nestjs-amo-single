import { OAuth, OAuthCode, OAuthRefresh, Options } from '@shevernitskiy/amo';

export interface AmoConnectOptions {
  base_url: string;
  auth:
    | OAuthCode
    | (OAuth &
        Pick<OAuthRefresh, 'client_id' | 'client_secret' | 'redirect_uri'>);
  options?: Options;
}
