export async function POST(request: Request) {
  const data = await request.json()

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}&response=${data.token}`,
  })

  const jsonResponse = await response.json()

  console.log('jsonResponse - ', jsonResponse)

  return Response.json(jsonResponse)
}
