import React, { useEffect } from 'react';
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

/**
 * Login Component
 * Uses Clerk's pre-built SignIn component
 */
const Login = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex justify-center">
                <SignIn signUpUrl="/sign-up" />
            </div>
        </div>
    );
};

export default Login;
