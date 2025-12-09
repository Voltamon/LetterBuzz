import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface CardNavProps {
  items: NavItem[];
  defaultActive?: string;
  className?: string;
}

export const CardNav: React.FC<CardNavProps> = ({
  items,
  defaultActive,
  className,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState(defaultActive || items[0]?.id);

  // Update active state when location or defaultActive changes
  useEffect(() => {
    if (defaultActive) {
      setActiveId(defaultActive);
    }
  }, [defaultActive, location.pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setActiveId(item.id);

    // Handle smooth scrolling for anchor links
    if (item.href.startsWith('#')) {
      const targetId = item.href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Account for fixed navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Use React Router navigation for routes
      navigate(item.href);
    }
  };

  // Only enable scroll-based navigation for anchor links (not routes)
  useEffect(() => {
    const hasAnchorLinks = items.some(item => item.href.startsWith('#'));
    const hasRouteLinks = items.some(item => !item.href.startsWith('#'));
    
    // If we have route-based navigation, don't use scroll-based detection
    if (hasRouteLinks) {
      return;
    }

    // Only use scroll detection if all items are anchor links
    if (!hasAnchorLinks) {
      return;
    }

    const handleScroll = () => {
      const sections = items
        .filter(item => item.href.startsWith('#'))
        .map(item => ({
          id: item.id,
          element: document.getElementById(item.href.substring(1))
        }))
        .filter(section => section.element);

      const scrollPosition = window.scrollY + 150; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveId(section.id);
          break;
        }
      }

      // Default to first item if at top of page
      if (window.scrollY < 100) {
        setActiveId(items[0]?.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <div className={cn('flex items-center gap-1 bg-muted/50 p-1 border border-border relative', className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={(e) => handleClick(e, item)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium transition-colors z-10 cursor-pointer',
            activeId === item.id
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {activeId === item.id && (
            <motion.div
              layoutId="active-card"
              className="absolute inset-0 bg-background shadow-sm border border-border"
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6,
              }}
              style={{ borderRadius: '0' }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </a>
      ))}
    </div>
  );
};