import { useEffect } from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
    const { isAuthenticated, isLoaded } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Where the user originally wanted to go
    const from = location.state?.from || "/";

    useEffect(() => {
        if (!isLoaded) return;

        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isLoaded, isAuthenticated, from, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex justify-center">
                <SignIn signUpUrl="/sign-up" />
            </div>
        </div>
    );
};

export default Login;
