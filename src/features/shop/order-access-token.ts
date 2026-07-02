const encoder = new TextEncoder()
const minimumSecretBytes = 32
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function validateSecret(secret: string) {
  if (encoder.encode(secret).byteLength < minimumSecretBytes) {
    throw new Error(
      `ORDER_ACCESS_TOKEN_SECRET must be at least ${minimumSecretBytes} bytes.`,
    )
  }
}

async function importHmacKey(secret: string) {
  validateSecret(secret)

  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

function encodeBase64Url(bytes: Uint8Array) {
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '')
}

function decodeBase64Url(value: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return undefined
  }

  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')

  try {
    const binary = atob(padded)
    return Uint8Array.from(binary, (character) => character.charCodeAt(0))
  } catch {
    return undefined
  }
}

export function createOrderId() {
  return crypto.randomUUID()
}

export async function createOrderAccessToken(orderId: string, secret: string) {
  if (!uuidPattern.test(orderId)) {
    throw new Error('A valid UUID order ID is required.')
  }

  const key = await importHmacKey(secret)
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(orderId),
  )

  return `${orderId}.${encodeBase64Url(new Uint8Array(signature))}`
}

export async function verifyOrderAccessToken(token: string, secret: string) {
  const separatorIndex = token.indexOf('.')

  if (separatorIndex === -1 || separatorIndex !== token.lastIndexOf('.')) {
    return undefined
  }

  const orderId = token.slice(0, separatorIndex)
  const suppliedSignature = decodeBase64Url(token.slice(separatorIndex + 1))

  if (!uuidPattern.test(orderId) || suppliedSignature?.byteLength !== 32) {
    return undefined
  }

  const key = await importHmacKey(secret)
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    suppliedSignature,
    encoder.encode(orderId),
  )

  return isValid ? orderId : undefined
}
