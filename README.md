

## Server Side Rendering
1. All data for the page are fetching on server
2. The server render HTML for the page
3. The HTML, CSS and Javascript are send to client
4. Loading page show on client 
5. React make it interactive

## Redirecting
- redirect('/') server component,
- router.push('/') form 'next/navigation' client component
- pathName = usePathname(), client component

## Loading UI
- create loading.tsx file in same level with page.tsx
- when applied, navigation is immediate, do not to wait for rout full load

## Fetching Data
- Fetching data on server component whenever possible
- Fetching wherever need data, because fetch requests are auto memoried

## Caching
### Request Memorization
- Where: Server, 
- Duration: Untill React has finish rendering
- Purpose: Re-use data in React component tree

- React feature, applies to the GET request
- Don't apple to router handler

### Data cache (Fetch)
#### what is
- Where: Server
- Duration: Persistent unless revalidate or opt-out
- Purpose: Store data across request

- An request send, if a cached found, it return immediately
- if a cached not found, the request is made to the date source and store in the Data Cache

- Difference with Request Memoization, Data cached is persistent across incoming requests and deployement, whereas memoization only in the same render

#### Revaliate
- Time base: use 'revalidate = 10'
    - The first request is called, the date will be fetched from data source and store in the Data Cached
    - Request under 10s will return cached date
    - After 10s, the next request will still return the cached data and in that request Next will trigger revalidate on the background and date the cached data

- On-Demand: use revalidateTag or revalidatePath
    - The first request is called, the date will be fetched from data source and store in the Data Cached
    - When revalidate is trigger, the target cache will be purge
    - The next time a request is made, it will run like first request

#### Opt-out
- fetch(`https://...`, { cache: 'no-store' })
- export const dynamic = 'force-dynamic', will effect all requests in the route

### Full Route Cache
#### what is 
- Where: Server
- Purpose: HTML and RSC (React Server Compoent) payload for faster page load
- Duration: By default it persistent

- Only cached static render route
- Unlike Date Cache across the deployments, the Full Route Cache will purge in new deploy

#### Revalidate
- Revalidate the Data Cached

#### Opting out
- use Dynamic Function like 'cookies()' will skip Full Route and still use Data cache
- use 'revalidate = 0' will skip the Full Route & Data Cached, mean component will rerender on each request
- Opt-out the Data Cach by make fetch(`https://...`, { cache: 'no-store' })
- when page set 'revalidate = 0', run every revalidate tag will reload this page


### Router Cache
#### What is
- Where: Client
- Purpose: Reduce server request when navigation
- Duration: 

- Client-side Cached include both visited and prefetched
- Unlike Full Route Cached, it temparory store RSC payload in the browser, whereas Full Route Cached store persistent store RSC payload and HTML
- Apply to both static and dynamic route

### Revalidte
- Calling route.refresh()
- Revalidate Data Cache with on-demand revalidate
- Ussing cookies prevent route use cookie from old data

### NEXT API
- route.refresh(): will make the new request for the current route
    - route.refresh() do not affect the Data or Full Route Cache

- dynamic = 'force-dynamic': Opt-out Date and Full Route Cache
- revalidate = 0: Opt-out Date and Full Route Cache
- Dynamic function like 'header'...: Opt-out Full Route Cache, in other words, the route will dynamic rerender   
- revalidateTag, revalidatePath: Revalidate the Data and Full Route Cache

## Next Auth
- getServerSession(option) , server
- useServerSession(), client - context
- all request handled by api/auth/[...nextauth]/ts

### use 'callback' for custom session data
- jwt({toke, user}), take user inputs
- session({token, session}), store user inputs with custom format


# Update

### update friday 23/2/2024

- revalidate path and router.refresh
- loading.tsx will be combine with layout and automatic wrap the page.tsx in Suspense
- unstable_noStore() to indicate a particular component should not be cached, run dynamically
- useOptimistic can update the ui before server action finish
- revalidatePath('/') will purge client side cached
- revalidate = Incremental Static Regeneration

### update friday 1/3/2024
- use Next auth with credential
- use group route for multi layout
- use next middleware to protected route

### update wednesday 16/10/2024
- config tailwind css for old browser
- switchable magnifier
- add scss
