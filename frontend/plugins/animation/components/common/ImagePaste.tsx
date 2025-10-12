import { useEffect, useState } from 'react'
import type React from 'react'
import { useAnimation } from '../../context'

export const ImagePaste = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { imageBase64, setImageBase64 } = useAnimation()
  const [isFocused, setIsFocused] = useState(false)

  const blobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        const base64 = result.includes(',') ? result.split(',')[1] : result
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const setFromBlob = async (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    setImageUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
    const b64 = await blobToBase64(blob)
    setImageBase64(b64)
  }

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          await setFromBlob(file)
          e.preventDefault()
          break
        }
      }
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const navAny = navigator as any
      if (!navAny.clipboard || !navAny.clipboard.read) {
        alert('Clipboard image read is not supported in this browser')
        return
      }
      const items: ClipboardItem[] = await navAny.clipboard.read()
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type)
            await setFromBlob(blob)
            return
          }
        }
      }
      alert('No image found in clipboard')
    } catch (err) {
      alert('Failed to read image from clipboard')
    }
  }

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  return (
    <div className="image-paste" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button onClick={handlePasteFromClipboard} style={{ alignSelf: 'flex-start' }}>Paste from Clipboard</button>
      <div
        contentEditable
        suppressContentEditableWarning
        tabIndex={0}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: 420,
          height: 280,
          border: `2px ${isFocused ? 'solid' : 'dashed'} #888`,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          outline: 'none',
          userSelect: 'none',
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Pasted" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          'Click here, then press Ctrl+V to paste an image'
        )}
      </div>
      {imageBase64 && (
        <div style={{ fontSize: 12, color: '#888' }}>Base64 stored ({Math.ceil(imageBase64.length / 1024)} KB)</div>
      )}
    </div>
  )
}