import { useAuth, useUser } from "@clerk/clerk-react";

export default function ClerkTest() {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();

    if (!isLoaded) {
        return (
            <div style={{ padding: 12, background: "#fff3cd", borderRadius: 8 }}>
                ⏳ Clerk loading...
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div style={{ padding: 12, background: "#f8d7da", borderRadius: 8 }}>
                ❌ Not signed in
            </div>
        );
    }

    return (
        <div style={{ padding: 12, background: "#d1e7dd", borderRadius: 8 }}>
            ✅ Clerk is working
            <br />
            <strong>User:</strong> {user.primaryEmailAddress?.emailAddress}
        </div>
    );
}
