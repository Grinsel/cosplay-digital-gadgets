/**
 * Component Template
 *
 * Copy this file to src/components/YourComponent.tsx
 *
 * Guidelines:
 * - Use 'use client' only if the component needs interactivity
 * - Keep components focused and single-purpose
 * - Use TypeScript interfaces for props
 */

'use client'

import { useTranslations } from '@/lib/i18n'

interface YourComponentProps {
  title: string
  description?: string
  variant?: 'default' | 'accent' | 'warning'
  onClick?: () => void
}

export default function YourComponent({
  title,
  description,
  variant = 'default',
  onClick,
}: YourComponentProps) {
  const t = useTranslations()

  const variantStyles = {
    default: 'border-cyber-accent/20',
    accent: 'border-cyber-blue/30 bg-cyber-blue/10',
    warning: 'border-cyber-red/30 bg-cyber-red/10',
  }

  return (
    <div
      className={`bg-cyber-darker border rounded-lg p-6 ${variantStyles[variant]}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-300 text-sm">
          {description}
        </p>
      )}
    </div>
  )
}

/**
 * Usage Example:
 *
 * import YourComponent from '@/components/YourComponent'
 *
 * <YourComponent
 *   title="Card Title"
 *   description="Optional description text"
 *   variant="accent"
 *   onClick={() => console.log('clicked')}
 * />
 */
