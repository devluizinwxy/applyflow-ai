import Link from "next/link";
import Image from "next/image";

import { AuthForm } from "./AuthForm";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function RegisterCard() {
    return (
        <div className="w-full max-w-sm bg-transparent shadow-none border-none">
            <CardHeader className="space-y-0 text-center">
                <div className="flex justify-center mb-2">
                    <Image
                        src="/images/logo.PNG"
                        alt="ApplyFlow AI"
                        width={80}
                        height={80}
                        priority
                    />
                </div>
                
                <CardTitle className="text-lg font-bold text-slate-900">
                    Create Your ApplyFlow AI Account
                </CardTitle>

                <CardDescription className="text-slate-500">
                    Start automating your job applications
                </CardDescription>
            </CardHeader>

            <CardContent>
                <AuthForm type="register" />
            </CardContent>
        </div>
    );
}