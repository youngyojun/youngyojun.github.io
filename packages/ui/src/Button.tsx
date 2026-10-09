import type { ComponentProps } from 'react';
import '@youngyojun/design-tokens/tokens.css';
import styles from './Button.module.css';

export type ButtonProps = ComponentProps<'button'>;

export function Button({ type = 'button', className = '', ...props }: ButtonProps) {
  return <button {...props} type={type} className={`${styles.button} ${className}`.trim()} />;
}
