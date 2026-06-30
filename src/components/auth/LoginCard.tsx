import Link from "next/link";
import Image from "next/image";

import { AuthForm } from "./AuthForm";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function LoginCard() {
    return (
        <div className="w-full max-w-md bg-transparent shadow-none border-none">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center">
                    <Image
                        src="/images/logo.png"
                        alt="ApplyFlow AI"
                        width={80}
                        height={80}
                    />
                </div>

                <CardTitle className="text-lg font-bold text-slate-900">
                    Welcome Back to ApplyFlow AI
                </CardTitle>

                <CardDescription className="text-slate-500">
                    Log in to automate your job applications
                </CardDescription>

            </CardHeader>

            <CardContent>
                <AuthForm type="login" />
            </CardContent>

            <CardFooter className="justify-center">
                <p className="text-sm text-slate-500 dark:text-slate-300">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-sky-500 hover:text-sky-600"
                    >
                        Create one.
                    </Link>
                </p>
            </CardFooter>
        </div>
    );
}