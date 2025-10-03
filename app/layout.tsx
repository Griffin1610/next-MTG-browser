import NavigationBar from './components/NavigationBar';
import './globals.css'

export default function RootLayout({ children } : { children: React.ReactNode;}) {

    const MTGLogo = () => {
        return (
        <div className="w-40">
            <img src="/mtg-logo.png" alt="MTG Logo"/>
        </div>
        )
    }
    return (
    <html lang="en">
        <body className="bg-stone-900">
            <main>
                <NavigationBar></NavigationBar>
                {children}
            </main>
        </body>
    </html>
  );
}
