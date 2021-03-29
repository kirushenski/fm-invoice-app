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

interface Sender {
  street: string
  city: string
  postCode: string
  country: string
}

interface Client extends Sender {
  name: string
  email: string
}

interface InvoiceItem {
  name: string
  quantity: number
  price: number
  total: number
}

type PaymentTerms = 'Net 1 Day' | 'Net 7 Days' | 'Net 14 Days' | 'Net 30 Days'
type InvoiceStatus = 'draft' | 'pending' | 'paid'

interface Invoice {
  id: number
  name: string
  createdAt: string
  paymentDue: string
  paymentTerms: PaymentTerms
  description: string
  status: InvoiceStatus
  sender: Sender
  client: Client
  items: InvoiceItem[]
  total: number
}

type CreatedInvoice = Omit<Invoice, 'id'>
type InvoiceFormValues = Omit<Invoice, 'id' | 'name' | 'paymentDue' | 'status' | 'total'>

type PaymentTermsAPIData = 'Net_1_Day' | 'Net_7_Days' | 'Net_14_Days' | 'Net_30_Days'

interface InvoiceAPIData extends Omit<Invoice, 'createdAt' | 'paymentTerms' | 'paymentDue'> {
  created_at: string
  payment_due: string
  payment_terms: PaymentTermsAPIData
}
