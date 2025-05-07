// https://github.com/react-hook-form/react-hook-form/discussions/2549
export default function checkKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>, nextId?: string) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (nextId) {
      document.getElementById(nextId)?.focus();
    }
  }
}
