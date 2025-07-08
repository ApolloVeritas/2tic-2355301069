// src/components/LoadingSpinner.jsx
import PropTypes from 'prop-types';

export default function LoadingSpinner({ text = "Memuat..." }) {
  return (
    <div className="flex justify-center items-center flex-col text-center text-gray-500 my-10">
      <div 
        className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"
        role="status"
        aria-label="Loading"
      >
      </div>
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}

LoadingSpinner.propTypes = {
  text: PropTypes.string,
};