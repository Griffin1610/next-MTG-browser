import NavigationBar from './components/NavigationBar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
    <html lang="en">
        <body className="bg-stone-900">
            <main>
                <NavigationBar></NavigationBar>
                {children}
            </main>
            <footer className="fixed bottom-0 right-0 bg-stone-950 text-stone-200 text-right p-2">
                <p className="text-xs">A Project by Griffin Polly. 2025</p>
            </footer>
        </body>
    </html>
  );
}
