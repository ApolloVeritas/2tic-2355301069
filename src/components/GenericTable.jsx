// src/components/GenericTable.jsx
import PropTypes from 'prop-types';

export default function GenericTable({ columns, data, renderRow }) {
  return (
    <div className="w-full overflow-hidden rounded-xl shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-600">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                  {renderRow(item, index)}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-16 text-center text-gray-500"
                >
                  Tidak ada data yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

GenericTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderRow: PropTypes.func.isRequired,
};