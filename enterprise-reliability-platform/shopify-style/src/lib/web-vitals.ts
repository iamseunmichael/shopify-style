import { onCLS, onINP, onLCP, onTTFB, onFCP } from "web-vitals"

export function reportWebVitals() {
  onCLS((metric) => {
    console.log("CLS:", metric.value)
  })

  onINP((metric) => {
    console.log("INP:", metric.value)
  })

  onLCP((metric) => {
    console.log("LCP:", metric.value)
  })

  onFCP((metric) => {
    console.log("FCP:", metric.value)
  })

  onTTFB((metric) => {
    console.log("TTFB:", metric.value)
  })
}