import React, { useEffect, useRef } from 'react';

interface PacmanBackgroundProps {
    gap: number;         // Must match the gap of your DotGrid
    dotSize: number;     // Must match the dotSize of your DotGrid
    baseColor: string;   // The background dot color to erase/hide
}

export const PacmanBackground: React.FC<PacmanBackgroundProps> = ({ gap, dotSize, baseColor }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Pac-Man Configuration & State
        const pacman = {
            x: -50,
            y: 0,
            radius: 15,
            speed: 2.5,
            mouthAngle: 0.2,
            mouthClosing: false,
            currentGridY: 3, // Which horizontal row of dots to travel on
        };

        // Keep track of dots that Pac-Man has eaten
        const eatenDots = new Set<string>();

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Snap Pac-Man's Y position perfectly to the specified row grid line
            pacman.y = pacman.currentGridY * gap + gap / 2;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Calculate which dot column Pac-Man is currently hitting
            const currentColumn = Math.floor((pacman.x + pacman.radius) / gap);
            const dotKey = `${currentColumn},${pacman.currentGridY}`;

            // 2. If he hits a new dot, mark it as eaten
            if (pacman.x > currentColumn * gap && !eatenDots.has(dotKey)) {
                eatenDots.add(dotKey);
            }

            // 3. Cover up eaten dots by drawing matching background color shapes over them
            eatenDots.forEach((key) => {
                const [col, row] = key.split(',').map(Number);
                const dotX = col * gap + gap / 2;
                const dotY = row * gap + gap / 2;

                // Draw a dark circle that covers the original dot perfectly
                ctx.beginPath();
                ctx.arc(dotX, dotY, dotSize + 1, 0, Math.PI * 2);
                ctx.fillStyle = '#0D1117'; // Matches your main app background color
                ctx.fill();
            });

            // 4. Update Pac-Man's movement
            pacman.x += pacman.speed;

            // Reset and choose a random new row if he moves completely off-screen
            if (pacman.x > canvas.width + 50) {
                pacman.x = -50;
                eatenDots.clear(); // Regenerate the eaten dots
                const totalRows = Math.floor(canvas.height / gap);
                pacman.currentGridY = Math.floor(Math.random() * (totalRows - 2)) + 1;
                pacman.y = pacman.currentGridY * gap + gap / 2;
            }

            // 5. Handle Mouth Chomp Animation
            if (pacman.mouthClosing) {
                pacman.mouthAngle -= 0.03;
                if (pacman.mouthAngle <= 0.05) pacman.mouthClosing = false;
            } else {
                pacman.mouthAngle += 0.03;
                if (pacman.mouthAngle >= 0.4) pacman.mouthClosing = true;
            }

            // 6. Draw Pac-Man
            ctx.beginPath();
            ctx.arc(
                pacman.x,
                pacman.y,
                pacman.radius,
                pacman.mouthAngle * Math.PI,
                (2 - pacman.mouthAngle) * Math.PI
            );
            ctx.lineTo(pacman.x, pacman.y);
            ctx.fillStyle = '#EAB308'; // Tailwinds yellow-500 matches your grid active color
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gap, dotSize, baseColor]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ mixBlendMode: 'normal' }}
        />
    );
};