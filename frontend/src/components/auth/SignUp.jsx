import React from 'react';
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex justify-center">
                <SignUp signInUrl="/login" />
            </div>
        </div>
    );
};

export default SignUpPage;
