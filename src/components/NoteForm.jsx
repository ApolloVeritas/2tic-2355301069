// src/components/NoteForm.jsx
import { useState } from "react";

const INITIAL_FORM_DATA = { title: "", content: "", status: "To Do" };

export default function NoteForm({ onSubmit, isLoading }) {
  const [dataForm, setDataForm] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevData) => ({ ...prevData, [name]: value }));
  };

  // Menggunakan async/await agar lebih mudah dibaca
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Memastikan ada data yang diisi sebelum submit
    if (!dataForm.title || !dataForm.content) return;
    
    await onSubmit(dataForm);
    setDataForm(INITIAL_FORM_DATA);
  };

  // Menyiapkan kelas dasar untuk input agar tidak berulang (DRY principle)
  const inputBaseClass = 
    "w-full border rounded-lg px-4 py-2 transition duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 " +
    "disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah Catatan Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={dataForm.title}
          onChange={handleChange}
          placeholder="Judul catatan"
          required
          disabled={isLoading}
          className={inputBaseClass}
        />
        <textarea
          name="content"
          value={dataForm.content}
          onChange={handleChange}
          placeholder="Isi catatan"
          rows="4" // Sedikit lebih tinggi untuk kenyamanan mengetik
          required
          disabled={isLoading}
          className={inputBaseClass}
        />
        <select
          name="status"
          value={dataForm.status}
          onChange={handleChange}
          disabled={isLoading}
          className={inputBaseClass}
        >
          <option value="To Do">To Do</option>
          <option value="On Progress">On Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Menyimpan..." : "Tambah Catatan"}
        </button>
      </form>
    </div>
  );
}