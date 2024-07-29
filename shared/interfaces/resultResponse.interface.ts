

export enum ECondition {
  ERROR = 'error',
  SUCCESS = 'success',

}

export interface AutorizationResult {
    publicId: string;
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    condition: ECondition,
  }


