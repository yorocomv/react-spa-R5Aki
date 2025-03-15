import { Focusable, OverlayArrow, Tooltip, TooltipProps, TooltipTrigger } from 'react-aria-components';
import './react-aria-tooltip.css';

interface TooltipWrapperProps {
  text: string;
  delay?: number | undefined;
  placement?: TooltipProps['placement'] | undefined;
  children: JSX.Element;
  className?: string | undefined;
  fillColor: 'teal.400' | 'orange.400';
}

export default function TooltipWrapper({
  text,
  delay = 0,
  placement = 'bottom',
  children,
  className = undefined,
  fillColor,
}: TooltipWrapperProps) {
  const color = {
    'teal.400': '#2dd4bf',
    'orange.400': '#fb923c',
  };

  return (
    <TooltipTrigger delay={delay}>
      <Focusable>
        <span role="button">{children}</span>
      </Focusable>
      <Tooltip placement={placement} className={`react-aria-Tooltip ${className}`}>
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8" fill={color[fillColor]}>
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        {text}
      </Tooltip>
    </TooltipTrigger>
  );
}
