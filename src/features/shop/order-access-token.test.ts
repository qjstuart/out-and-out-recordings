import { describe, expect, it } from 'vitest'

import {
  createOrderAccessToken,
  createOrderId,
  verifyOrderAccessToken,
} from '#/features/shop/order-access-token'

const orderId = '4f760b5e-dfa2-47a3-a890-eabda29a14ea'
const secret = 'test-secret-that-is-at-least-32-bytes-long'
const otherSecret = 'other-secret-that-is-at-least-32-bytes'

describe('order access tokens', () => {
  it('creates UUID order IDs', () => {
    expect(createOrderId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    )
  })

  it('verifies a token signed by this server', async () => {
    const token = await createOrderAccessToken(orderId, secret)

    await expect(verifyOrderAccessToken(token, secret)).resolves.toBe(orderId)
  })

  it('rejects a token signed with another secret', async () => {
    const token = await createOrderAccessToken(orderId, secret)

    await expect(verifyOrderAccessToken(token, otherSecret)).resolves.toBe(
      undefined,
    )
  })

  it('rejects an altered order ID', async () => {
    const token = await createOrderAccessToken(orderId, secret)
    const alteredToken = token.replace(orderId, createOrderId())

    await expect(verifyOrderAccessToken(alteredToken, secret)).resolves.toBe(
      undefined,
    )
  })

  it.each(['', orderId, `${orderId}.bad.signature`, `${orderId}.not+url-safe`])(
    'rejects malformed token %j',
    async (token) => {
      await expect(verifyOrderAccessToken(token, secret)).resolves.toBe(
        undefined,
      )
    },
  )

  it('rejects short signing secrets', async () => {
    await expect(createOrderAccessToken(orderId, 'too-short')).rejects.toThrow(
      'at least 32 bytes',
    )
  })
})
