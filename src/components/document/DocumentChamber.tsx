import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Upload, FileText, CheckCircle, Clock, Edit3, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Signed';
  uploadDate: string;
  size?: string;
}

const DocumentChamber: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Term_Sheet_Nexus_Startup.pdf',
      status: 'Draft',
      uploadDate: '2026-03-29',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Investment_Agreement_v2.docx',
      status: 'In Review',
      uploadDate: '2026-03-28',
      size: '1.8 MB'
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);

    setTimeout(() => {
      const newDocs: Document[] = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        status: 'Draft' as const,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));

      setDocuments(prev => [...newDocs, ...prev]);
      setIsUploading(false);
      alert(`${files.length} document(s) uploaded successfully!`);
    }, 1000);
  };

  const handleSign = (id: string) => {
    setDocuments(prev =>
      prev.map(doc => (doc.id === id ? { ...doc, status: 'Signed' } : doc))
    );
  };

  const handleReview = (id: string) => {
    setDocuments(prev =>
      prev.map(doc => (doc.id === id ? { ...doc, status: 'In Review' } : doc))
    );
  };

  const getStatusColor = (status: string) => {
    if (status === 'Signed') return 'success';
    if (status === 'In Review') return 'warning';
    return 'secondary';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Signed') return <CheckCircle size={18} className="text-green-600" />;
    if (status === 'In Review') return <Clock size={18} className="text-amber-600" />;
    return <Edit3 size={18} className="text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📄 Document Chamber
          </h2>
          <p className="text-sm text-gray-500">Manage deals & contracts securely</p>
        </div>
        <div className="text-xs bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          {documents.length} Documents
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <label className="cursor-pointer group">
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-10 text-center transition-all duration-200">
            <div className="mx-auto w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload size={32} className="text-blue-600" />
            </div>
            <p className="font-semibold text-gray-700">Upload Documents</p>
            <p className="text-sm text-gray-500 mt-1">PDF, DOCX, PNG, JPG (Max 10MB each)</p>
          </div>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        {isUploading && <p className="text-center text-blue-600 mt-3">Uploading files...</p>}
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Documents</h3>

        {documents.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-center">
            No documents uploaded yet.<br />Upload your first document above.
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-all"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="mt-0.5">
                    {getStatusIcon(doc.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate pr-2">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{doc.uploadDate}</span>
                      {doc.size && <span>• {doc.size}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge variant={getStatusColor(doc.status)} className="text-xs whitespace-nowrap">
                    {doc.status}
                  </Badge>

                  {doc.status !== 'Signed' && (
                    <div className="flex gap-2">
                      {doc.status === 'Draft' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReview(doc.id)}
                        >
                          Review
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleSign(doc.id)}
                      >
                        Sign
                      </Button>
                    </div>
                  )}

                  {doc.status === 'Signed' && (
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Download size={16} />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 text-center mt-6">
        All documents are encrypted • E-signature compliant
      </p>
    </div>
  );
};

export default DocumentChamber;