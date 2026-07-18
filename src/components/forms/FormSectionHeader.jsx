export default function FormSectionHeader({ title }) {
  return (
    <div className="my-12">
      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-pink-200" />
        <h2 className="text-center text-lg md:text-3xl font-black uppercase tracking-[0.35em] text-[#d41367]">
          {title}
        </h2>
        <div className="h-px flex-1 bg-pink-200" />
      </div>
    </div>
  )
}
