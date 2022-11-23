import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem
{
  id?: string;
  title?: string;
  subtitle?: string;
  type:
    | 'basic'
    | 'collapsable'
    | 'divider'
    | 'group'
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  exactMatch?: boolean;
  // function?: (item: MenuItem) => void;
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: MenuItem[];
}
