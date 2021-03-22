// We use assets as modules with Webpack, so we need to tell Typescript what these imports mean

type SvgrComponent = React.FC<
  React.SVGProps<SVGSVGElement> & {
    /** SVG accessible name provided by `title` tag */
    title?: string
  }
>

declare module '*.svg' {
  const value: SvgrComponent
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.webp' {
  const value: string
  export default value
}

declare module '*.woff2' {
  const value: string
  export default value
}

interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

interface InvoiceItem {
  name: string
  quantity: number
  price: number
  total: number
}

type InvoiceStatus = 'draft' | 'pending' | 'paid'

interface Invoice {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: InvoiceStatus
  senderAddress: Address
  clientAddress: Address
  items: InvoiceItem[]
  total: number
}
