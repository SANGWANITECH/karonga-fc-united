import { supabase } from './supabase'

// Compresses an image in the browser, then uploads to Supabase Storage.
// Returns the public URL of the uploaded image.
export async function uploadImage(file: File, folder: string): Promise<string> {
  // 1. Compress/resize using a canvas
  const compressed = await compressImage(file)

  // 2. Unique filename
  const ext = 'jpg'
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  // 3. Upload to the "images" bucket
  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, compressed, { contentType: 'image/jpeg' })

  if (error) throw error

  // 4. Get the public URL
  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}

// Resizes to max 1200px wide and compresses to JPEG ~80% quality
function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)

    img.onload = () => {
      const maxWidth = 1200
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas not supported'))
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Compression failed'))
        },
        'image/jpeg',
        0.8
      )
    }
    img.onerror = reject
  })
}