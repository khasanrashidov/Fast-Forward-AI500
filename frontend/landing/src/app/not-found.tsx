import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                <Link
                    href="/"
                    className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all inline-block"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
