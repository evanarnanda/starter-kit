import { Html } from "@elysiajs/html";

function Spinner ({ id, size='loading-xs' }:{ id?:string, size: 'loading-xs' | 'loading-sm' | 'loading-md' | 'loading-lg' } ) {
  return <span id={id} class={'loading loading-dots ' + size + 'htmx-indicator hidden [&.htmx-request]:block'}></span>
}

export { Spinner }