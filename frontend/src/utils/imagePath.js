// Utility to normalize various stored image path formats into a usable HTTP URL.
// It handles:
// - Full URLs (returned as-is)
// - Windows absolute paths containing a local images folder
// - Backend file paths containing an images/ segment
// You can override the default base by setting VITE_IMAGE_BASE in your .env file.

export function convertImagePath(p, base) {
  if (!p) return ''
  const str = String(p)
  // already a full URL -> return as-is
  if (/^https?:\/\//i.test(str)) return str

  // determine image base
  const IMAGE_BASE = base || (import.meta.env.VITE_IMAGE_BASE || 'http://localhost:3000/images')

  // normalize backslashes to forward slashes
  const s = str.replace(/\\\\/g, '/').replace(/\\/g, '/')

  // try to capture the path after an "images/" folder
  const m = s.match(/images[\\/](.*)$/i)
  if (m && m[1]) {
    return `${IMAGE_BASE}/${m[1]}`
  }

  // fallback: if string already contains '/images/', use everything after that
  const idx = s.toLowerCase().indexOf('/images/')
  if (idx !== -1) {
    return IMAGE_BASE + s.substring(idx + '/images'.length)
  }

  // otherwise return the original string (best-effort)
  return str
}

export default convertImagePath
