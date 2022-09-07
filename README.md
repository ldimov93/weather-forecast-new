This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It retrieves data from OpenWeatherMap's 5-day, 3-hour API.
Current weather provides information on the weather at the moment. Daily forecasst, on the other hand, actually grabs
firs hour of every day and displates data. When you click on a particular day, you get to drill down the hourly forecast. Overall app responsiveness is pretty good, too.

## Getting Started

- First, you need to enter an Open Weather Map API key in next.config.js env.openWeatherKey.
- Run command npm i
- Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

Best UX when viewed in OS dark mode

## Possible optimizations/improvements

- Add ability to search by city name (involves using a different API) - search box with autocomplete
- Compute min/max temperatures based on hourly data for each day (so we have daily min/max temperatures) - 5-day 3-hour OpenWeatherMap forecast currently does not offer that as values (paid plan has that) to consume
- Favorites feature - persist data either using local storage and/or credentials (Facebook, Google, or GitHub account integration)
- Use Redux if state management gets more complex and also to ensure predictability and traceability
- Replace Open Weather Map's default icons with higher resolution ones