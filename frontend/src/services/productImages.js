// Compatibility for demo databases created with the original shared illustration.
export const demoImages = {
  'V99-DEMO-001': '/assets/lv-af1-red.jpg',
  'V99-DEMO-002': '/assets/offwhite-jordan-chicago.jpg',
  'V99-DEMO-003': '/assets/supreme-af1-white.png',
  'V99-DEMO-004': '/assets/dior-jordan.jpg',
  'V99-DEMO-005': '/assets/offwhite-presto.jpg',
  'V99-DEMO-006': '/assets/supreme-foamposite.jpg',
  'V99-DEMO-007': '/assets/lv-af1-mid.jpg',
  'V99-DEMO-008': '/assets/offwhite-vapormax.jpg',
};

export function productImage(product) {
  const original = product.imagen_url;
  return ((!original || original === '/assets/sneaker-blue.png') && demoImages[product.sku])
    || original || '/assets/sneaker-blue.png';
}
