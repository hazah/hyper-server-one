import axios from "axios";

export default function init() {
  
}

export async function requestJS(path: string): Promise<void> {
  processJS(await axios.get(path, { headers: {'Content-Type': 'text/javascript'}}));
}

export function processJS(js: string): void {
  const script = document.createElement('script');
  script.text = js;
  document.head.appendChild(script).parentNode.removeChild(script);
}
