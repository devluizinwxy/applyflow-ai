interface PasswordChecklistProps {
    password: string;
    confirmPassword?: string;
}

export function PasswordChecklist({
                                      password,
                                      confirmPassword,
                                  }: PasswordChecklistProps) {
    const validations = {
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasMinLength: password.length >= 8,
        passwordsMatch:
            confirmPassword !== undefined &&
            password === confirmPassword,
    };

    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p
                className={
                    validations.hasUppercase
                        ? "text-green-600"
                        : "text-red-500"
                }
            >
                ✓ One uppercase letter
            </p>

            <p
                className={
                    validations.hasLowercase
                        ? "text-green-600"
                        : "text-red-500"
                }
            >
                ✓ One lowercase letter
            </p>

            <p
                className={
                    validations.hasMinLength
                        ? "text-green-600"
                        : "text-red-500"
                }
            >
                ✓ Minimum 8 characters
            </p>

            {confirmPassword !== undefined && (
                <p
                    className={
                        validations.passwordsMatch
                            ? "text-green-600"
                            : "text-red-500"
                    }
                >
                    ✓ Passwords match
                </p>
            )}
        </div>
    );
}