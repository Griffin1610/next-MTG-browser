import NavigationBar from './components/NavigationBar';
import './globals.css';

<<<<<<< HEAD
export default function RootLayout({ children }: { children: React.ReactNode}) {
=======
export default function RootLayout({ children } : { children: React.ReactNode;}) {

    const MTGLogo = () => {
        return (
        <div className="w-40">
            <img src="/mtg-logo.png" alt="MTG Logo"/>
        </div>
        )
    }
>>>>>>> 7583bd7367c61dfb649ad24a3d4bddd93603d48c
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
