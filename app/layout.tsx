import { Analytics } from "@vercel/analytics/next"
import NavigationBar from './components/NavigationBar';
import Providers from './components/Providers';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
    <html lang="en">
        <body className="bg-stone-900 min-h-screen">
            <Providers>
                <main>
                    <NavigationBar></NavigationBar>
                    {children}
                    <Analytics/>
                </main>
            </Providers>
        </body>
    </html>
  );
}
