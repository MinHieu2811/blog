export default function ErrorPage({ statusCode, message }: { statusCode: number; message: string }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{statusCode}</h1>
      <p>{message}</p>
    </div>
  )
}
