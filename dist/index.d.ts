export declare type IPNRequestBody = {
    [key: string]: string | number;
};
export declare function createValidationString(data: IPNRequestBody, secretKey: string): string;
export declare function validateIPN(data: IPNRequestBody, secretKey: string): boolean;
export default validateIPN;
