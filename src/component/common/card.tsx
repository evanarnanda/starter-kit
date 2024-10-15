import { Html } from "@elysiajs/html"

interface Props {
  children: JSX.Element
}
function Card({children}: Props) {
  return (
    <div class="card bg-base-100 w-96 shadow-xl">
      {children}
    </div>
  )
}

function CardBody({children}: Props) {
  return (
    <div class="card-body">
      {children}
    </div>
  )
}

function CartTitle({children}: Props) {
  return (
    <h2 class="card-title">{children}</h2>
  )
}

function CardContent({children}:Props) {
  return (
    <div class='m-4'>
      {children}
    </div>
  )
}

export { 
  Card, 
  CardBody,
  CardContent,
  CartTitle,
}