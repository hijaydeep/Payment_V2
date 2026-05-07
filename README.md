# Payment Gateway Simulator

A frontend payment gateway simulator built with Next.js, TypeScript, Redux Toolkit, and TailwindCSS.

Designed to simulate a realistic checkout experience with:

- Live card preview
- Real-time validation
- Payment lifecycle states
- Retry flow
- Timeout handling
- Transaction history
- Local persistence
- Accessible and responsive UI

## Features

### Payment Form

- Real-time field validation
- Card number formatting
- Card type detection
  - Visa
  - Mastercard
  - American Express
- Dynamic CVV validation
- Expiry validation
- Amount validation
- Cardholder validation

---

### Card Preview

- Live synchronized card preview
- Card issuer badge
- Premium card UI
- Show / hide card details
- Smart formatting

---

### Payment Lifecycle

Mock backend simulation:

- Success → 60%
- Failure → 25%
- Timeout → 15%

Handles:

- Processing state
- Success state
- Failure state
- Timeout state
- Cancellation
- Retry flow (max 3 retries)
- Idempotent transaction retry using same transactionId

---

### Transaction History

- Persistent localStorage history
- Newest first sorting
- Status badges
- Retry count tracking
- Transaction details drawer
- Failure reason visibility

---

## Tech Stack

- Next.js (App Router)
- TypeScript (strict mode)
- Redux Toolkit
- TailwindCSS
- LocalStorage persistence
- Route Handlers (mock backend)

---

## Architecture

Separation of concerns:

```txt
components/
hooks/
store/
utils/
types/
app/api/
```

### Components

Presentational UI only

### Hooks

Reusable business logic

### Store

Global payment lifecycle state

### Utils

Pure helper functions

### API

Mock payment backend simulation

---

## Folder Structure

```txt
app/
  api/pay/

components/
  payment/
  status/
  history/
  ui/

hooks/
store/
types/
utils/
```

---

## Setup

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Build:

```bash
npm run build
```

---

## Test Cards

### Visa

4242 4242 4242 4242

### Mastercard

5555 5555 5555 4444

### American Express

3782 822463 10005

---

## Accessibility

- Keyboard navigable
- aria labels
- Focus management
- Screen reader friendly messaging
- Responsive design

---

## Edge Cases Handled

- Invalid checksum
- Invalid expiry
- Dynamic CVV rule switching
- Retry limit reached
- Timeout cancellation
- Duplicate transaction prevention
- SSR-safe persistence

---

## Future Improvements

- Dark mode
- Payment analytics dashboard
- Receipt generation
- Export transaction history
- Multi-currency exchange rates
- Real payment gateway SDK adapters

---

## Author

Jaydeep Kalal
