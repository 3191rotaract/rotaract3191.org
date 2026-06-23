export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Zones', path: '/zones' },
  { 
    label: 'Events', 
    dropdown: [
      { label: 'All Events', path: '/events' },
      { label: 'Calendar', path: '/calendar' }
    ]
  },
  { 
    label: 'About', 
    dropdown: [
      { label: 'About Rotaract', path: '/about' },
      { label: 'About Rotaract 3191', path: '/about-3191' },
      { label: 'Team', path: '/team' }
    ]
  },
  { label: 'Brand Center', path: '/brand-center' },
  { label: 'Showcase', path: 'https://showcase.rotaract3191.org/'}
]
