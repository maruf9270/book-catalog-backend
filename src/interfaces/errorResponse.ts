import { IGenericErrorMessages } from "./errorMessages";

export type IGenericErrorResponse = {
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessages[];
  stack?: string;
  statusCode?: number;
};
