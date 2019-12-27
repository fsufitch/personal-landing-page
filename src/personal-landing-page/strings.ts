// This file provides a utility for decoding strings only as necessary, to combat web 
// scraping of data. If you want to manually decode these strings, feel free to

interface EncodedStringData {
    wrappedString: string;
    salt: string;
}

export class StringForbidden extends Error { }

export class EncodedString {
    constructor(private b64data: string, private requireHuman: boolean) {}

    getValue(isHuman: boolean): string {
        if (!this.requireHuman || isHuman) {
            return this.decode()
        }
        throw new StringForbidden();
    }

    private decode(): string {
        const data = JSON.parse(atob(this.b64data)) as EncodedStringData;
        return data.wrappedString;
    }
}

export const Strings = {
    ResumeUrl: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiaHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL29wZW4/aWQ9MT
        Z6cGt2SGJKRjljVnA1dTU2TW5zREJJVkJrLUZ1azZyaVpMWEJockVsbmMiLCJzYWx0Ijoi
        MTIzNDUifQ==
        `, false),
    MediumUrl: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiaHR0cHM6Ly9tZWRpdW0uY29tL0Bmc3VmaXRjaCIsInNhbH
        QiOiJhV3E5TSJ9
        `, false),
    GithubUrl: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiaHR0cHM6Ly9naXRodWIuY29tL2ZzdWZpdGNoIiwic2FsdC
        I6Ikl6TkdVaWZRIn0=
        `, false),
    GithubPersonalLandingPageUrl: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiaHR0cHM6Ly9naXRodWIuY29tL2ZzdWZpdGNoL3BlcnNvbm
        FsLWxhbmRpbmctcGFnZSIsInNhbHQiOiJ5OW5hWHJvZFdJdVkifQ==
        `, false),
    ReCAPTCHASiteKey: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiNkxmZ2VNb1VBQUFBQUJQX21yT3dHaG1DdUQ5cXdVX1JzTk
        xzVURCbCIsInNhbHQiOiJBQUFBQlAxMjM0NjEifQ==
        `, false),
    PhoneNumber: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiMS01NzEtMzU0LTgwODgiLCJzYWx0IjoiSE02THk5bmFYUm
        9kIn0=
        `, true),
    EmailAddress: new EncodedString(`
        eyJ3cmFwcGVkU3RyaW5nIjoiZmlsaXAuc3VmaXRjaGlAZ21haWwuY29tIiwic2FsdCI6Im
        RpZCB5b3UgcmVhbGx5IG5lZWQgdG8gZ28gdG8gYWxsIHRoaXMgZWZmb3J0PyJ9
        `, true),
}