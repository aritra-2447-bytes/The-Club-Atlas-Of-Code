import BubbleMenu from '../components/BubbleMenu';

interface HeaderProps {
    onMenuToggle?: (isOpen: boolean) => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
    // Custom navigation links configured for the BubbleMenu
    const navigationItems = [
        {
            label: 'Resources',
            href: '#resources',
            rotation: -6,
            hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
        },
        /* {
            label: 'Events',
            href: '#events',
            rotation: 6,
            hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
        }, */
        {
            label: 'about',
            href: '#about',
            rotation: 4,
            hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
        },
        {
            label: 'contact',
            href: '#contact',
            rotation: 4,
            hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
        }
    ];

    return (
        /* Changed 'fixed' to 'absolute' so the layout flows with page scrolling */
        <header className="absolute top-0 left-0 right-0 w-full z-[1001] pointer-events-none flex justify-between items-start px-6 sm:px-8 pt-6">
            {/* Top Left Text Container with added left padding */}


            <BubbleMenu
                items={navigationItems}
                onMenuClick={onMenuToggle}
                useFixedPosition={true}
                menuBg="#161b22"
                menuContentColor="#f0f6fc"
                animationEase="back.out(1.4)"
                animationDuration={0.4}
            />
        </header>
    );
}