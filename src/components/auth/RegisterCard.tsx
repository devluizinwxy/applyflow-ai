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

export function RegisterCard() {
    return (
        <Card className="w-full max-w-xs rounded-1xl border-0 bg-white shadow-1xl">
            <CardHeader className="space-y-0 text-center">

                <div className="flex justify-center mb-2">
                <Image
                    src="/images/logo.png"
                    alt="ApplyFlow AI"
                    width={60}
                    height={60}
                />
            </div>
                <CardTitle className="text-1g font-bold text-slate-900">
                    Create Your ApplyFlow AI Account
                </CardTitle>

                <CardDescription className="text-slate-500">
                    Start automating your job applications
                </CardDescription>
            </CardHeader>

            <CardContent>
                <AuthForm type="register" />
            </CardContent>

            <CardFooter className="justify-center">
                <p className="text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-sky-500 hover:text-sky-600"
                    >
                        Log in here.
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}