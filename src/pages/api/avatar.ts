import type { NextApiRequest, NextApiResponse } from 'next'
import url from 'url'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET' || !req.url) {
    return res
      .status(400)
      .json({ message: 'Bad Request' })
  }

  const { name } = url.parse(req.url, true).query
  const apiUrl = `https://www.starwars.com/search?q=${name}`
  return fetch(apiUrl)
    .then(res => res.text())
    .then(message => res.status(200).send(message))
}
