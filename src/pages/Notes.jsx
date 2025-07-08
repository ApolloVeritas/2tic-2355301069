// src/pages/Notes.jsx
import { useEffect, useState, useCallback } from "react";
import { notesAPI } from "../services/notesAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

// Memindahkan state awal ke konstanta agar mudah di-reset
const INITIAL_NOTIFICATION = { error: "", success: "" };

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ganti nama `loading` agar lebih jelas
  const [isSubmitting, setIsSubmitting] = useState(false); // Ganti nama `formLoading`
  const [notification, setNotification] = useState(INITIAL_NOTIFICATION);

  // Menggabungkan logika notifikasi
  const showNotification = (type, message) => {
    setNotification({ [type]: message });
    setTimeout(() => setNotification(INITIAL_NOTIFICATION), 3000);
  };

  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    setNotification(INITIAL_NOTIFICATION);
    try {
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setNotification({ error: "Gagal memuat catatan. Coba lagi nanti." });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleAddNote = async (dataForm) => {
    setIsSubmitting(true);
    setNotification(INITIAL_NOTIFICATION);
    try {
      await notesAPI.createNote(dataForm);
      showNotification("success", "Catatan berhasil ditambahkan!");
      await loadNotes(); // Muat ulang semua data
    } catch (err) {
      showNotification("error", `Gagal menambah catatan: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus catatan ini?")) return;
    
    // Optimistic UI: hapus dari state dulu agar UI cepat responsif
    const originalNotes = [...notes];
    setNotes(notes.filter(note => note.id !== id));
    setNotification(INITIAL_NOTIFICATION);

    try {
      await notesAPI.deleteNote(id);
      showNotification("success", "Catatan berhasil dihapus.");
    } catch (err) {
      // Jika gagal, kembalikan data semula dan tampilkan error
      setNotes(originalNotes);
      showNotification("error", `Gagal menghapus catatan: ${err.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <aside class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md mb-6">
  <h2 class="font-semibold text-blue-800 mb-2">Pertemuan 12</h2>
  <p class="text-sm text-gray-700 mb-2">
    Pada Pertemuan 12, membahas tentang:
  </p>
  <ul class="list-disc list-inside text-sm text-gray-700 mb-4">
    <li>Backend as a Service (BaaS)</li>
    <li>Platform Supabase</li>
    <li>REST API untuk CRUD</li>
    <li>State &amp; useEffect di React</li>
    <li>Reusable Component</li>
  </ul>
  <p class="text-sm text-gray-700 mb-2">
    Dengan pembahasan tersebut, saya membuat aplikasi <strong>Notes App</strong> yang memiliki fitur:
  </p>
  <ul class="list-disc list-inside text-sm text-gray-700">
    <li>Menambahkan catatan menggunakan REST API Supabase (<code>POST</code>)</li>
    <li>Melihat daftar catatan (<code>GET</code>) dan menampilkannya dalam komponen kartu</li>
    <li>Menghapus catatan (<code>DELETE</code>) dengan konfirmasi</li>
    <li>Menggunakan komponen reusable seperti <code>AlertBox</code>, <code>LoadingSpinner</code>, dan <code>EmptyState</code></li>
  </ul>
</aside>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes App</h1>

      {notification.error && <AlertBox type="error">{notification.error}</AlertBox>}
      {notification.success && <AlertBox type="success">{notification.success}</AlertBox>}

      <NoteForm onSubmit={handleAddNote} isLoading={isSubmitting} />
      
      <div className="mt-8">
        {isLoading ? (
          <LoadingSpinner text="Memuat catatan..." />
        ) : notes.length === 0 ? (
          <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}