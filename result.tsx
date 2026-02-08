import { AnalysisResult } from "../types/review";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface ResultsDisplayProps {
  results: AnalysisResult[];
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>

      {results.map((result, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden border-l-4"
          style={{
            borderLeftColor: result.verdict === "fake" ? "#ef4444" : "#10b981",
          }}
        >
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {result.verdict === "fake" ? (
                    <AlertTriangle className="text-red-500" size={24} />
                  ) : (
                    <CheckCircle className="text-green-500" size={24} />
                  )}
                  <h3 className="text-xl font-bold">
                    {result.verdict === "fake" ? "Fake Review Detected" : "Genuine Review"}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm italic line-clamp-3">
                  "{result.review}"
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Confidence</div>
                <div className="text-3xl font-bold" style={{
                  color: result.verdict === "fake" ? "#ef4444" : "#10b981"
                }}>
                  {(result.confidence_score * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-gray-600" />
                <h4 className="font-semibold text-gray-700">Key Indicators</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.indicators.map((indicator, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded"
                  >
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            <details className="border-t pt-4">
              <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                View Technical Features
              </summary>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Review Length</div>
                  <div className="font-semibold">{result.features.reviewLength} chars</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Avg Word Length</div>
                  <div className="font-semibold">{result.features.avgWordLength.toFixed(2)}</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Exclamations</div>
                  <div className="font-semibold">{result.features.exclamationCount}</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Caps Ratio</div>
                  <div className="font-semibold">{(result.features.capsRatio * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Sentiment Score</div>
                  <div className="font-semibold">{result.features.sentimentScore.toFixed(3)}</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Repetition Score</div>
                  <div className="font-semibold">{result.features.repetitionScore.toFixed(3)}</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Fake Word Count</div>
                  <div className="font-semibold">{result.features.fakeWordCount}</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Unique Word Ratio</div>
                  <div className="font-semibold">{(result.features.uniqueWordRatio * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded">
                  <div className="text-gray-500">Sentences</div>
                  <div className="font-semibold">{result.features.sentenceCount}</div>
                </div>
              </div>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
}
