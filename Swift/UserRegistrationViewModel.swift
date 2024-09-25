import SwiftUI


class UserRegistrationViewModel: ObservableObject {
    @Published var name = ""
    @Published var cpf = ""
    @Published var email = ""
    @Published var primaryPhone = ""
    @Published var vehicle = ""
    @Published var errorMessage: String?
    @Published var showAlert = false
    @Published var errorFields: [String] = []


    private let sentimentPredictor = SentimentAnalysis()
    
    func performSentimentAnalysis(on text: String) {
        guard let prediction = try? sentimentPredictor.prediction(text: text) else { return }
        print("Sentiment: \(prediction)")
    }
    
    func registerUser() {
        do {
            try validateFields()
            let user = createUser()
            try CoreDataManager.shared.saveUser(user: user)
            resetForm()
        } catch {
            handleValidationError(error)
        }
    }


    private func validateFields() throws {
        if name.isEmpty { throw ValidationError.emptyField("Name") }
        if cpf.isEmpty || !Validator.validateCPF(cpf) { throw ValidationError.invalidFormat("CPF") }
        if email.isEmpty || !Validator.validateEmail(email) { throw ValidationError.invalidFormat("Email") }
        if !primaryPhone.isEmpty && !Validator.validatePhone(primaryPhone) { throw ValidationError.invalidFormat("Phone") }
    }


    private func createUser() -> User {
        let user = User(context: CoreDataManager.shared.container.viewContext)
        user.name = name
        user.cpf = cpf
        user.email = email
        user.primaryPhone = primaryPhone
        user.vehicle = vehicle
        return user
    }
    
    private func resetForm() {
        name = ""
        cpf = ""
        email = ""
        primaryPhone = ""
        vehicle = ""
    }


    private func handleValidationError(_ error: Error) {
        if let validationError = error as? ValidationError {
            self.errorMessage = validationError.localizedDescription
            self.showAlert = true
            if case .emptyField(let field) = validationError {
                self.errorFields.append(field)
            }
        } else {
            self.errorMessage = error.localizedDescription
            self.showAlert = true
        }
    }
}
