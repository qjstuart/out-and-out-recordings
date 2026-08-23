import { useId } from 'react'
import type * as React from 'react'

import { Button } from '#/components/ui/button.tsx'
import { Field, FieldDescription, FieldLabel } from '#/components/ui/field.tsx'
import { Input } from '#/components/ui/input.tsx'
import { cn } from '#/lib/utils.ts'

function EmailSignup({ className, ...props }: React.ComponentProps<'form'>) {
  const emailId = useId() // Email signup may be rendered more than once on a screen, so we avoid duplicate IDs

  return (
    <form className={cn('w-full', className)} {...props}>
      <Field>
        <FieldLabel htmlFor={emailId}>Subscribe to email news</FieldLabel>
        <FieldDescription>
          Get new releases and updates from Out And Out Recordings.
        </FieldDescription>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <Button type="submit">Subscribe</Button>
        </div>
      </Field>
    </form>
  )
}

export { EmailSignup }
