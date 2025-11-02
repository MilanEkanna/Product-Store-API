// This is our landing page public facing homepage
import Navbar from '../components/Navbar';

export default function LandingPage() {
    return (

        // For our background image
        <div className="min-h-screen flex flex-col relative overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-80"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500')`,
                }}
                aria-hidden="true"
            />

            {/* //additional layer Image alone might be too bright; dark overlay ensures readability without needing complex CSS filters. */}

            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />
             {/* Here the above code ensures all content appears above the background */}


            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar isLanding={true} />
                {/* // Pass isLanding as a prop  */}

                <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                        Discover Amazing Products
                    </h2>
                    <p className="text-base sm:text-lg text-blue-100 max-w-2xl mb-8 px-2">
                        Browse our curated collection of high-quality items. Sign up or log in to get started!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a
                            href="/login"
                            className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-md hover:bg-white/20 transition"
                        >
                            Log In
                        </a>
                        <a
                            href="/signup"
                            className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition shadow-lg"
                        >
                            Create Account
                        </a>
                    </div>
                </main>

                <footer className="w-full py-3 text-center text-sm text-blue-100">
                    © {new Date().getFullYear()} ShopEasy. All rights reserved.
                </footer>
            </div>
        </div>
    );
}