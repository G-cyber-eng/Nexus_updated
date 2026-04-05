import React, { useState, useRef } from 'react';
import { Upload, FileText, Eye, Edit3, Download, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DocumentChamberPage: React.FC = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Investment_Agreement_StartupX.pdf',
      status: 'Signed',
      date: '2026-04-02',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Term_Sheet_Nexus_Deal.docx',
      status: 'In Review',
      date: '2026-04-03',
      size: '1.1 MB',
    },
    {
      id: 3,
      name: 'Contract_Draft_v2.pdf',
      status: 'Draft',
      date: '2026-04-04',
      size: '3.8 MB',
    },
  ]);

  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Upload handler (mock)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newDoc = {
        id: Date.now(),
        name: e.target.files[0].name,
        status: 'Draft',
        date: new Date().toISOString().split('T')[0],
        size: (e.target.files[0].size / (1024 * 1024)).toFixed(1) + ' MB',
      };
      setDocuments([newDoc, ...documents]);
      alert('Document uploaded successfully! (Mock)');
    }
  };

  // Open document preview + signature modal
  const openDocument = (doc: any) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
    setIsSigning(false);
  };

  // Canvas drawing for signature
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111827';
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const signDocument = () => {
    setIsSigning(true);
    setTimeout(() => {
      alert('✅ Document signed successfully! (E-signature mock)');
      setIsModalOpen(false);
      // Update status in list
      setDocuments(documents.map(doc => 
        doc.id === selectedDoc.id ? { ...doc, status: 'Signed' } : doc
      ));
    }, 800);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Signed') return 'bg-green-100 text-green-700';
    if (status === 'In Review') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Document Chamber</h1>
        </div>
        
        <label className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-3xl hover:bg-purple-700 cursor-pointer transition">
          <Upload className="w-5 h-5" />
          <span>Upload New Document</span>
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUpload} />
        </label>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-semibold text-lg">All Documents & Contracts</h2>
        </div>
        
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => openDocument(doc)}
            className="flex items-center justify-between p-6 border-b hover:bg-gray-50 cursor-pointer transition last:border-none"
          >
            <div className="flex items-center gap-4">
              <FileText className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className={`px-4 py-1 text-xs font-medium rounded-3xl ${getStatusColor(doc.status)}`}>
                {doc.status}
              </span>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Preview + Signature Modal */}
      {isModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xl">{selectedDoc.name}</h3>
                <p className="text-sm text-gray-500">Status: {selectedDoc.status}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Mock PDF Preview */}
            <div className="p-8 bg-gray-100 min-h-[400px] flex items-center justify-center border-b">
              <div className="bg-white shadow-xl w-full max-w-2xl aspect-[4/3] rounded-2xl flex flex-col items-center justify-center border border-gray-200">
                <FileText className="w-16 h-16 text-red-500 mb-4" />
                <p className="text-lg font-medium text-gray-700">PDF Preview</p>
                <p className="text-sm text-gray-500 mt-2">This is a mock preview</p>
                <p className="text-xs text-gray-400">(Real PDF viewer baad mein add kar sakte hain)</p>
              </div>
            </div>

            {/* Signature Section */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  E-Signature
                </h4>
                {selectedDoc.status !== 'Signed' && (
                  <button
                    onClick={() => setIsSigning(!isSigning)}
                    className="px-5 py-2 bg-blue-600 text-white text-sm rounded-2xl hover:bg-blue-700"
                  >
                    {isSigning ? 'Cancel Signing' : 'Sign Document'}
                  </button>
                )}
              </div>

              {isSigning && (
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-4 bg-white">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    className="w-full border border-gray-200 rounded-2xl cursor-crosshair bg-white"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={clearSignature}
                      className="flex-1 py-3 border border-gray-300 rounded-2xl text-sm font-medium"
                    >
                      Clear Signature
                    </button>
                    <button
                      onClick={signDocument}
                      className="flex-1 py-3 bg-green-600 text-white rounded-2xl text-sm font-medium"
                    >
                      ✅ Save & Sign
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 bg-gray-50 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-3xl"
              >
                Close
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-3xl">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { DocumentChamberPage };