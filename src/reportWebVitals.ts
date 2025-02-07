import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Agora usamos as funções como onCLS, onFID, etc.
    onCLS((metric) => onPerfEntry(metric)); // Exemplo de uso
    onFID((metric) => onPerfEntry(metric));
    onFCP((metric) => onPerfEntry(metric));
    onLCP((metric) => onPerfEntry(metric));
    onTTFB((metric) => onPerfEntry(metric));
  }
};

export default reportWebVitals;
