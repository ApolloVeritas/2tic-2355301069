// src/components/NoteCard.jsx
import PropTypes from 'prop-types';

// Menggunakan object mapping lebih ringkas daripada switch-case
const STATUS_BADGE_CLASSES = {
  "Done": "bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20",
  "On Progress": "bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
  "To Do": "bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-500/20",
};

export default function NoteCard({ note, onDelete }) {
  const badgeClass = STATUS_BADGE_CLASSES[note.status] || STATUS_BADGE_CLASSES["To Do"];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 pr-8">
            {note.title}
          </h3>
          <button
            onClick={() => onDelete(note.id)}
            className="flex-shrink-0 text-gray-400 hover:text-red-500 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Hapus catatan "${note.title}"`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-4">
          {note.content}
        </p>
      </div>

      <div className="flex-shrink-0">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
          {note.status}
        </span>
      </div>
    </div>
  );
}

// Menambahkan validasi tipe properti (best practice)
NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};