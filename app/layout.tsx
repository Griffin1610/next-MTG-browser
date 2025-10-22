import { Analytics } from "@vercel/analytics/next"
import NavigationBar from './components/NavigationBar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
    <html lang="en">
        <body className="bg-stone-900">
            <main>
                <NavigationBar></NavigationBar>
                {children}
                <Analytics/>
            </main>
        </body>
    </html>
  );
}
