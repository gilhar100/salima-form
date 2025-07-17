
export const dimensionColors = {
  'S': {
    strongest: '#D32F2F',
    strong: '#D32F2F',
    medium: '#D32F2F',
    weak: '#D32F2F',
    weakest: '#D32F2F',
    primary: '#D32F2F',
    light: '#FFEBEE'
  },
  'A': {
    strongest: '#1976D2',
    strong: '#1976D2',
    medium: '#1976D2',
    weak: '#1976D2',
    weakest: '#1976D2',
    primary: '#1976D2',
    light: '#E3F2FD'
  },
  'L': {
    strongest: '#FBC02D',
    strong: '#FBC02D',
    medium: '#FBC02D',
    weak: '#FBC02D',
    weakest: '#FBC02D',
    primary: '#FBC02D',
    light: '#FFFDE7'
  },
  'I': {
    strongest: '#EC407A',
    strong: '#EC407A',
    medium: '#EC407A',
    weak: '#EC407A',
    weakest: '#EC407A',
    primary: '#EC407A',
    light: '#FCE4EC'
  },
  'A2': {
    strongest: '#26C6DA',
    strong: '#26C6DA',
    medium: '#26C6DA',
    weak: '#26C6DA',
    weakest: '#26C6DA',
    primary: '#26C6DA',
    light: '#E0F7FA'
  },
  'M': {
    strongest: '#8D6E63',
    strong: '#8D6E63',
    medium: '#8D6E63',
    weak: '#8D6E63',
    weakest: '#8D6E63',
    primary: '#8D6E63',
    light: '#EFEBE9'
  }
};

export const dimensionNames = {
  'S': 'אסטרטגיה',
  'A': 'אדפטיביות',
  'L': 'למידה',
  'I': 'השראה',
  'A2': 'אותנטיות',
  'M': 'משמעות'
};

// Fixed archetype-aligned order for consistent display across all visualizations
export const DIMENSION_ORDER = ['S', 'A', 'L', 'I', 'A2', 'M'] as const;
