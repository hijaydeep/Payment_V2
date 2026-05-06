# AGENTS.md

## Project
Payment Gateway Simulator

Stack:
- Next.js App Router
- TypeScript (strict)
- Redux Toolkit
- TailwindCSS
- LocalStorage persistence

Goal:
Implement a realistic frontend payment gateway simulation with:
- Payment form validation
- Card preview
- Mock API payment lifecycle
- Retry flow
- Timeout handling
- Transaction history
- Accessibility
- Responsive UI

---

## Architecture Rules

### 1) Separation of concerns
Strict separation:

components/
= presentation only

hooks/
= reusable logic

store/
= global state

utils/
= pure functions

types/
= shared TS types

app/api/
= mock backend only

Never mix responsibilities.

---

## 2) JSX rule
No business logic inside JSX.

Bad:
{amount > 100 ? ...}

Bad:
complex validation inside component render

Good:
precompute variables above return

Good:
extract to hook/util

---

## 3) TypeScript rules
Never use:

any

Never disable strict typing.

Always define interfaces/types.

Prefer:

type

for unions.

Prefer:

interface

for objects.

---

## 4) Redux rules
Global state only:

- payment lifecycle
- retries
- transaction history
- selected transaction
- errors

Do NOT store form input values globally.

Form stays local state.

Use Redux only where shared state is needed.

---

## 5) Component rules
Max component size:
250 lines

If bigger:
split component.

One responsibility per component.

Examples:

CardInput
= card number only

CardPreview
= preview only

TransactionHistory
= history only

---

## 6) Validation rules
Validation must be realtime.

Per-field validation.

Do not validate entire form only on submit.

Validate:
- onChange
- onBlur

---

## 7) API rules
Use:

/api/pay

POST only.

Simulate:
- success 60%
- failure 25%
- timeout 15%

Timeout handled with AbortController (6s).

Never use external payment SDK.

---

## 8) Retry rules
Max retries:
3

Must reuse same transactionId.

Never create duplicate transaction records.

Update existing transaction.

Idempotent flow only.

---

## 9) Accessibility rules
Every field must have:
- label
- id
- aria-describedby
- aria-invalid

Keyboard navigation required.

Focus management required after state transitions.

Announce results with aria-live.

---

## 10) UI rules
Design:
clean
professional
minimal

No flashy animations.

Responsive:
375px mobile minimum
1280px desktop

---

## 11) Code quality
Prefer:

small functions

pure utilities

descriptive naming

Examples:
validateCardNumber
formatExpiry
detectCardType

Bad:
handleEverything()

---

## 12) Commit style
Use meaningful commits:

feat: add payment form validation
feat: implement retry logic
feat: add transaction persistence
fix: handle timeout cancellation

Never dump huge commits.

---

## 13) AI agent instructions
Before generating code:

1. inspect existing files
2. reuse existing types
3. avoid duplicate utilities
4. follow folder ownership
5. keep strict TS
6. avoid unnecessary packages
7. prefer readable code over clever code

Never rewrite unrelated files.

Only change requested scope.

Always preserve architecture consistency.

---

## 14) Definition of done
Feature complete only if:

✓ typed  
✓ tested manually  
✓ responsive  
✓ accessible  
✓ error handled  
✓ clean code  
✓ no console errors  
✓ production build passes