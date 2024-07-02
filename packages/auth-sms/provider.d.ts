export declare const SmsProvider: import("next-auth/providers/credentials").CredentialsConfig<{
    phone: {
        type: string;
        required: boolean;
    };
    code: {
        type: string;
        required: boolean;
    };
}>;
