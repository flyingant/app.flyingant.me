export default function DefaultNameTag({
  name,
}: {
  name: React.ReactNode
}) {
  return (
    <div className="w-64 shadow p-4 m-auto flex flex-col items-center justify-center">
      {name}
    </div>
  )
}
