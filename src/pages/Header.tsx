import BubbleMenu from '../components/BubbleMenu';

interface HeaderProps {
    onMenuToggle?: (isOpen: boolean) => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
    // Custom navigation links configured for the BubbleMenu
    const navigationItems = [
        {
            label: 'Resource',
            href: '#resource',
            rotation: -6,
            hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
        },
        {
            label: 'Events',
            href: '#events',
            rotation: 6,
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
        <header className="fixed top-0 left-0 right-0 w-full z-[1001] pointer-events-none">
            <BubbleMenu
                items={navigationItems}
                onMenuClick={onMenuToggle}
                useFixedPosition={true}
                menuBg="#161b22"          // Matches dark theme layouts nicely
                menuContentColor="#f0f6fc" // Off-white contrast color
                animationEase="back.out(1.4)"
                animationDuration={0.4}
            />
        </header>
    );
}