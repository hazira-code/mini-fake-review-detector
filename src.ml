import { useEffect, useState } from "react";
import { ModelMetrics as IModelMetrics } from "../types/review";
import { getModelMetrics } from "../services/reviewService";
import { BarChart3 } from "lucide-react";

export function ModelMetrics() {
  const [metrics, setMetrics] = useState<IModelMetrics | null>(null);

  useEffect(() => {
    getModelMetrics().then(setMetrics);
  }, []);

  if (!metrics) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-blue-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Model Performance Metrics</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-3 rounded-lg">
          <div className="text-sm text-blue-700 mb-1">Accuracy</div>
          <div className="text-2xl font-bold text-blue-900">
            {(metrics.accuracy * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 px-4 py-3 rounded-lg">
          <div className="text-sm text-green-700 mb-1">Precision</div>
          <div className="text-2xl font-bold text-green-900">
            {(metrics.precision * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 px-4 py-3 rounded-lg">
          <div className="text-sm text-amber-700 mb-1">Recall</div>
          <div className="text-2xl font-bold text-amber-900">
            {(metrics.recall * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-3 rounded-lg">
          <div className="text-sm text-purple-700 mb-1">F1-Score</div>
          <div className="text-2xl font-bold text-purple-900">
            {(metrics.f1_score * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Trained using Logistic Regression with TF-IDF and linguistic features on a dataset of genuine and fake reviews
      </p>
    </div>
  );
}
