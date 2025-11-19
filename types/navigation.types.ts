export interface NavigationItem {
  href: string;
  name: string;
  icon: string;
  color: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
  actionIcon?: string;
}