import NaturalLanguage
import CoreML


struct SentimentAnalysis {
    private let model: NLModel
    
    init() {
        do {
            self.model = try NLModel(mlModel: SentimentClassifier().model)
        } catch {
            fatalError("Couldn't load the sentiment analysis model: \(error.localizedDescription)")
        }
    }
    
    func prediction(text: String) throws -> String {
        return model.predictedLabel(for: text) ?? "Neutral"
    }
}
