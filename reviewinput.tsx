import { useState } from "react";
import { Upload, FileText } from "lucide-react";

interface ReviewInputProps {
  onAnalyze: (reviews: string[]) => void;
  isLoading: boolean;
}

export function ReviewInput({ onAnalyze, isLoading }: ReviewInputProps) {
  const [reviewText, setReviewText] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      return;
    }
    onAnalyze([reviewText]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    try {
      const text = await file.text();
      const reviews: string[] = [];

      if (file.name.endsWith(".csv")) {
        const lines = text.split("\n");
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const match = line.match(/^"?(.*?)"?$/);
            const review = match ? match[1] : line;
            if (review) reviews.push(review);
          }
        }
      } else {
        const lines = text.split("\n").filter((line) => line.trim());
        reviews.push(...lines);
      }

      if (reviews.length === 0) {
        setUploadError("No reviews found in file");
        return;
      }

      onAnalyze(reviews);
    } catch (error) {
      setUploadError("Failed to read file. Please ensure it's a valid text or CSV file.");
    }

    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div>
        <label
          htmlFor="review-text"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter Review Text
        </label>
        <textarea
          id="review-text"
          rows={6}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Paste a review here to analyze..."
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !reviewText.trim()}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={20} />
          {isLoading ? "Analyzing..." : "Detect Fake Review"}
        </button>

        <label className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <Upload size={20} />
          Upload CSV File
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            disabled={isLoading}
            className="hidden"
          />
        </label>
      </div>

      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded">
          {uploadError}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>
          <strong>Single review:</strong> Paste text and click "Detect Fake Review"
        </p>
        <p>
          <strong>Multiple reviews:</strong> Upload a CSV file with reviews (one per row)
        </p>
      </div>
    </div>
  );
}
