export const navItems = [
  { label: 'Home', path: '/' },
  { 
    label: 'About', 
    dropdown: [
      { label: 'About Rotaract', path: '/about' },
      { label: 'About Rotaract 3191', path: '/about-3191' },
      { label: 'Know Your DRR-Elect', path: '/know-your-drr-elect' },
      { label: 'Team', path: '/team' }
    ]
  },
  { label: 'Zones', path: '/zones' },
  { 
    label: 'Events', 
    dropdown: [
      { label: 'Calendar', path: '/calendar' },
      { label: 'DLA Chair Nominations', path: '/DLA-Chair-Nominations' }
    ]
  },
  { label: 'Brand Center', path: '/resources' },
  { label: 'Showcase', path: 'https://showcase.rotaract3191.org/' }
]
