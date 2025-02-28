import Link from "next/link";

export default function UpdateNotes() {
  return (
    <div className="absolute left-0 top-12 w-[320px] h-auto p-5 bg-black border-2 border-solid border-l-orange-500 border-t-orange-500 border-r-orange-300 border-b-orange-300 rounded-lg flex flex-col gap-2.5">
      <header className="text-xl font-medium text-orange-200">
        Güncelleme Notları{" "}
        <span className="text-gray-500 font-medium text-xs">15.12.2024</span>
      </header>
      <ul className="list-disc list-inside text-white text-sm flex flex-col gap-2.5">
        <li>
          <Link href="/">Ana sayfa - Feedback Bölümü eklendi.</Link>
        </li>
      </ul>
    </div>
  );
}
